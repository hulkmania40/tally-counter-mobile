import { ThemedText } from '@/components/themed-text';
import { Surah } from '@/types/surah';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface SurahContentDisplayProps {
  selectedSurah: Surah | null;
  onSelectPress: () => void;
}

export function SurahContentDisplay({ selectedSurah, onSelectPress }: SurahContentDisplayProps) {
  if (!selectedSurah) {
    return (
      <Animated.View 
        entering={FadeIn.duration(600).delay(100)}
        style={styles.emptySurahSection}
      >
        <Pressable 
          style={styles.addSurahButton}
          onPress={onSelectPress}
        >
          <MaterialIcons name="book" size={28} color="#8b5cf6" />
          <ThemedText style={styles.addSurahLabel}>Select a Surah to Read</ThemedText>
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View 
      entering={FadeIn.duration(600).delay(100)}
      style={styles.surahContentSection}
    >
      <Pressable 
        style={styles.surahHeaderButton}
        onPress={onSelectPress}
      >
        <ThemedText style={styles.surahContentTitle}>
          {selectedSurah.title}
        </ThemedText>
        <ThemedText style={styles.surahContentTransliteration}>
          {selectedSurah.transliteration}
        </ThemedText>
      </Pressable>
      <ScrollView 
        style={styles.surahContentScrollView}
        contentContainerStyle={styles.surahContentScrollContent}
      >
        <ThemedText style={styles.surahContentText}>
          {selectedSurah.content}
        </ThemedText>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  surahContentSection: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 92, 246, 0.2)',
  },
  emptySurahSection: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    alignItems: 'center',
  },
  surahHeaderButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    marginBottom: 12,
  },
  surahContentTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
    textAlign: 'center',
    color: '#8b5cf6',
  },
  surahContentTransliteration: {
    fontSize: 13,
    opacity: 0.7,
    textAlign: 'center',
  },
  surahContentScrollView: {
    maxHeight: 320,
  },
  surahContentScrollContent: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  surahContentText: {
    fontSize: 28,
    lineHeight: 36,
    textAlign: 'center',
    fontWeight: '600',
  },
  addSurahButton: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9d5ff',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(139, 92, 246, 0.05)',
  },
  addSurahLabel: {
    fontSize: 15,
    color: '#8b5cf6',
    fontWeight: '600',
  },
});
