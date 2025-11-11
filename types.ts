
export interface Player {
  name?: string;
  full_name?: string;
  club?: string;
  current_club?: string;
  photo_url?: string;
  [key: string]: any; 
}

export interface Club {
  club?: string;
  club_name?: string;
  position?: number;
  logo_url?: string;
  [key: string]: any;
}

export interface PlayerStatCategory {
  ranking_type: string;
  data: Player[];
}

export interface ClubStatCategory {
  ranking_type: string;
  data: Club[];
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface LaLigaData {
  club_stats?: ClubStatCategory[];
  player_stats?: PlayerStatCategory[];
  sources?: GroundingChunk[];
}
