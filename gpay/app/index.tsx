import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Share,
  Animated,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { quotes as a } from '../data/quotes';
import { additionalQuotes as b} from '@/data/quotes-extended';
import QuoteCard from '../components/QuoteCard';
import CategoryFilter from '../components/CategoryFilter';
import { Quote } from '@/types/quote';

const allQuotes: Quote[] = [...a, ...b];
// console.log(allQuotes); // Debugging line
const quotes = allQuotes
const categories = [
  // 'Motivation', 'Life', 'Success', 'Love', 'Wisdom', 'Humor',
  'All',
  'Boy', 
  'Girl', 
  'Boyfriend', 
  'Girlfriend'
];
export default function HomeScreen() {
  const router = useRouter();
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [fadeAnim] = useState(new Animated.Value(1));
  const [favorites, setFavorites] = useState([]);
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (newFavorites: any) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const getRandomQuote = useCallback(() => {
    // Button press animation
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    // Quote fade animation
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    const filteredQuotes = selectedCategory === 'All' 
      ? quotes 
      : quotes.filter(q => q.category === selectedCategory);

    if (filteredQuotes.length === 0) return;

    let newQuote;
    if (filteredQuotes.length > 1) {
      do {
        newQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
      } while (newQuote?.id === currentQuote?.id);
    } else {
      newQuote = filteredQuotes[0];
    }

    setCurrentQuote(newQuote);
  }, [selectedCategory, currentQuote, fadeAnim]);

  const toggleFavorite = async (quote: Quote): Promise<void> => {
    const isFavorite: boolean = favorites.some((f: Quote) => f.id === quote.id);
    let newFavorites: Quote[];
    
    if (isFavorite) {
      newFavorites = favorites.filter((f: Quote) => f.id !== quote.id);
    } else {
      newFavorites = [...favorites, quote];
    }
    
    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  const shareQuote = async () => {
    try {
      await Share.share({
        message: `"${currentQuote.text}" - ${currentQuote.author}`,
        title: 'Share Quote',
      });
    } catch (error: unknown) {
      console.error('Error sharing:', error.message);
    }
  };

  const isCurrentFavorite = favorites.some((f: Quote) => f.id === currentQuote.id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>✨ Random Quotes</Text>
          <Text style={styles.subtitle}>Daily Inspiration</Text>
        </View>
        <TouchableOpacity 
          style={styles.favoritesButton}
          onPress={() => router.push('/favorites')}
        >
          <Text style={styles.favoritesIcon}>⭐</Text>
          {favorites.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{favorites.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <View style={styles.quoteWrapper}>
        <Animated.View style={[styles.quoteContainer, { opacity: fadeAnim }]}>
          <QuoteCard quote={currentQuote} />
        </Animated.View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => toggleFavorite(currentQuote)}
        >
          <Text style={styles.iconText}>
            {isCurrentFavorite ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>

        <Animated.View style={[styles.generateButtonWrapper, { transform: [{ scale: scaleAnim }] }]}>
          <TouchableOpacity
            style={styles.generateButton}
            onPress={getRandomQuote}
            activeOpacity={0.8}
          >
            <Text style={styles.generateButtonText}>Generate Quote</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity 
          style={styles.iconButton}
          onPress={shareQuote}
        >
          <Text style={styles.iconText}>📤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  favoritesButton: {
    position: 'relative',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoritesIcon: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff6b6b',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  quoteWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  quoteContainer: {
    minHeight: 300,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 15,
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
  },
  generateButtonWrapper: {
    flex: 1,
  },
  generateButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});