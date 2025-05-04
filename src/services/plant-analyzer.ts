/**
 * Represents the analysis result of a plant image.
 */
export interface PlantAnalysis {
  /**
   * The overall health status of the plant.
   * Can be 'healthy' or a specific issue like 'unhealthy', 'nutrient_deficiency', 'pest_damage', etc.
   */
  status: 'healthy' | 'unhealthy' | string; // Allow for more specific unhealthy statuses
  /**
   * Detailed information about the analysis results (diagnosis).
   */
  details: string;
  /**
   * Recommended actions to take based on the analysis, if applicable.
   */
  recommendations?: string;
}

/**
 * Asynchronously analyzes a plant image and returns the analysis results.
 * This function will eventually call the backend API.
 *
 * @param image The image file of the plant.
 * @returns A promise that resolves to a PlantAnalysis object.
 * @throws Throws an error if the API call fails or returns an error status.
 */
export async function analyzePlantImage(image: File): Promise<PlantAnalysis> {
  const formData = new FormData();
  formData.append('image', image);

  const apiUrl = 'https://your-backend-api.com/analyze'; // Replace with your actual API endpoint

  try {
    // Note: This fetch call is commented out for the MVP as we are mocking the response.
    // Uncomment and adjust this when integrating the real backend.
    /*
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
      // Add any necessary headers, e.g., Authorization
      // headers: {
      //   'Authorization': `Bearer YOUR_API_TOKEN`,
      // },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'API returned an error' }));
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }

    const data: PlantAnalysis = await response.json();
    return data;
    */

    // Mocked response for MVP development purposes
    console.log('Mocking API call for image:', image.name);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay

    const randomStatus = Math.random() > 0.4 ? 'healthy' : 'unhealthy';
    let randomDetails = 'No significant issues detected. Keep up the good work!';
    let randomRecommendations: string | undefined = undefined;

     if (randomStatus === 'unhealthy') {
        const issues = [
            {
                details: 'Yellowing leaves detected, possible nutrient deficiency (Nitrogen).',
                recommendations: 'Apply a balanced liquid fertilizer rich in Nitrogen. Follow product instructions carefully.'
            },
            {
                details: 'Signs of pest damage (aphids) on lower leaves.',
                recommendations: 'Spray the plant with insecticidal soap, focusing on the undersides of leaves. Repeat application if necessary.'
            },
            {
                details: 'Dark spots on leaves, potential early blight.',
                recommendations: 'Remove and destroy affected leaves immediately. Ensure good air circulation around the plant. Consider applying a fungicide if the problem persists.'
            },
            {
                details: 'Wilting observed, check soil moisture levels.',
                recommendations: 'Water the plant thoroughly if the soil is dry. Ensure proper drainage to prevent overwatering.'
            },
        ];
        const selectedIssue = issues[Math.floor(Math.random() * issues.length)];
        randomDetails = selectedIssue.details;
        randomRecommendations = selectedIssue.recommendations;
     }

     return {
        status: randomStatus,
        details: randomDetails,
        recommendations: randomRecommendations,
     };


  } catch (error: any) {
    console.error('Error analyzing plant image:', error);
    throw new Error(error.message || 'Failed to connect to the analysis service.');
  }
}
