import './global.css';
import { View, Text, SafeAreaView } from 'react-native';
import { useAuthStore } from './src/store/authStore';
import AuthScreen from './src/screens/AuthScreen';
import CourseListScreen from './src/screens/CourseListScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  const { session, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="text-secondary text-lg">Loading EduNavi...</Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <View className="flex-1 bg-primary">
        {!session ? <AuthScreen /> : <CourseListScreen />}
      </View>
    </QueryClientProvider>
  );
}
