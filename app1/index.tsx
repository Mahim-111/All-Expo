import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text>index</Text>    
      <Link href = "/Contact"> hi </Link>
    
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
