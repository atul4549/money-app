import React, { useState, useEffect, JSX } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  // Alert,
  Share,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Quote } from '@/types/quote';

export default function FavoritesScreen() {
  const router = useRouter();
  // const [favorites, setFavorites] = useState([]);
  const [favorites, setFavorites] = useState<Quote[]>([]);

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

  // const removeFavorite = async (quoteId: number) => {
  //   Alert.alert(
  //     'Remove Favorite',
  //     'Are you sure you want to remove this quote?',
  //     [
  //       { text: 'Cancel', style: 'cancel' },
  //       {
  //         text: 'Remove',
  //         style: 'destructive',
  //         onPress: async () => {
  //           const newFavorites = favorites.filter((f: Quote) => f.id !== quoteId);
  //           setFavorites(newFavorites);
  //           try {
  //             await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  //           } catch (error) {
  //             console.error('Error removing favorite:', error);
  //           }
  //         },
  //       },
  //     ]
  //   );
  // };

  const shareQuote = async (quote: any) => {
    try {
      await Share.share({
        message: `"${quote.text}" - ${quote.author}`,
      });
    } catch (error: any) {
      console.error('Error sharing:', error.message);
    }
  };

  const renderQuoteItem = ({ item }: { item: Quote }): JSX.Element => (
    <View style={styles.quoteItem}>
      <View style={styles.quoteContent}>
        {/* <Text style={styles.quoteText}>"{item.text}"</Text>
        <Text style={styles.authorText}>— {item.author}</Text> */}
        <Text style={styles.quoteText}>&ldquo;{item.text}&rdquo;</Text>
        {/* <Text style={styles.authorText}>&mdash; {item.author}</Text> */}
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
      
      <View style={styles.quoteActions}>
        <TouchableOpacity 
          style={styles.quoteActionButton}
          onPress={() => shareQuote(item)}
        >
          <Text style={styles.quoteActionIcon}>📤</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity 
          style={[styles.quoteActionButton, styles.removeButton]}
          onPress={() => removeFavorite(item.id)}
        >
          <Text style={styles.quoteActionIcon}>🗑️</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Favorites</Text>
        <View style={styles.backButton} />
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>💔</Text>
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyText}>
            Start adding quotes to your favorites by tapping the heart icon!
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => router.back()}
          >
            <Text style={styles.browseButtonText}>Browse Quotes</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderQuoteItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  quoteItem: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quoteContent: {
    flex: 1,
    marginRight: 10,
  },
  quoteText: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 10,
  },
  authorText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  categoryTag: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#667eea',
    borderRadius: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  quoteActions: {
    gap: 10,
  },
  quoteActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  quoteActionIcon: {
    fontSize: 18,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 30,
  },
  browseButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});