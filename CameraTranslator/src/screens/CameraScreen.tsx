import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {runOnJS} from 'react-native-reanimated';
import {
  Button,
  Card,
  ActivityIndicator,
  Portal,
  Modal,
  IconButton,
} from 'react-native-paper';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';
import {TranslationService} from '../services/TranslationService';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const CameraScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [detectedText, setDetectedText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('es'); // Default to Spanish
  
  const devices = useCameraDevices();
  const device = devices.back;
  const navigation = useNavigation();
  const translationService = new TranslationService();

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const permission = Platform.OS === 'ios' 
        ? PERMISSIONS.IOS.CAMERA 
        : PERMISSIONS.ANDROID.CAMERA;
      
      const result = await request(permission);
      setHasPermission(result === RESULTS.GRANTED);
      
      if (result !== RESULTS.GRANTED) {
        Alert.alert(
          'Camera Permission Required',
          'Please grant camera permission to use text recognition.',
          [{text: 'OK'}]
        );
      }
    } catch (error) {
      console.error('Permission request error:', error);
    }
  };

  const processDetectedText = async (text: string) => {
    if (text.trim() && text !== detectedText) {
      setDetectedText(text.trim());
    }
  };

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    
    // Simulated text detection - replace with actual OCR library
    // In a real implementation, you would use a library like react-native-text-recognition
    const mockDetectedText = 'Hello World'; // This would come from OCR
    
    runOnJS(processDetectedText)(mockDetectedText);
  }, []);

  const translateText = async () => {
    if (!detectedText.trim()) {
      Alert.alert('No Text', 'Please point the camera at some text first.');
      return;
    }

    setIsTranslating(true);
    try {
      const translation = await translationService.translateText(
        detectedText,
        'auto',
        targetLanguage
      );
      setTranslatedText(translation);
      setShowTranslation(true);
    } catch (error) {
      console.error('Translation error:', error);
      Alert.alert('Translation Error', 'Failed to translate text. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const captureAndTranslate = () => {
    if (detectedText) {
      translateText();
    } else {
      Alert.alert('No Text Detected', 'Please point the camera at text to scan.');
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Camera permission is required to scan text
        </Text>
        <Button mode="contained" onPress={requestCameraPermission}>
          Grant Permission
        </Button>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>No camera device found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={isActive}
        frameProcessor={frameProcessor}
      />
      
      {/* Overlay */}
      <View style={styles.overlay}>
        {/* Top overlay */}
        <View style={styles.topOverlay}>
          <IconButton
            icon="arrow-left"
            iconColor="white"
            size={30}
            onPress={() => navigation.goBack()}
          />
        </View>

        {/* Center frame */}
        <View style={styles.centerContainer}>
          <View style={styles.scanFrame} />
          {detectedText ? (
            <Card style={styles.textCard}>
              <Card.Content>
                <Text style={styles.detectedText}>{detectedText}</Text>
              </Card.Content>
            </Card>
          ) : (
            <Text style={styles.instructionText}>
              Point camera at text to scan
            </Text>
          )}
        </View>

        {/* Bottom controls */}
        <View style={styles.bottomOverlay}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={captureAndTranslate}
            disabled={isTranslating || !detectedText}>
            {isTranslating ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.captureButtonText}>Translate</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Translation Modal */}
      <Portal>
        <Modal
          visible={showTranslation}
          onDismiss={() => setShowTranslation(false)}
          contentContainerStyle={styles.modalContent}>
          <Card>
            <Card.Title title="Translation" />
            <Card.Content>
              <Text style={styles.originalText}>Original:</Text>
              <Text style={styles.textContent}>{detectedText}</Text>
              
              <Text style={styles.translatedTitle}>Translated:</Text>
              <Text style={styles.textContent}>{translatedText}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => setShowTranslation(false)}>
                Close
              </Button>
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    maxHeight: 100,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  centerContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  scanFrame: {
    width: width * 0.8,
    height: 200,
    borderWidth: 2,
    borderColor: '#6366f1',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  textCard: {
    marginTop: 20,
    maxWidth: width * 0.8,
  },
  detectedText: {
    fontSize: 16,
    textAlign: 'center',
  },
  instructionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
    borderRadius: 8,
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 150,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  captureButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#64748b',
  },
  modalContent: {
    margin: 20,
  },
  originalText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#64748b',
    marginBottom: 5,
  },
  translatedTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#64748b',
    marginTop: 15,
    marginBottom: 5,
  },
  textContent: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default CameraScreen; 