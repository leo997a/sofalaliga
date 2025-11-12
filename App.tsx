
import React, { useState, useCallback, useEffect } from 'react';

import { CLUB_STATS_OPTIONS, PLAYER_STATS_OPTIONS } from './constants';
import { LaLigaData, ClubStatCategory, PlayerStatCategory, Club, Player } from './types';
import { fetchLaLigaStats } from './services/geminiService';
import { getClubLogoUrl } from './services/localData';

import StatSelector from './components/StatSelector';
import Loader from './components/Loader';
import { FootballIcon, PersonIcon, GoogleDriveIcon } from './components/icons';

type Tab = 'club' | 'player' | 'export';

// Fix: Extend the global Window interface to include gapi and google properties
// This resolves TypeScript errors when accessing window.gapi and window.google
// which are loaded from external scripts.
declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

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
      setData(result);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedClubStats, selectedPlayerStats]);

  const renderContent = () => {
    switch (activeTab) {
      case 'club':
        return <StatSelector title="Club Statistics" options={CLUB_STATS_OPTIONS} selected={selectedClubStats} setSelected={setSelectedClubStats} />;
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
      default:
        return null;
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

  return (
    <div className="min-h-screen bg-brand-primary p-4 sm:p-8">
      <div className="container mx-auto max-w-5xl bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        <header className="p-6 border-b border-gray-700 text-center">
          <h1 className="text-4xl font-extrabold text-white">
            <span className="text-brand-accent">La Liga</span> Stats AI
          </h1>
          <p className="text-brand-text-secondary mt-2">Real-time, AI-powered statistics for the Spanish league</p>
        </header>
        
        <nav className="flex justify-center border-b border-gray-700">
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
  const [isGisReady, setIsGisReady] = useState(false);
  const [tokenClient, setTokenClient] = useState<any>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState('');

  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const isDriveExportConfigured = !!(CLIENT_ID && API_KEY);

  const FOLDER_ID = '1UqUKXCzyJEMtenJ-bTaN4jwb0XuqOG2M';
  const FILE_NAME = 'datalaliga.json';
  const SCOPES = 'https://www.googleapis.com/auth/drive.file';
  
  useEffect(() => {
    if (!isDriveExportConfigured) return;

    const gisScript = document.createElement('script');
    gisScript.src = 'https://accounts.google.com/gsi/client';
    gisScript.async = true;
    gisScript.defer = true;
    gisScript.onload = () => setIsGisReady(true);
    document.body.appendChild(gisScript);

    return () => {
      document.body.removeChild(gisScript);
    };
  }, [isDriveExportConfigured]);

  useEffect(() => {
    if (isGisReady && isDriveExportConfigured) {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // Will be dynamically set in handleExportToDrive
      });
      setTokenClient(client);
    }
  }, [isGisReady, CLIENT_ID, isDriveExportConfigured]);

  const handleExportToDrive = async () => {
    if (!data) {
      setExportStatus('Error: No data to export.');
      return;
    }
    if (!tokenClient) {
      setExportStatus('Error: Google Drive integration is not ready.');
      return;
    }

    setIsExporting(true);
    setExportStatus('Authenticating with Google...');

    const uploadFile = async (tokenResponse: any) => {
      try {
        if (tokenResponse.error) {
          throw new Error(`Authentication error: ${tokenResponse.error}`);
        }

        const accessToken = tokenResponse.access_token;
        const authHeader = new Headers({ 'Authorization': `Bearer ${accessToken}` });

        // 1. Search for the file
        setExportStatus('Searching for existing file...');
        const query = `name='${FILE_NAME}' and '${FOLDER_ID}' in parents and trashed = false`;
        const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id)`;
        
        const searchResponse = await fetch(searchUrl, { headers: authHeader });
        if (!searchResponse.ok) throw new Error('Failed to search for file.');
        
        const searchResult = await searchResponse.json();
        const fileId = searchResult.files && searchResult.files.length > 0 ? searchResult.files[0].id : null;

        // 2. Prepare file for upload/update
        const metadata = {
          name: FILE_NAME,
          mimeType: 'application/json',
          ...(fileId ? {} : { parents: [FOLDER_ID] }),
        };
        const fileContent = JSON.stringify(data, null, 2);
        
        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', new Blob([fileContent], { type: 'application/json' }));

        // 3. Upload or Update the file
        const method = fileId ? 'PATCH' : 'POST';
        const uploadUrl = `https://www.googleapis.com/upload/drive/v3/files${fileId ? `/${fileId}` : ''}?uploadType=multipart`;
        setExportStatus(fileId ? 'Updating file in Google Drive...' : 'Uploading file to Google Drive...');

        const uploadResponse = await fetch(uploadUrl, {
          method,
          headers: authHeader,
          body: form,
        });

        if (!uploadResponse.ok) {
          const errorBody = await uploadResponse.json();
          throw new Error(errorBody.error.message || 'File upload failed.');
        }

        setExportStatus('Successfully exported to Google Drive!');
      } catch (err: any) {
        console.error('Google Drive Export Error:', err);
        setExportStatus(`Error: ${err.message || 'An unknown error occurred.'}`);
      } finally {
        setIsExporting(false);
        setTimeout(() => setExportStatus(''), 5000);
      }
    };

    tokenClient.callback = uploadFile;
    tokenClient.requestAccessToken({ prompt: '' });
  };
  
  const handleDownload = () => {
    if (!data) return;
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
  
  const clubDataKeysToIgnore = ['club', 'club_name', 'logo_url', 'position'];
  const playerDataKeysToIgnore = ['name', 'full_name', 'club', 'current_club', 'photo_url'];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-end items-center mb-4 gap-4">
        <div className="flex-grow text-sm text-brand-text-secondary text-center sm:text-right h-5">
            {exportStatus}
            {!isDriveExportConfigured && !exportStatus && (
                <span title="The necessary Google Cloud credentials (Client ID) were not provided for this environment.">
                    Google Drive export is not configured.
                </span>
            )}
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleDownload}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download JSON
          </button>
          <button
            onClick={handleExportToDrive}
            disabled={isExporting || !isDriveExportConfigured}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 flex items-center gap-2 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none"
            title={!isDriveExportConfigured ? "Google Drive export is unavailable because it has not been configured for this environment." : "Export data to Google Drive"}
          >
            <GoogleDriveIcon className="w-5 h-5" />
            {isExporting ? 'Exporting...' : 'Export to Google Drive'}
          </button>
        </div>
      </div>
      
      {data.club_stats && data.club_stats.map((category: ClubStatCategory, index: number) => (
        <div key={index}>
          <h3 className="text-xl font-bold mb-4 text-brand-accent">{category.ranking_type}</h3>
          <div className="overflow-x-auto bg-brand-primary/50 rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-brand-secondary text-left">
                <tr>
                  <th className="p-3">Rank</th>
                  <th className="p-3">Club</th>
                  {category.data.length > 0 && Object.keys(category.data[0]).filter(k => !clubDataKeysToIgnore.includes(k)).map(header => (
                     <th key={header} className="p-3 capitalize">{header.replace(/_/g, ' ')}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {category.data.map((club: Club, idx: number) => {
                  const clubName = club.club_name || club.club;
                  return (
                    <tr key={`${clubName}-${idx}`} className="border-b border-gray-700 hover:bg-brand-secondary/50">
                      <td className="p-3 font-semibold">{club.position || idx + 1}</td>
                      <td className="p-3 flex items-center gap-3 font-medium text-white">
                          {club.logo_url ? 
                            <img src={club.logo_url} alt={`${clubName} logo`} className="w-6 h-6 object-contain"/>
                            : <FootballIcon className="w-6 h-6 text-brand-text-secondary" />
                          }
                          <span>{clubName}</span>
                      </td>
                      {Object.entries(club).filter(([k]) => !clubDataKeysToIgnore.includes(k)).map(([key, value]) => (
                        <td key={key} className="p-3">{String(value)}</td>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.data.map((player: Player) => {
              const playerName = player.full_name || player.name;
              const playerClub = player.current_club || player.club;
              const clubLogoUrl = playerClub ? getClubLogoUrl(playerClub) : undefined;
              return (
                <div key={playerName} className="bg-brand-secondary p-4 rounded-lg shadow-md hover:shadow-lg hover:ring-2 hover:ring-brand-accent transition-all">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-brand-accent bg-brand-primary flex items-center justify-center overflow-hidden">
                      {player.photo_url ? (
                          <img src={player.photo_url} alt={playerName} className="w-full h-full object-cover"/>
                      ) : (
                          <PersonIcon className="w-8 h-8 text-brand-text-secondary" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-white">{playerName}</p>
                      {playerClub && (
                        <div className="flex items-center gap-2 mt-1">
                          {clubLogoUrl ? (
                            <img src={clubLogoUrl} alt={`${playerClub} logo`} className="w-4 h-4 object-contain" />
                          ) : (
                            <FootballIcon className="w-4 h-4 text-brand-text-secondary" />
                          )}
                          <p className="text-sm text-brand-text-secondary">{playerClub}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 space-y-1 text-sm">
                    {Object.entries(player).filter(([k]) => !playerDataKeysToIgnore.includes(k)).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-brand-text-secondary capitalize">{key.replace(/_/g, ' ')}:</span>
                        <span className="font-semibold text-white">{String(value)}</span>
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
                        <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            {source.web.title || source.web.uri}
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
