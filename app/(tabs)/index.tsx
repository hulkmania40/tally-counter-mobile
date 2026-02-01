import * as Haptics from 'expo-haptics';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

import { ControlButtons } from '@/components/tally-counter/control-buttons';
import { CounterDisplay } from '@/components/tally-counter/counter-display';
import { GoalModal } from '@/components/tally-counter/goal-modal';
import { SurahContentDisplay } from '@/components/tally-counter/surah-content-display';
import { SurahSelectionModal } from '@/components/tally-counter/surah-selection-modal';
import { ThemedView } from '@/components/themed-view';
import { useCounterStorage } from '@/hooks/use-counter-storage';
import { Surah } from '@/types/surah';

export default function HomeScreen() {
  const {
    count,
    setCount,
    goal,
    setGoal,
    selectedSurah,
    setSelectedSurah,
  } = useCounterStorage();

  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showSurahModal, setShowSurahModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiRef = useRef<any>(null);

  // Animated values
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  const pulse = useCallback(() => {
    scale.value = withSequence(withTiming(1.06, { duration: 100 }), withTiming(1, { duration: 120 }));
  }, [scale]);

  const animateNumber = useCallback((dir: 1 | -1) => {
    translateY.value = dir * 14;
    opacity.value = 0;
    translateY.value = withTiming(0, { duration: 180 });
    opacity.value = withTiming(1, { duration: 180 });
  }, [opacity, translateY]);

  const onIncrement = useCallback(() => {
    setCount((c) => {
      const next = c + 1;
      animateNumber(1);
      return next;
    });
    pulse();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  }, [animateNumber, pulse, setCount]);

  const onDecrement = useCallback(() => {
    setCount((c) => {
      const next = c > 0 ? c - 1 : 0;
      animateNumber(-1);
      return next;
    });
    pulse();
    Haptics.selectionAsync().catch(() => {});
  }, [animateNumber, pulse, setCount]);

  const onReset = useCallback(() => {
    Alert.alert(
      'Reset Counter',
      'Are you sure you want to reset the count to zero?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setCount(0);
            scale.value = withSequence(withTiming(0.96, { duration: 90 }), withTiming(1, { duration: 130 }));
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
          },
        },
      ]
    );
  }, [scale, setCount]);

  const onSelectSurah = useCallback((surah: Surah) => {
    setSelectedSurah(surah);
    setShowSurahModal(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  }, [setSelectedSurah]);

  const animatedCountStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  // Check if goal is reached and trigger confetti
  useEffect(() => {
    if (goal > 0 && count >= goal && count > 0) {
      setShowConfetti(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      if (confettiRef.current) {
        confettiRef.current.start();
      }
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [count, goal]);

  return (
    <ThemedView style={styles.container}>
      <SurahContentDisplay 
        selectedSurah={selectedSurah}
        onSelectPress={() => setShowSurahModal(true)}
      />

      <CounterDisplay
        count={count}
        goal={goal}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        animatedCountStyle={animatedCountStyle}
      />

      <ControlButtons
        onSurahPress={() => setShowSurahModal(true)}
        onGoalPress={() => setShowGoalModal(true)}
        onResetPress={onReset}
      />

      <GoalModal
        visible={showGoalModal}
        onClose={() => setShowGoalModal(false)}
        onSetGoal={setGoal}
      />

      <SurahSelectionModal
        visible={showSurahModal}
        selectedSurah={selectedSurah}
        onClose={() => setShowSurahModal(false)}
        onSelectSurah={onSelectSurah}
      />

      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          autoStart={true}
          fadeOut={true}
          fallSpeed={3000}
          explosionSpeed={350}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
