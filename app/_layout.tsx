import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      // screenOptions={{
      //   headerShown: false,
      // }}
    >
      <Stack.Screen name="index" options={{title: "Meals"}} />
      <Stack.Screen name="[categoryId]/index" options={{title: "Meal Items"}} />
      <Stack.Screen name="[categoryId]/[foodId]" options={{title: "Item Description"}}/>
    </Stack>
  );
}
