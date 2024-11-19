import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000); // 3 seconds
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <MaterialCommunityIcons name="check-circle-outline" size={100} color="#7f7fff" />
        <Text style={styles.title}>Todo</Text>
        <Text style={styles.subtitle}>not like you think</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    color: '#fff',
    marginTop: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
});