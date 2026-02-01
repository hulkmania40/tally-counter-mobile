import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface ControlButtonsProps {
  onSurahPress: () => void;
  onGoalPress: () => void;
  onResetPress: () => void;
}

export function ControlButtons({ onSurahPress, onGoalPress, onResetPress }: ControlButtonsProps) {
  return (
    <Animated.View 
      entering={FadeInDown.duration(600).delay(400).springify()}
      style={styles.controls} 
      pointerEvents="box-none"
    >
      {/* Surah selection button */}
      <Pressable
        onPress={onSurahPress}
        accessibilityRole="button"
        accessibilityLabel="Select Surah"
        hitSlop={12}
        style={({ pressed }) => [styles.fab, styles.fabSurah, pressed && styles.fabPressed]}
      >
        <MaterialIcons name="book" size={26} color="#fff" />
      </Pressable>

      {/* Goal button */}
      <Pressable
        onPress={onGoalPress}
        accessibilityRole="button"
        accessibilityLabel="Set Goal"
        hitSlop={12}
        style={({ pressed }) => [styles.fab, styles.fabGoal, pressed && styles.fabPressed]}
      >
        <MaterialIcons name="flag" size={26} color="#fff" />
      </Pressable>

      {/* Reset button */}
      <Pressable
        onPress={onResetPress}
        accessibilityRole="button"
        accessibilityLabel="Reset"
        accessibilityHint="Reset the count to zero"
        hitSlop={12}
        style={({ pressed }) => [styles.fab, styles.fabTertiary, pressed && styles.fabPressed]}
      >
        <MaterialIcons name="refresh" size={26} color="#fff" />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  controls: {
    position: 'absolute',
    bottom: 36,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    gap: 16,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  fabTertiary: {
    backgroundColor: '#64748b',
  },
  fabGoal: {
    backgroundColor: '#f59e0b',
  },
  fabSurah: {
    backgroundColor: '#8b5cf6',
  },
  fabPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
});
