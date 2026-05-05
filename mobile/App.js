import "./global.css";
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { supabase } from './src/lib/supabase';
import { useAuthStore } from './src/store/authStore';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  const { session, setSession, setUser, user } = useAuthStore();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <ActivityIndicator size="large" color="#00A3A3" />
      </View>
    );
  }

  return (
    <>
      {session ? <HomeScreen /> : <AuthScreen />}
      <StatusBar style="light" />
    </>
  );
}
