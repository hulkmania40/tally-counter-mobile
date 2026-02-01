import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { AnimatedStyle, FadeIn } from 'react-native-reanimated';

interface CounterDisplayProps {
  count: number;
  goal: number;
  onIncrement: () => void;
  onDecrement: () => void;
  animatedCountStyle: AnimatedStyle;
}

export function CounterDisplay({ 
  count, 
  goal, 
  onIncrement, 
  onDecrement, 
  animatedCountStyle 
}: CounterDisplayProps) {
  return (
    <Animated.View 
      entering={FadeIn.duration(800).delay(200)}
      style={styles.countArea} 
      accessible 
      accessibilityLabel={`Current count is ${count}`}
    >
      {goal > 0 && (
        <ThemedText style={styles.goalText}>
          Goal: {goal}
        </ThemedText>
      )}
      
      {/* Counter with side buttons */}
      <Animated.View style={styles.counterRow}>
        {/* Decrement button on left */}
        <Pressable
          onPress={onDecrement}
          accessibilityRole="button"
          accessibilityLabel="Decrement"
          hitSlop={16}
          style={({ pressed }) => [
            styles.sideButton, 
            styles.sideButtonLeft, 
            pressed && styles.buttonPressed
          ]}
        >
          <MaterialIcons name="remove" size={32} color="#fff" />
        </Pressable>

        {/* Count number */}
        <Animated.View style={[styles.countWrapper, animatedCountStyle]}>
          <ThemedText
            style={[styles.countText, { fontFamily: Fonts.rounded }]}
          >
            {count}
          </ThemedText>
        </Animated.View>

        {/* Increment button on right */}
        <Pressable
          onPress={onIncrement}
          accessibilityRole="button"
          accessibilityLabel="Increment"
          hitSlop={16}
          style={({ pressed }) => [
            styles.sideButton, 
            styles.sideButtonRight, 
            pressed && styles.buttonPressed
          ]}
        >
          <MaterialIcons name="add" size={36} color="#fff" />
        </Pressable>
      </Animated.View>

      {goal > 0 && (
        <ThemedText style={styles.progressText}>
          {count >= goal ? '🎉 Goal Reached!' : `${Math.max(0, goal - count)} more to go`}
        </ThemedText>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  countArea: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  sideButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  sideButtonLeft: {
    backgroundColor: '#0ea5e9', // sky-500 for decrement
  },
  sideButtonRight: {
    backgroundColor: '#22c55e', // green-500 for increment
    width: 80,
    height: 80,
    borderRadius: 40
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  goalText: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.6,
    marginBottom: 12,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.7,
    marginTop: 16,
  },
  countWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 160,
    fontWeight: '700',
    letterSpacing: -4,
    textAlign: 'center',
    lineHeight: 160,
  },
});
