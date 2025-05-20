import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Medicine } from '../types/medicine';

export default function HomeScreen() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadMedicines();
  }, []);

  useEffect(() => {
    saveMedicines();
  }, [medicines]);

  const loadMedicines = async () => {
    const data = await AsyncStorage.getItem('medicines');
    const lastUpdated = await AsyncStorage.getItem('lastUpdated');
    let parsed: Medicine[] = data ? JSON.parse(data) : [];

    const today = new Date().toDateString();
    if (lastUpdated !== today) {
      parsed = parsed.map(m => ({
        ...m,
        quantity: Math.max(0, m.quantity - m.perDay),
      }));
      await AsyncStorage.setItem('lastUpdated', today);
    }

    setMedicines(parsed);
  };

  const saveMedicines = async () => {
    await AsyncStorage.setItem('medicines', JSON.stringify(medicines));
  };

  const handleAddMedicine = async () => {
    router.push('/add-medicine');
  };

  return (
    <View style={styles.container}>
      <Button title="Add Medicine" onPress={handleAddMedicine} />

      <FlatList
        data={medicines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.item, item.quantity <= item.perDay && styles.low]}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>Remaining: {item.quantity}</Text>
            <Text style={styles.text}>Per Day: {item.perDay}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: { padding: 15, backgroundColor: '#e0f7fa', marginVertical: 8, borderRadius: 10 },
  low: { backgroundColor: '#ffccbc' },
  text: { fontSize: 16 }
});
