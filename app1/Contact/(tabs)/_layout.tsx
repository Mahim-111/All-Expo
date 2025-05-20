import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Phone',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="phone" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false, 
          title: 'Favourite',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="star" color={color} />,
        }}
      />
    </Tabs>
  );
}
