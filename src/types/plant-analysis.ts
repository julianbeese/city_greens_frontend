
export interface Abnormality {
  type: string;
  description: string;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  confidence_score_abnormality: number;
}

export interface PlantAnalysisSection {
  status: 'healthy' | 'unhealthy' | string;
  details: string;
  recommendations?: string;
  abnormalities?: Abnormality[];
}

export interface FullPlantAnalysisResponse {
  plant_analysis: PlantAnalysisSection;
  confidence_score: number;
  processing_time_ms: number;
  image_width: number;
  image_height: number;
}
