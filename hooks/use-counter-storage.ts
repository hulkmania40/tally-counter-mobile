import { Surah } from '@/types/surah';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const STORAGE_KEY = '@tally_counter_count';
const STORAGE_GOAL_KEY = '@tally_counter_goal';
const STORAGE_SURAH_KEY = '@tally_counter_selected_surah';

export function useCounterStorage() {
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(0);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [savedCount, savedGoal, savedSurah] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEY),
          AsyncStorage.getItem(STORAGE_GOAL_KEY),
          AsyncStorage.getItem(STORAGE_SURAH_KEY),
        ]);
        if (savedCount !== null) {
          setCount(parseInt(savedCount, 10));
        }
        if (savedGoal !== null) {
          setGoal(parseInt(savedGoal, 10));
        }
        if (savedSurah !== null) {
          setSelectedSurah(JSON.parse(savedSurah));
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  // Save count whenever it changes
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(STORAGE_KEY, count.toString()).catch((error) => {
        console.error('Failed to save count:', error);
      });
    }
  }, [count, isLoaded]);

  // Save goal
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(STORAGE_GOAL_KEY, goal.toString()).catch((error) => {
        console.error('Failed to save goal:', error);
      });
    }
  }, [goal, isLoaded]);

  // Save selected Surah
  useEffect(() => {
    if (isLoaded && selectedSurah) {
      AsyncStorage.setItem(STORAGE_SURAH_KEY, JSON.stringify(selectedSurah)).catch((error) => {
        console.error('Failed to save surah:', error);
      });
    }
  }, [selectedSurah, isLoaded]);

  return {
    count,
    setCount,
    goal,
    setGoal,
    selectedSurah,
    setSelectedSurah,
    isLoaded,
  };
}
