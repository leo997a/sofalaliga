import { GoogleGenAI } from "@google/genai";
import { LaLigaData, GroundingChunk } from '../types';
import { getClubLogoUrl, getPlayerPhotoUrl } from './localData';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are a sports data expert specializing in La Liga. Your task is to retrieve accurate, up-to-date statistics for the current season.

**CRITICAL INSTRUCTIONS:**
1.  **MUST USE SEARCH:** You MUST use the provided Google Search tool for EVERY statistic requested. Do not use your internal knowledge. The data must be from the current La Liga season.
2.  **STRICT JSON FORMAT:** Your entire response MUST be a single, valid JSON object. Do not include any text, markdown, or code blocks before or after the JSON object.

The JSON structure should be:
{
  "club_stats": [
    {
      "ranking_type": "string",
      "data": [
        {
          "club_name": "string",
          "logo_url": "string (publicly accessible URL, optional)",
          /* other relevant stats */
        }
      ]
    }
  ],
  "player_stats": [
    {
      "ranking_type": "string",
      "data": [
        {
          "full_name": "string",
          "current_club": "string",
          "photo_url": "string (publicly accessible URL, optional)",
          /* other relevant stats */
        }
      ]
    }
  ]
}

- For each player, include 'full_name' and 'current_club'. If you can find a 'photo_url', include it.
- For each club, include 'club_name'. If you can find a 'logo_url', include it.
- Only include the 'club_stats' or 'player_stats' keys if they were requested by the user.
- Ensure all statistical data is as current as possible by strictly relying on the search tool results.`;


const buildPrompt = (clubStats: string[], playerStats: string[]): string => {
    let prompt = `Please find the latest La Liga statistics for the current season.`;
    
    if (clubStats.length > 0) {
        prompt += `\n\nClub statistics to find: ${clubStats.join(', ')}.
        - For "League Table (by points)", you MUST return all 20 teams.
        - For all other club stats, return the top 10.
        - Structure: Each category should be an object with 'ranking_type' and a 'data' array of club objects. Club objects need all relevant stats for that ranking (e.g., position, points, played, won, drawn, lost for League Table).`;
    }

    if (playerStats.length > 0) {
        prompt += `\n\nPlayer statistics to find: ${playerStats.join(', ')}.
        - For all player stats, return the top 10 players.
        - Structure: Each category should be an object with 'ranking_type' and a 'data' array of player objects. Player objects need all relevant stats for that ranking (e.g., goals, assists, matches_played for Top Scorers).`;
    }
    
    return prompt;
};


export const fetchLaLigaStats = async (clubStats: string[], playerStats: string[]): Promise<LaLigaData> => {
    const prompt = buildPrompt(clubStats, playerStats);

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
            tools: [{googleSearch: {}}],
        },
    });

    try {
        const rawText = response.text;
        const startIndex = rawText.indexOf('{');
        const endIndex = rawText.lastIndexOf('}');
        
        if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
            throw new Error("No valid JSON object found in the AI response.");
        }

        const jsonStr = rawText.substring(startIndex, endIndex + 1);
        const parsedData = JSON.parse(jsonStr) as LaLigaData;
        
        // Augment with local data
        if (parsedData.club_stats) {
            for (const category of parsedData.club_stats) {
                for (const club of category.data) {
                    const clubName = club.club_name || club.club;
                    if (clubName) {
                        const logoUrl = getClubLogoUrl(clubName);
                        if (logoUrl) {
                            club.logo_url = logoUrl;
                        }
                    }
                }
            }
        }

        if (parsedData.player_stats) {
            for (const category of parsedData.player_stats) {
                for (const player of category.data) {
                    const playerName = player.full_name || player.name;
                    const clubName = player.current_club || player.club;
                    if (playerName && clubName) {
                        const photoUrl = getPlayerPhotoUrl(clubName, playerName);
                        if (photoUrl) {
                            player.photo_url = photoUrl;
                        }
                    }
                }
            }
        }
        
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] | undefined;
        
        parsedData.sources = sources?.filter(s => s.web);

        return parsedData;
    } catch (e) {
        console.error("Failed to parse JSON response:", response.text, e);
        throw new Error("The AI returned real-time data in an invalid format. Please try adjusting your selection or try again.");
    }
};