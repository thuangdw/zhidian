import axios from 'axios';

export interface TranslationProvider {
  name: string;
  apiKey?: string;
  endpoint: string;
}

export interface TranslationRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface TranslationResponse {
  translatedText: string;
  confidence?: number;
  provider: string;
}

export class TranslationService {
  private providers: TranslationProvider[] = [
    {
      name: 'openai',
      endpoint: 'https://api.openai.com/v1/chat/completions',
    },
    {
      name: 'anthropic',
      endpoint: 'https://api.anthropic.com/v1/messages',
    },
    {
      name: 'google-translate',
      endpoint: 'https://translation.googleapis.com/language/translate/v2',
    },
  ];

  private fallbackTranslations: Record<string, Record<string, string>> = {
    'Hello World': {
      es: 'Hola Mundo',
      fr: 'Bonjour le Monde',
      de: 'Hallo Welt',
      it: 'Ciao Mondo',
      pt: 'Olá Mundo',
      ru: 'Привет Мир',
      ja: 'こんにちは世界',
      ko: '안녕하세요 세계',
      zh: '你好世界',
      ar: 'مرحبا بالعالم',
    },
    'Good morning': {
      es: 'Buenos días',
      fr: 'Bonjour',
      de: 'Guten Morgen',
      it: 'Buongiorno',
      pt: 'Bom dia',
      ru: 'Доброе утро',
      ja: 'おはようございます',
      ko: '좋은 아침',
      zh: '早上好',
      ar: 'صباح الخير',
    },
  };

  async translateText(
    text: string,
    sourceLanguage: string = 'auto',
    targetLanguage: string = 'es'
  ): Promise<string> {
    // First try fallback translations for demo purposes
    if (this.fallbackTranslations[text] && this.fallbackTranslations[text][targetLanguage]) {
      return this.fallbackTranslations[text][targetLanguage];
    }

    // Try different providers in order
    for (const provider of this.providers) {
      try {
        const result = await this.translateWithProvider(
          provider,
          text,
          sourceLanguage,
          targetLanguage
        );
        if (result) {
          return result;
        }
      } catch (error) {
        console.warn(`Translation failed with ${provider.name}:`, error);
        continue;
      }
    }

    // If all providers fail, return a basic translation
    return this.getBasicTranslation(text, targetLanguage);
  }

  private async translateWithProvider(
    provider: TranslationProvider,
    text: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<string | null> {
    switch (provider.name) {
      case 'openai':
        return this.translateWithOpenAI(text, sourceLanguage, targetLanguage);
      case 'anthropic':
        return this.translateWithAnthropic(text, sourceLanguage, targetLanguage);
      case 'google-translate':
        return this.translateWithGoogle(text, sourceLanguage, targetLanguage);
      default:
        return null;
    }
  }

  private async translateWithOpenAI(
    text: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<string | null> {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a professional translator. Translate the following text from ${sourceLanguage} to ${targetLanguage}. Only respond with the translation, no additional text.`,
            },
            {
              role: 'user',
              content: text,
            },
          ],
          max_tokens: 150,
          temperature: 0.3,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('OpenAI translation error:', error);
      return null;
    }
  }

  private async translateWithAnthropic(
    text: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<string | null> {
    try {
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: 'claude-3-sonnet-20240229',
          max_tokens: 150,
          messages: [
            {
              role: 'user',
              content: `Translate this text from ${sourceLanguage} to ${targetLanguage}. Only respond with the translation: "${text}"`,
            },
          ],
        },
        {
          headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01',
          },
          timeout: 10000,
        }
      );

      return response.data.content[0].text.trim();
    } catch (error) {
      console.error('Anthropic translation error:', error);
      return null;
    }
  }

  private async translateWithGoogle(
    text: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<string | null> {
    try {
      const response = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {
          q: text,
          source: sourceLanguage === 'auto' ? undefined : sourceLanguage,
          target: targetLanguage,
          key: process.env.GOOGLE_TRANSLATE_API_KEY,
        },
        {
          timeout: 10000,
        }
      );

      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Google Translate error:', error);
      return null;
    }
  }

  private getBasicTranslation(text: string, targetLanguage: string): string {
    const basicTranslations: Record<string, string> = {
      es: `[ES] ${text}`,
      fr: `[FR] ${text}`,
      de: `[DE] ${text}`,
      it: `[IT] ${text}`,
      pt: `[PT] ${text}`,
      ru: `[RU] ${text}`,
      ja: `[JA] ${text}`,
      ko: `[KO] ${text}`,
      zh: `[ZH] ${text}`,
      ar: `[AR] ${text}`,
    };

    return basicTranslations[targetLanguage] || `[TRANSLATED] ${text}`;
  }

  getSupportedLanguages(): Record<string, string> {
    return {
      auto: 'Auto-detect',
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      de: 'German',
      it: 'Italian',
      pt: 'Portuguese',
      ru: 'Russian',
      ja: 'Japanese',
      ko: 'Korean',
      zh: 'Chinese',
      ar: 'Arabic',
    };
  }

  async detectLanguage(text: string): Promise<string> {
    // Simple language detection logic (in a real app, use a proper language detection service)
    const patterns = {
      es: /[ñáéíóúü]/i,
      fr: /[àâäéèêëïîôöùûüÿç]/i,
      de: /[äöüß]/i,
      ru: /[а-яё]/i,
      ja: /[ひらがなカタカナ]/,
      ko: /[가-힣]/,
      zh: /[一-龯]/,
      ar: /[ء-ي]/,
    };

    for (const [lang, pattern] of Object.entries(patterns)) {
      if (pattern.test(text)) {
        return lang;
      }
    }

    return 'en'; // Default to English
  }
} 