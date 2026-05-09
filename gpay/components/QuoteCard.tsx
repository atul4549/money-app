import React from "react";
import { StyleSheet, Text, View } from "react-native";

const QuoteCard = ({ quote }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* <Text style={styles.quoteMarks}>"</Text> */}
        <Text style={styles.quoteText}>{quote.text}</Text>
        {/* <View style={styles.divider} />
        <View style={styles.authorSection}>
          <View style={styles.authorAvatar}>
            <Text style={styles.avatarText}>
              {quote.author.charAt(0)}
            </Text>
          </View>
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{quote.author}</Text>
            <Text style={styles.category}>{quote.category}</Text>
          </View>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 35,
    width: "100%",
    // minHeight: 280,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  quoteMarks: {
    fontSize: 72,
    color: "#667eea",
    opacity: 0.2,
    textAlign: "center",
    marginBottom: -20,
    fontWeight: "bold",
  },
  quoteText: {
    fontSize: 22,
    color: "#333",
    lineHeight: 34,
    textAlign: "center",
    fontStyle: "italic",
    marginVertical: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 20,
  },
  authorSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  authorAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#667eea",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#667eea",
  },
  category: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default QuoteCard;
