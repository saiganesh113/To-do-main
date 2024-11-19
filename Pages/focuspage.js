import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

export default function FocusPage({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="menu" size={28} color="white" />
        <Text style={styles.headerTitle}>Focus</Text>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.profileIcon} />
      </View>

      <View style={styles.contentWithDellBackground}>
        {/* Lock Icon in Background */}
        <MaterialIcons name="lock" size={200} color="light-white" style={styles.lockIcon} />

        <View style={styles.content}>
          <Text style={styles.text}>New Future is ready For you</Text>
        </View>
      </View>

      {/* Floating Action Button (FAB) */}
      <Pressable style={styles.fab} onPress={() => navigation.navigate('Add')}>
        <MaterialIcons name="add" size={32} color="white" />
      </Pressable>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <MaterialCommunityIcons name="view-grid" size={24} color="white" />
          <Text style={styles.navText}>Index</Text>
        </Pressable>

        <Pressable style={[styles.navItem, styles.leftNavItem]} onPress={() => navigation.navigate('Organizer')}>
          <MaterialCommunityIcons name="folder" size={24} color="white" />
          <Text style={styles.navText}>Organizer</Text>
        </Pressable>

        <Pressable style={[styles.navItem, styles.rightNavItem]} onPress={() => navigation.navigate('Focus')}>
          <FontAwesome name="globe" size={24} color="white" />
          <Text style={styles.navText}>Focus</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <MaterialCommunityIcons name="account" size={24} color="white" />
          <Text style={styles.navText}>Profile</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:20,
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  contentWithDellBackground: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 10,
    margin: 1,
    padding: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // To allow absolute positioning of the lock icon
  },
  lockIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -100 }],
    zIndex: 0, // Ensures it is behind the text
  },
  topTextContainer: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    marginBottom: 20,
    zIndex: 1, // Ensures it is above the lock icon
  },
  topText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensures it is above the lock icon
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
  fab: {
    backgroundColor: '#7f7fff',
    borderRadius: 35,
    padding: 20,
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{ translateX: -35 }],
    elevation: 5,
    zIndex: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#1c1c1c',
    height: 80,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  leftNavItem: {
    marginRight: 40,
  },
  rightNavItem: {
    marginLeft: 40,
  },
  navText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});
