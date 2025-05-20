import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Medicine } from '../types/medicine';

export default function AddMedicineScreen() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [perDay, setPerDay] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name || !quantity || !perDay) {
      Alert.alert('Please fill all fields');
      return;
    }

    const newMedicine: Medicine = {
      id: Date.now().toString(),
      name,
      quantity: parseInt(quantity),
      perDay: parseInt(perDay),
    };

    const stored = await AsyncStorage.getItem('medicines');
    const medicines: Medicine[] = stored ? JSON.parse(stored) : [];
    medicines.push(newMedicine);
    await AsyncStorage.setItem('medicines', JSON.stringify(medicines));

    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Medicine Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Total Quantity" style={styles.input} value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
      <TextInput placeholder="Required Per Day" style={styles.input} value={perDay} onChangeText={setPerDay} keyboardType="numeric" />
      <Button title="Save Medicine" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, fontSize: 16 }
});
