/**
 * Represents the analysis result of a tomato plant image.
 */
export interface PlantAnalysis {
  /**
   * The overall health status of the plant.
   * Can be 'healthy' or a specific issue like 'unhealthy', 'nutrient_deficiency', 'pest_damage', etc.
   */
  status: 'healthy' | 'unhealthy' | string; // Allow for more specific unhealthy statuses
  /**
   * Detailed information about the analysis results, potentially including recommendations.
   */
  details: string;
}

/**
 * Asynchronously analyzes a tomato plant image and returns the analysis results.
 * This function will eventually call the backend API.
 *
 * @param image The image file of the tomato plant.
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
     if (randomStatus === 'unhealthy') {
        const issues = [
            'Yellowing leaves detected, possible nutrient deficiency (Nitrogen). Consider fertilizing.',
            'Signs of pest damage (aphids) on lower leaves. Apply insecticidal soap.',
            'Dark spots on leaves, potential early blight. Remove affected leaves and ensure good air circulation.',
            'Wilting observed, check soil moisture levels. May need watering.',
        ];
        randomDetails = issues[Math.floor(Math.random() * issues.length)];
     }

     return {
        status: randomStatus,
        details: randomDetails,
     };


  } catch (error: any) {
    console.error('Error analyzing plant image:', error);
    throw new Error(error.message || 'Failed to connect to the analysis service.');
  }
}
