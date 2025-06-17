export const Environment = {
  // Translation API Keys - Replace with your actual API keys
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
  GOOGLE_TRANSLATE_API_KEY: process.env.GOOGLE_TRANSLATE_API_KEY || '',
  
  // App Configuration
  DEFAULT_TARGET_LANGUAGE: process.env.DEFAULT_TARGET_LANGUAGE || 'es',
  ENABLE_FALLBACK_TRANSLATIONS: process.env.ENABLE_FALLBACK_TRANSLATIONS !== 'false',
  
  // API Endpoints
  OPENAI_ENDPOINT: 'https://api.openai.com/v1/chat/completions',
  ANTHROPIC_ENDPOINT: 'https://api.anthropic.com/v1/messages',
  GOOGLE_TRANSLATE_ENDPOINT: 'https://translation.googleapis.com/language/translate/v2',
  
  // App Settings
  REQUEST_TIMEOUT: 10000, // 10 seconds
  MAX_TEXT_LENGTH: 5000,
  SUPPORTED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png'],
  
  // Camera Settings
  CAMERA_QUALITY: 'medium' as const,
  TEXT_RECOGNITION_LANGUAGE: 'latin',
  
  // Development
  __DEV__: __DEV__,
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
}; 