
import { GoogleGenAI } from "@google/genai";
import { LaLigaData, GroundingChunk } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are a sports data expert. Your task is to find real, 100% accurate, up-to-date La Liga statistics for the current season using your search capabilities.

Please provide the data in a single, valid JSON object format. Do not include any text, markdown, or code blocks outside of the JSON object itself. The final output MUST be only the JSON object.

The JSON object should have keys 'club_stats' and/or 'player_stats' based on the user's request.
For each player, you must include their full name, current club, and a publicly accessible URL for their photo ('photo_url').
For each club, you must include its name and a publicly accessible URL for its logo ('logo_url').`;


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
        
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] | undefined;
        
        parsedData.sources = sources?.filter(s => s.web);

        return parsedData;
    } catch (e) {
        console.error("Failed to parse JSON response:", response.text, e);
        throw new Error("The AI returned real-time data in an invalid format. Please try adjusting your selection or try again.");
    }
};
