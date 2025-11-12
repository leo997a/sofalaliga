
import { GoogleGenAI } from "@google/genai";
import { LaLigaData, GroundingChunk } from '../types';

const apiKey = import.meta.env.VITE_API_KEY;

const systemInstruction = `You are a sports data expert specializing in La Liga. Your task is to retrieve accurate, up-to-date statistics for the current season using your search capabilities.

You MUST format your entire response as a single, valid JSON object. Do not include any text, markdown, or code blocks before or after the JSON object.

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
- Ensure all statistical data is as current as possible.`;


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
    if (!apiKey) {
        throw new Error("API_KEY not configured. Please set the VITE_API_KEY environment variable.");
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = buildPrompt(clubStats, playerStats);

    const generativeModel = ai.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
        systemInstruction: {
            parts: [{ text: systemInstruction }],
            role: "model"
        },
        tools: [{googleSearch: {}}],
    });

    try {
        const result = await generativeModel.generateContent(prompt);
        const response = result.response;
        const rawText = response.text();
        console.log("Gemini API Response:", rawText);

        const startIndex = rawText.indexOf('{');
        const endIndex = rawText.lastIndexOf('}');
        
        if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
            throw new Error("No valid JSON object found in the AI response.");
        }

        const jsonStr = rawText.substring(startIndex, endIndex + 1);
        const parsedData = JSON.parse(jsonStr) as LaLigaData;
        
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingAttributions as GroundingChunk[] | undefined;
        
        parsedData.sources = sources?.filter(s => s.web);

        return parsedData;
    } catch (e) {
        console.error("Error fetching or parsing La Liga stats:", e);
        throw new Error("Failed to fetch or parse data from the AI. Please check the console for more details.");
    }
};
