import { ThemedText } from '@/components/themed-text';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, TextInput } from 'react-native';

interface GoalModalProps {
  visible: boolean;
  onClose: () => void;
  onSetGoal: (goal: number) => void;
}

export function GoalModal({ visible, onClose, onSetGoal }: GoalModalProps) {
  const [tempGoal, setTempGoal] = useState('');

  const handleSetGoal = () => {
    const goalValue = parseInt(tempGoal, 10);
    if (!isNaN(goalValue) && goalValue > 0) {
      onSetGoal(goalValue);
      setTempGoal('');
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <ThemedText style={styles.modalTitle}>Set Your Goal</ThemedText>
          <TextInput
            style={styles.input}
            value={tempGoal}
            onChangeText={setTempGoal}
            placeholder="Enter goal count"
            keyboardType="number-pad"
            placeholderTextColor="#94a3b8"
          />
          <Pressable style={styles.modalButton} onPress={handleSetGoal}>
            <ThemedText style={styles.modalButtonText}>Set Goal</ThemedText>
          </Pressable>
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
  input: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
    color: '#1e293b',
    backgroundColor: '#f8fafc',
  },
  modalButton: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
