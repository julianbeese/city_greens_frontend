
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { FullPlantAnalysisResponse } from '@/types/plant-analysis';

export async function POST(request: NextRequest) {
  // In a real scenario, you would process the image from the request body
  // For now, we return mock data
  // const formData = await request.formData();
  // const image = formData.get('image') as File | null;

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const mockData: FullPlantAnalysisResponse = {
    plant_analysis: {
      status: 'unhealthy',
      details: 'Bacterial spot detected on multiple leaves. Early signs of nutrient deficiency also present.',
      recommendations: 'Apply copper-based fungicides. Ensure proper plant spacing. Consider a balanced NPK fertilizer.',
      abnormalities: [
        {
          type: 'Bacterial Spot',
          description: 'A lesion indicative of bacterial spot.',
          coordinates: {
            x: 75,
            y: 110,
            width: 40,
            height: 35
          },
          confidence_score_abnormality: 0.95
        },
        {
          type: 'Bacterial Spot',
          description: 'Another area showing bacterial spot symptoms.',
          coordinates: {
            x: 150,
            y: 180,
            width: 50,
            height: 45
          },
          confidence_score_abnormality": 0.89
        },
        {
          type: 'Nutrient Deficiency',
          description: 'Slight yellowing of lower leaf, possibly Nitrogen deficiency.',
          coordinates: {
            x: 50,
            y: 200,
            width: 60,
            height: 50
          },
          confidence_score_abnormality": 0.75
        }
      ]
    },
    confidence_score: 0.8514320254325867,
    processing_time_ms: 250, // Adjusted to be more realistic
    image_width: 400, // Example original image width
    image_height: 300 // Example original image height
  };

  // Simulate a chance of healthy response for variety
  if (Math.random() < 0.3) {
    mockData.plant_analysis.status = 'healthy';
    mockData.plant_analysis.details = 'Plant appears to be in good health. No significant issues detected.';
    mockData.plant_analysis.recommendations = 'Maintain current care routine. Ensure adequate lighting and watering.';
    mockData.plant_analysis.abnormalities = [];
    mockData.confidence_score = 0.98;
  }


  return NextResponse.json(mockData);
}
