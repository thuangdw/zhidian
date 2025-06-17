import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  List,
  Switch,
  Divider,
  Card,
  Title,
  Button,
  Portal,
  Modal,
  RadioButton,
  Text,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const SUPPORTED_LANGUAGES: Language[] = [
  {code: 'es', name: 'Spanish', nativeName: 'Español'},
  {code: 'fr', name: 'French', nativeName: 'Français'},
  {code: 'de', name: 'German', nativeName: 'Deutsch'},
  {code: 'it', name: 'Italian', nativeName: 'Italiano'},
  {code: 'pt', name: 'Portuguese', nativeName: 'Português'},
  {code: 'ru', name: 'Russian', nativeName: 'Русский'},
  {code: 'ja', name: 'Japanese', nativeName: '日本語'},
  {code: 'ko', name: 'Korean', nativeName: '한국어'},
  {code: 'zh', name: 'Chinese', nativeName: '中文'},
  {code: 'ar', name: 'Arabic', nativeName: 'العربية'},
];

const SettingsScreen: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [tempSelectedLanguage, setTempSelectedLanguage] = useState('es');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.multiGet([
        'targetLanguage',
        'autoTranslate',
        'soundEnabled',
        'hapticEnabled',
      ]);

      settings.forEach(([key, value]) => {
        if (value !== null) {
          switch (key) {
            case 'targetLanguage':
              setSelectedLanguage(value);
              break;
            case 'autoTranslate':
              setAutoTranslate(value === 'true');
              break;
            case 'soundEnabled':
              setSoundEnabled(value === 'true');
              break;
            case 'hapticEnabled':
              setHapticEnabled(value === 'true');
              break;
          }
        }
      });
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    saveSettings('targetLanguage', language);
    setShowLanguageModal(false);
  };

  const handleAutoTranslateChange = (value: boolean) => {
    setAutoTranslate(value);
    saveSettings('autoTranslate', value.toString());
  };

  const handleSoundChange = (value: boolean) => {
    setSoundEnabled(value);
    saveSettings('soundEnabled', value.toString());
  };

  const handleHapticChange = (value: boolean) => {
    setHapticEnabled(value);
    saveSettings('hapticEnabled', value.toString());
  };

  const getSelectedLanguageName = () => {
    const language = SUPPORTED_LANGUAGES.find(
      lang => lang.code === selectedLanguage
    );
    return language ? `${language.name} (${language.nativeName})` : 'Spanish';
  };

  const openLanguageSelector = () => {
    setTempSelectedLanguage(selectedLanguage);
    setShowLanguageModal(true);
  };

  const clearCache = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Cache cleared successfully');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Translation Settings</Title>
          
          <List.Item
            title="Target Language"
            description={getSelectedLanguageName()}
            left={props => <List.Icon {...props} icon="translate" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={openLanguageSelector}
          />
          
          <Divider />
          
          <List.Item
            title="Auto Translate"
            description="Translate text automatically when detected"
            left={props => <List.Icon {...props} icon="auto-fix" />}
            right={() => (
              <Switch
                value={autoTranslate}
                onValueChange={handleAutoTranslateChange}
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Interface Settings</Title>
          
          <List.Item
            title="Sound Effects"
            description="Play sounds for interactions"
            left={props => <List.Icon {...props} icon="volume-high" />}
            right={() => (
              <Switch
                value={soundEnabled}
                onValueChange={handleSoundChange}
              />
            )}
          />
          
          <Divider />
          
          <List.Item
            title="Haptic Feedback"
            description="Vibrate on button presses"
            left={props => <List.Icon {...props} icon="vibrate" />}
            right={() => (
              <Switch
                value={hapticEnabled}
                onValueChange={handleHapticChange}
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Data & Storage</Title>
          
          <List.Item
            title="Clear Cache"
            description="Remove stored translations and settings"
            left={props => <List.Icon {...props} icon="delete" />}
            onPress={clearCache}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>About</Title>
          
          <List.Item
            title="Version"
            description="1.0.0"
            left={props => <List.Icon {...props} icon="information" />}
          />
          
          <List.Item
            title="Developer"
            description="Camera Translator Team"
            left={props => <List.Icon {...props} icon="account" />}
          />
        </Card.Content>
      </Card>

      {/* Language Selection Modal */}
      <Portal>
        <Modal
          visible={showLanguageModal}
          onDismiss={() => setShowLanguageModal(false)}
          contentContainerStyle={styles.modalContent}>
          <Card>
            <Card.Title title="Select Target Language" />
            <Card.Content>
              <RadioButton.Group
                onValueChange={setTempSelectedLanguage}
                value={tempSelectedLanguage}>
                {SUPPORTED_LANGUAGES.map(language => (
                  <View key={language.code} style={styles.radioItem}>
                    <RadioButton.Item
                      label={`${language.name} (${language.nativeName})`}
                      value={language.code}
                      labelStyle={styles.radioLabel}
                    />
                  </View>
                ))}
              </RadioButton.Group>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => setShowLanguageModal(false)}>
                Cancel
              </Button>
              <Button onPress={() => handleLanguageChange(tempSelectedLanguage)}>
                Select
              </Button>
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  card: {
    margin: 16,
    marginBottom: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1e293b',
  },
  modalContent: {
    margin: 20,
  },
  radioItem: {
    marginVertical: 4,
  },
  radioLabel: {
    fontSize: 16,
  },
});

export default SettingsScreen; 