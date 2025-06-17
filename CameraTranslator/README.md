# Camera Translator Mobile App

A React Native mobile application that uses camera-based text recognition and AI translation to instantly translate text in real-time. Simply point your camera at any text and get translations in your preferred language.

## Features

- 📸 **Real-time Text Recognition**: Scan text using your device's camera
- 🌍 **Multi-language Support**: Translate to/from 10+ languages
- ⚡ **Instant AI Translation**: Powered by OpenAI, Anthropic, and Google Translate APIs
- 📱 **Cross-platform**: Works on both iOS and Android
- 🎯 **Smart Language Detection**: Automatically detects source language
- ⚙️ **Customizable Settings**: Choose target language and auto-translate preferences
- 🔒 **Privacy-focused**: Process translations securely

## Supported Languages

- Spanish (Español)
- French (Français)
- German (Deutsch)
- Italian (Italiano)
- Portuguese (Português)
- Russian (Русский)
- Japanese (日本語)
- Korean (한국어)
- Chinese (中文)
- Arabic (العربية)

## Prerequisites

- Node.js (>=16)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)
- API keys for translation services (optional but recommended)

## Installation

1. **Clone and install dependencies:**
   ```bash
   cd CameraTranslator
   npm install
   ```

2. **Install iOS dependencies (iOS only):**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Set up API keys (optional):**
   Create a `.env` file in the root directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key_here
   ```

## Running the App

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

## App Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Main app screens
│   ├── HomeScreen.tsx      # App home with navigation
│   ├── CameraScreen.tsx    # Camera and text recognition
│   └── SettingsScreen.tsx  # App configuration
├── services/           # Business logic and APIs
│   └── TranslationService.ts
├── config/             # App configuration
│   └── environment.ts
└── types/              # TypeScript type definitions
```

## Key Components

### HomeScreen
- Welcome interface with app overview
- Navigation to camera and settings
- Feature highlights and instructions

### CameraScreen
- Real-time camera view with text detection overlay
- Text recognition and highlighting
- Translation trigger and results modal
- Camera permissions handling

### SettingsScreen
- Target language selection
- Auto-translate toggle
- Interface preferences (sound, haptic feedback)
- Data management options

### TranslationService
- Multi-provider translation support (OpenAI, Anthropic, Google)
- Fallback translation system
- Language detection capabilities
- Error handling and retry logic

## Translation Providers

The app supports multiple translation providers with automatic fallback:

1. **OpenAI GPT-3.5/4**: High-quality contextual translations
2. **Anthropic Claude**: Advanced AI translation capabilities
3. **Google Translate**: Fast and reliable translation service
4. **Fallback System**: Built-in translations for common phrases

## Permissions

### Android
- `CAMERA`: Required for text scanning
- `INTERNET`: For API-based translations
- `WRITE_EXTERNAL_STORAGE`: For saving images (optional)
- `READ_EXTERNAL_STORAGE`: For accessing images (optional)

### iOS
- `NSCameraUsageDescription`: Camera access for text scanning
- `NSMicrophoneUsageDescription`: Enhanced camera functionality
- `NSPhotoLibraryUsageDescription`: Saving translated images

## Configuration

The app can be configured through `src/config/environment.ts`:

- **API Endpoints**: Configure translation service URLs
- **Default Language**: Set the default target language
- **Timeout Settings**: Adjust API request timeouts
- **Camera Settings**: Configure camera quality and recognition language

## Development

### Adding New Languages

1. Update `SUPPORTED_LANGUAGES` in `SettingsScreen.tsx`
2. Add language patterns in `TranslationService.detectLanguage()`
3. Include fallback translations for demo purposes

### Adding New Translation Providers

1. Implement provider method in `TranslationService`
2. Add provider configuration to `providers` array
3. Update environment configuration if needed

## Troubleshooting

### Camera Not Working
- Ensure camera permissions are granted
- Check that the device has a camera
- Verify React Native Vision Camera setup

### Translation Failures
- Check API key configuration
- Verify network connectivity
- Review API usage limits and quotas

### Build Issues
- Clean and rebuild: `npx react-native clean && npm run android/ios`
- Reset Metro cache: `npx react-native start --reset-cache`
- Check React Native environment setup

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and feature requests, please open an issue on GitHub.

## API Keys Setup Guide

### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Generate a new API key
5. Add to your `.env` file

### Anthropic API Key
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create an account or sign in
3. Generate an API key
4. Add to your `.env` file

### Google Translate API Key
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Cloud Translation API
3. Create credentials (API Key)
4. Add to your `.env` file

Note: The app includes fallback translations and will work without API keys, but with limited translation capabilities.
