# Zhidian - Camera Translator

A mobile and desktop dictionary application powered by AI and computer vision. This project includes a React Native mobile app that provides real-time camera-based text translation.

## Projects

### Camera Translator Mobile App (`/CameraTranslator`)

A React Native mobile application that uses camera-based text recognition and AI translation to instantly translate text in real-time.

**Features:**
- 📸 Real-time camera text scanning
- 🌍 Multi-language AI translation
- ⚡ Support for OpenAI, Anthropic, and Google Translate APIs
- 📱 Cross-platform (iOS & Android)
- 🎯 Smart language detection
- ⚙️ Customizable settings

**Quick Start:**
```bash
cd CameraTranslator
npm install
npm run android  # or npm run ios
```

See the [CameraTranslator README](./CameraTranslator/README.md) for detailed setup instructions.

## Technology Stack

- **Mobile**: React Native, TypeScript
- **Camera**: React Native Vision Camera
- **Text Recognition**: React Native Text Recognition
- **UI**: React Native Paper, Material Design
- **Navigation**: React Navigation
- **Translation APIs**: OpenAI GPT, Anthropic Claude, Google Translate
- **State Management**: React Hooks, AsyncStorage

## Getting Started

1. **Prerequisites**
   - Node.js (>=16)
   - React Native CLI
   - Android Studio / Xcode
   - API keys for translation services (optional)

2. **Installation**
   ```bash
   git clone <repository-url>
   cd zhidian/CameraTranslator
   npm install
   ```

3. **Setup**
   - Configure API keys in `.env` file
   - Set up camera permissions
   - Install platform-specific dependencies

4. **Run**
   ```bash
   npm run android  # Android
   npm run ios      # iOS
   ```

## Project Structure

```
zhidian/
├── CameraTranslator/           # React Native mobile app
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── screens/           # App screens
│   │   ├── services/          # Business logic & APIs
│   │   ├── config/            # App configuration
│   │   └── types/             # TypeScript definitions
│   ├── android/               # Android-specific code
│   ├── ios/                   # iOS-specific code
│   └── README.md              # Detailed setup guide
└── README.md                  # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions and support, please open an issue on GitHub.
