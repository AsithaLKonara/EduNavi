import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../lib/supabase';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react-native';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert('Error', error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert('Error', error.message);
    else if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View className="flex-1 bg-primary justify-center p-6">
      <View className="mb-10 items-center">
        <Text className="text-3xl font-bold text-white">Welcome to EduNavi</Text>
        <Text className="text-secondary-light mt-2 italic text-center">
          Sign in to navigate your future
        </Text>
      </View>

      <View className="space-y-4">
        <View className="bg-primary-light border border-white/10 rounded-xl px-4 flex-row items-center h-14 mb-4">
          <Mail size={20} color="#00A3A3" />
          <TextInput
            className="flex-1 ml-3 text-white"
            placeholder="Email Address"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>

        <View className="bg-primary-light border border-white/10 rounded-xl px-4 flex-row items-center h-14 mb-8">
          <Lock size={20} color="#00A3A3" />
          <TextInput
            className="flex-1 ml-3 text-white"
            placeholder="Password"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          className="bg-secondary h-14 rounded-xl flex-row items-center justify-center mb-4 shadow-lg shadow-secondary/20"
          onPress={signInWithEmail}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <LogIn size={20} color="#FFFFFF" />
              <Text className="text-white font-bold ml-2 text-lg">Sign In</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-primary-light border border-secondary/30 h-14 rounded-xl flex-row items-center justify-center"
          onPress={signUpWithEmail}
          disabled={loading}
        >
          <UserPlus size={20} color="#00A3A3" />
          <Text className="text-secondary font-bold ml-2 text-lg">Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
