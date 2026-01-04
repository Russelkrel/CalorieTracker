import axios from 'axios';
import { getOpenAIKey } from '../utils/secureStorage';

export const visionApi = {
  async analyzeFoodImage(imageBase64) {
    try {
      const apiKey = await getOpenAIKey();
      
      if (!apiKey || apiKey === 'your_openai_api_key_here') {
        throw new Error(
          'OpenAI API key not configured. Please add your API key in Settings.'
        );
      }

      const prompt = `Analyze this food image and provide nutritional information for each food item visible. 
      For each food item, provide:
      1. Food name
      2. Estimated portion size (e.g., "1 cup", "2 slices")
      3. Approximate calories
      4. Macronutrients in grams: protein, carbs, fat
      5. Confidence level (0-1) for accuracy
      
      Return the response as a valid JSON object with this structure:
      {
        "foods": [
          {
            "name": "food name",
            "portionSize": "1 cup",
            "calories": 200,
            "macronutrients": {
              "protein": 5,
              "carbs": 40,
              "fat": 2
            },
            "confidence": 0.85
          }
        ],
        "analysisNotes": "Any additional notes about the analysis"
      }`;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4-vision-preview',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: prompt,
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:image/jpeg;base64,${imageBase64}`,
                  },
                },
              ],
            },
          ],
          max_tokens: 1024,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const content = response.data.choices[0].message.content;
      
      // Extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse food analysis response');
      }

      const analysis = JSON.parse(jsonMatch[0]);
      return analysis;
    } catch (error) {
      console.error('Error analyzing food image:', error);
      throw new Error(
        error.response?.data?.error?.message ||
          error.message ||
          'Failed to analyze food image. Please try again.'
      );
    }
  },
};
