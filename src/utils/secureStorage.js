import * as SecureStore from 'expo-secure-store';

export const getOpenAIKey = async () => {
  try {
    // Try to get from secure storage first
    let key = await SecureStore.getItemAsync('openai_api_key');
    if (!key) {
      // Fallback to environment variable or config
      key = process.env.OPENAI_API_KEY;
    }
    return key;
  } catch (error) {
    console.error('Error retrieving OpenAI key:', error);
    return process.env.OPENAI_API_KEY;
  
  }
};

export const setOpenAIKey = async (key) => {
  try {
    await SecureStore.setItemAsync('openai_api_key', key);
  } catch (error) {
    console.error('Error saving OpenAI key:', error);
  }
};
