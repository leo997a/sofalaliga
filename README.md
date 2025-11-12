<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# La Liga Stats AI

This is a web application that uses the Gemini API to fetch and display real-time statistics for the Spanish La Liga football league.

- **Real-time Data:** Fetches the latest stats using the Gemini 1.5 Flash model with Google Search grounding.
- **Customizable:** Select exactly which club and player stats you want to see.
- **Exportable:** Download the generated data as a JSON file.
- **Modern UI:** Built with React, TypeScript, and Vite for a fast, responsive experience.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- An API key for the Gemini API. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/la-liga-stats-ai.git
   cd la-liga-stats-ai
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up your environment variables:**
    - Create a new file named `.env` in the root of the project.
    - Copy the contents of `.env.example` into your new `.env` file.
    - Replace `"YOUR_API_KEY_HERE"` with your actual Gemini API key.
    ```bash
    # .env
    VITE_API_KEY="xxxxxxxxxxxxxxxxxxxxxxx"
    ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Open your browser** to the local URL provided (usually `http://localhost:5173`).
