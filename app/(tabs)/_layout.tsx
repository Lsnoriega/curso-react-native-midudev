import { Tabs } from 'expo-router';
import { CircleInfoIcon, HomeIcon } from '../components/Icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: '#66BB6A',
        tabBarStyle: { backgroundColor: '#0f172b' }
         }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />
,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => <CircleInfoIcon color={color} />
        }}
      />
    </Tabs>
  );
}
// #66BB6A