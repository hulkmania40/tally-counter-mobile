import { ThemedText } from '@/components/themed-text';
import { SURAHS } from '@/constants/surahs';
import { Surah } from '@/types/surah';
import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet } from 'react-native';

interface SurahSelectionModalProps {
  visible: boolean;
  selectedSurah: Surah | null;
  onClose: () => void;
  onSelectSurah: (surah: Surah) => void;
}

export function SurahSelectionModal({ 
  visible, 
  selectedSurah, 
  onClose, 
  onSelectSurah 
}: SurahSelectionModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable 
          style={[styles.modalContent, styles.surahModalContent]} 
          onPress={(e) => e.stopPropagation()}
        >
          <ThemedText style={styles.modalTitle}>Select a Surah</ThemedText>
          <ScrollView style={styles.surahList}>
            {SURAHS.map((surah) => (
              <Pressable
                key={surah.id}
                style={[
                  styles.surahItem,
                  selectedSurah?.id === surah.id && styles.surahItemSelected
                ]}
                onPress={() => onSelectSurah(surah)}
              >
                <ThemedText style={styles.surahItemTitle}>{surah.title}</ThemedText>
                <ThemedText style={styles.surahItemTransliteration}>
                  {surah.transliteration}
                </ThemedText>
              </Pressable>
            ))}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1e293b',
  },
  surahModalContent: {
    maxHeight: '70%',
  },
  surahList: {
    maxHeight: 400,
  },
  surahItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    borderRadius: 8,
    marginBottom: 8,
  },
  surahItemSelected: {
    backgroundColor: '#f0f4ff',
    borderColor: '#8b5cf6',
    borderWidth: 2,
  },
  surahItemTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
    color: '#1e293b',
  },
  surahItemTransliteration: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
});
