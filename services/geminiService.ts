import { GoogleGenAI } from "@google/genai";
import { LaLigaData, GroundingChunk } from '../types';
import { getClubLogoUrl, getPlayerPhotoUrl } from './localData';

/**
 * NOTE:
 * - Do NOT throw at import time. Check API key at runtime when the function runs,
 *   so the server can start and we can surface errors in logs instead of crashing the app.
 */

const createAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set. Please provide API_KEY.");
  }
  return new GoogleGenAI({ apiKey });
};

const systemInstruction = `You are a sports data expert specializing in La Liga. Your task is to retrieve accurate, up-to-date statistics for the current season.

**CRITICAL INSTRUCTIONS:**
1. MUST USE SEARCH: Use the provided web search tool for every statistic requested.
2. STRICT JSON FORMAT: Return a single valid JSON object and nothing else.

Return JSON matching the LaLigaData shape. For players include full_name and current_club; for clubs include club_name.`;

const buildPrompt = (clubStats: string[], playerStats: string[]): string => {
  let prompt = `Please find the latest La Liga statistics for the current season.`;

  if (clubStats.length > 0) {
    prompt += `
    
Club statistics to find: ${clubStats.join(', ')}.
- For "League Table (by points)", return all 20 teams.
- For other club stats, return the top 10.
- Structure: Each category must be an object with 'ranking_type' and a 'data' array of club objects. Each club object should include 'club_name' and relevant stats (position, points, played, etc.).`;
  }

  if (playerStats.length > 0) {
    prompt += `
    
Player statistics to find: ${playerStats.join(', ')}.
- For player stats return the top 10 players per category.
- Structure: Each category must be an object with 'ranking_type' and a 'data' array of player objects. Each player should include 'full_name', 'current_club' and relevant stats (goals, assists, matches, etc.).`;
  }

  prompt += `

Respond ONLY with one JSON object that follows the interface LaLigaData.`;
  return prompt;
};

const safeParseJsonFromText = (text: string): any => {
  if (!text) return null;

  // Try direct parse first
  try {
    return JSON.parse(text);
  } catch {
    // fallback: find first "{" and last "}" and parse substring
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');
    if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
      return null;
    }
    const jsonStr = text.substring(startIndex, endIndex + 1);
    try {
      return JSON.parse(jsonStr);
    } catch (err) {
      return null;
    }
  }
};

export const fetchLaLigaStats = async (clubStats: string[], playerStats: string[]): Promise<LaLigaData> => {
  const ai = createAiClient();
  const prompt = buildPrompt(clubStats, playerStats);

  let response: any;
  try {
    response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      // Use structured content form (supported by many SDK versions)
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      systemInstruction: {
        role: "system",
        parts: [{ text: systemInstruction }],
      },
      tools: [{ googleSearch: {} }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });
  } catch (err) {
    console.error("AI request failed:", err);
    throw new Error("Failed to contact the AI service. Check API key and network connectivity.");
  }

  // Normalize candidate/text sources to extract JSON robustly
  let parsedData: LaLigaData | null = null;

  try {
    const candidateText =
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      response?.candidates?.[0]?.content?.text ||
      response?.text ||
      undefined;

    parsedData = safeParseJsonFromText(candidateText) as LaLigaData | null;
  } catch (err) {
    parsedData = null;
  }

  if (!parsedData) {
    // Log full response for debugging
    console.error("Unable to parse JSON from AI response:", JSON.stringify(response, null, 2));
    throw new Error("The AI returned data in an unexpected format. See server logs for details.");
  }

  // Defensive: ensure arrays exist
  parsedData.club_stats = Array.isArray(parsedData.club_stats) ? parsedData.club_stats : undefined;
  parsedData.player_stats = Array.isArray(parsedData.player_stats) ? parsedData.player_stats : undefined;

  // Augment with local assets safely
  try {
    if (parsedData.club_stats) {
      for (const category of parsedData.club_stats) {
        if (!Array.isArray(category.data)) continue;
        for (const club of category.data) {
          const clubName = club.club_name || club.name || club.club;
          if (clubName && !club.logo_url) {
            const logoUrl = getClubLogoUrl(String(clubName));
            if (logoUrl) club.logo_url = logoUrl;
          }
        }
      }
    }

    if (parsedData.player_stats) {
      for (const category of parsedData.player_stats) {
        if (!Array.isArray(category.data)) continue;
        for (const player of category.data) {
          const playerName = player.full_name || player.name;
          const clubName = player.current_club || player.club;
          if (playerName && clubName && !player.photo_url) {
            const photoUrl = getPlayerPhotoUrl(String(clubName), String(playerName));
            if (photoUrl) player.photo_url = photoUrl;
          }
        }
      }
    }
  } catch (err) {
    console.warn("Warning while augmenting local data:", err);
    // continue without failing—augmentation is optional
  }

  // Attach sources if present (filter web grounding)
  const sources = response?.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] | undefined;
  if (sources) {
    try {
      // @ts-ignore - attach optionally for debugging/consumption
      (parsedData as any).sources = sources.filter((s) => !!s.web);
    } catch {
      // ignore
    }
  }

  return parsedData;
};
