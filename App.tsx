
import React, { useState, useCallback } from 'react';

import { CLUB_STATS_OPTIONS, PLAYER_STATS_OPTIONS } from './constants';
import { LaLigaData, ClubStatCategory, PlayerStatCategory, Club, Player } from './types';
import { fetchLaLigaStats } from './services/geminiService';

import StatSelector from './components/StatSelector';
import Loader from './components/Loader';
import { FootballIcon, PersonIcon } from './components/icons';

type Tab = 'club' | 'player' | 'export';

const IS_API_KEY_SET = import.meta.env.VITE_API_KEY && import.meta.env.VITE_API_KEY.length > 0;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('club');
  const [selectedClubStats, setSelectedClubStats] = useState<Set<string>>(new Set());
  const [selectedPlayerStats, setSelectedPlayerStats] = useState<Set<string>>(new Set());
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LaLigaData | null>(null);

  const handleGenerateData = useCallback(async () => {
    if (selectedClubStats.size === 0 && selectedPlayerStats.size === 0) {
      setError("Please select at least one statistic to generate.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await fetchLaLigaStats(
        Array.from(selectedClubStats), 
        Array.from(selectedPlayerStats)
      );
      
      // Validate the response
      if (!result || (result.club_stats?.length === 0 && result.player_stats?.length === 0)) {
        setError("No data was returned. Please try again or adjust your selections.");
        return;
      }
      
      setData(result);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "An unknown error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedClubStats, selectedPlayerStats]);

  const renderContent = () => {
    switch (activeTab) {
      case 'player':
        return <StatSelector title="Player Statistics" options={PLAYER_STATS_OPTIONS} selected={selectedPlayerStats} setSelected={setSelectedPlayerStats} />;
      case 'export':
        return (
          <div className="p-6 bg-brand-secondary rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-brand-accent">Generate & View Real Data</h2>
            <div className="flex justify-center">
              <button
                onClick={handleGenerateData}
                disabled={isLoading}
                className="bg-brand-accent hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Generating...' : 'Generate Real-Time Statistics'}
              </button>
            </div>
            <div className="mt-8 min-h-[300px]">
              {isLoading && <Loader />}
              {error && <p className="text-red-400 text-center">{error}</p>}
              {data && <ResultsDisplay data={data} />}
            </div>
          </div>
        );
      case 'club':
      default:
        return <StatSelector title="Club Statistics" options={CLUB_STATS_OPTIONS} selected={selectedClubStats} setSelected={setSelectedClubStats} />;
    }
  };

  const TabButton: React.FC<{tabId: Tab; label: string}> = ({tabId, label}) => (
    <button
      onClick={() => setActiveTab(tabId)}
      className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out border-b-2 ${
        activeTab === tabId
          ? 'text-brand-accent border-brand-accent'
          : 'text-brand-text-secondary border-transparent hover:text-brand-text hover:border-gray-500'
      }`}
    >
      {label}
    </button>
  );

  if (!IS_API_KEY_SET) {
    return (
      <div className="min-h-screen bg-red-900/80 text-white flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-red-800 p-10 rounded-2xl shadow-2xl border-2 border-red-600 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Configuration Error</h1>
          <p className="text-xl mb-6">The <code className="bg-red-900/50 px-2 py-1 rounded-md text-red-300">VITE_API_KEY</code> environment variable is not set.</p>
          <p className="text-lg">This application cannot function without a valid API key. If you are the owner of this application, please follow these steps:</p>
          <ol className="text-left list-decimal list-inside my-6 bg-red-900/50 p-6 rounded-lg space-y-2">
            <li>Obtain a valid API key from your AI service provider (e.g., Google AI Studio).</li>
            <li>In your deployment service (e.g., Netlify, Vercel), navigate to your project's settings.</li>
            <li>Find the "Environment Variables" or "Deploy Settings" section.</li>
            <li>Add a new environment variable with the key <code className="bg-red-900/50 px-2 py-1 rounded-md text-red-300">VITE_API_KEY</code> and paste your key as the value.</li>
            <li>Redeploy your application for the changes to take effect.</li>
          </ol>
          <p className="text-sm text-red-300">This message is only visible because the API key is missing. It will disappear once the key is correctly configured.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-primary p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-6xl bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        <header className="p-4 sm:p-6 md:p-8 border-b border-gray-700 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            <span className="text-brand-accent">La Liga</span> Stats AI
          </h1>
          <p className="text-brand-text-secondary mt-2 text-sm sm:text-base">Real-time, AI-powered statistics for the Spanish league</p>
        </header>
        
        <nav className="flex justify-center border-b border-gray-700 overflow-x-auto">
          <TabButton tabId="club" label="Club Statistics" />
          <TabButton tabId="player" label="Player Statistics" />
          <TabButton tabId="export" label="Generate & View" />
        </nav>

        <main className="p-4 sm:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const ResultsDisplay: React.FC<{ data: LaLigaData }> = ({ data }) => {
  const handleDownload = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'laliga_stats.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  // Validate data before rendering
  if (!data) {
    return <div className="text-center py-8 text-brand-text-secondary">No data available</div>;
  }
  
  const clubDataKeysToIgnore = ['club', 'club_name', 'logo_url'];
  const playerDataKeysToIgnore = ['name', 'full_name', 'club', 'current_club', 'photo_url'];
  
  // Sanitize data to prevent XSS
  const sanitizeData = (data: any): any => {
    if (typeof data === 'string') {
      return data.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    return data;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownload}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span className="hidden sm:inline">Download JSON</span>
          <span className="sm:hidden">Download</span>
        </button>
      </div>

      {data.club_stats && data.club_stats.map((category: ClubStatCategory, index: number) => (
        <div key={index} className="overflow-hidden">
          <h3 className="text-xl font-bold mb-4 text-brand-accent">{category.ranking_type}</h3>
          <div className="overflow-x-auto bg-brand-primary/50 rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-brand-secondary text-left">
                <tr>
                  <th className="p-2 sm:p-3">Rank</th>
                  <th className="p-2 sm:p-3">Club</th>
                  {category.data.length > 0 && Object.keys(category.data[0]).filter(k => !clubDataKeysToIgnore.includes(k)).map(header => (
                     <th key={header} className="p-2 sm:p-3 capitalize hidden sm:table-cell">{header.replace(/_/g, ' ')}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {category.data.map((club: Club, idx: number) => {
                  const clubName = club.club_name || club.club;
                  return (
                    <tr key={`${clubName}-${idx}`} className="border-b border-gray-700 hover:bg-brand-secondary/50">
                      <td className="p-2 sm:p-3 font-semibold">{club.position || idx + 1}</td>
                      <td className="p-2 sm:p-3 flex items-center gap-2 sm:gap-3 font-medium text-white">
                          {club.logo_url ? 
                            <img src={sanitizeData(club.logo_url)} alt={`${sanitizeData(clubName)} logo`} className="w-6 h-6 sm:w-8 sm:h-8 object-contain"/>
                            : <FootballIcon className="w-6 h-6 sm:w-8 sm:h-8 text-brand-text-secondary" />
                          }
                          <span className="text-sm sm:text-base">{sanitizeData(clubName)}</span>
                      </td>
                      {Object.entries(club).filter(([k]) => !clubDataKeysToIgnore.includes(k)).map(([key, value]) => (
                        <td key={key} className="p-2 sm:p-3 hidden sm:table-cell">{sanitizeData(value)}</td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {data.player_stats && data.player_stats.map((category: PlayerStatCategory, index: number) => (
        <div key={index}>
          <h3 className="text-xl font-bold mb-4 text-brand-accent">{category.ranking_type}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {category.data.map((player: Player) => {
              const playerName = player.full_name || player.name;
              const playerClub = player.current_club || player.club;
              return (
                <div key={`${playerName}-${Math.random()}`} className="bg-brand-secondary p-4 rounded-lg shadow-md hover:shadow-lg hover:ring-2 hover:ring-brand-accent transition-all">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-brand-accent bg-brand-primary flex items-center justify-center overflow-hidden">
                      {player.photo_url ? (
                          <img src={sanitizeData(player.photo_url)} alt={sanitizeData(playerName)} className="w-full h-full object-cover"/>
                      ) : (
                          <PersonIcon className="w-6 h-6 sm:w-8 sm:h-8 text-brand-text-secondary" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm sm:text-base truncate max-w-[120px] sm:max-w-[150px]">{sanitizeData(playerName)}</p>
                      <p className="text-xs sm:text-sm text-brand-text-secondary truncate max-w-[120px] sm:max-w-[150px]">{sanitizeData(playerClub)}</p>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4 space-y-1 text-xs sm:text-sm">
                    {Object.entries(player).filter(([k]) => !playerDataKeysToIgnore.includes(k)).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-brand-text-secondary capitalize truncate max-w-[80px]">{sanitizeData(key.replace(/_/g, ' '))}:</span>
                        <span className="font-semibold text-white truncate max-w-[60px] text-right">{sanitizeData(String(value))}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {data.sources && data.sources.length > 0 && (
        <div>
            <h3 className="text-lg font-bold mt-8 mb-2 text-brand-text-secondary">Data Sources</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
                {data.sources.map((source, index) => (
                    source.web && <li key={index}>
                        <a href={sanitizeData(source.web.uri)} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            {sanitizeData(source.web.title || source.web.uri)}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
      )}
    </div>
  );
};


export default App;
