import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <Image
              source={{
                uri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiByeD0iOCIgZmlsbD0iIzYzNjZmMSIvPgo8Y2lyY2xlIGN4PSI3NSIgY3k9IjI1IiByPSI1IiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIyMCIgeT0iNDAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMjAiIHk9IjUwIiB3aWR0aD0iNDAiIGhlaWdodD0iNCIgcng9IjIiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
              }}
              style={styles.icon}
            />
          </View>
          <Title style={styles.title}>Camera Translator</Title>
          <Paragraph style={styles.description}>
            Point your camera at any text and get instant translations in your preferred language.
          </Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Camera')}
          style={styles.primaryButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}>
          Start Scanning
        </Button>

        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Settings')}
          style={styles.secondaryButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.secondaryButtonLabel}>
          Settings
        </Button>
      </View>

      <Card style={styles.featureCard}>
        <Card.Content>
          <Title style={styles.featureTitle}>Features</Title>
          <View style={styles.featureList}>
            <Paragraph style={styles.featureItem}>📸 Real-time text recognition</Paragraph>
            <Paragraph style={styles.featureItem}>🌍 Multiple language support</Paragraph>
            <Paragraph style={styles.featureItem}>⚡ Instant translation</Paragraph>
            <Paragraph style={styles.featureItem}>📱 Works offline for common languages</Paragraph>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  card: {
    marginBottom: 30,
    elevation: 4,
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#6366f1',
    marginBottom: 15,
    borderRadius: 12,
  },
  secondaryButton: {
    borderColor: '#6366f1',
    borderWidth: 2,
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
  },
  featureCard: {
    elevation: 2,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
  },
});

export default HomeScreen; 