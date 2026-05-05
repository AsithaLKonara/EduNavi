import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { supabase } from '../lib/supabase';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react-native';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  async function signInWithEmail() {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert('Sign In Failed', error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert('Sign Up Failed', error.message);
    } else if (!session) {
      Alert.alert('Verification Sent', 'Please check your inbox to verify your email address!');
    }
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-primary"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="p-6">
        <View className="mb-12 items-center">
          <View className="w-16 h-16 bg-secondary/15 rounded-3xl items-center justify-center mb-6 border border-secondary/30">
            <LogIn size={32} color="#00A3A3" />
          </View>
          <Text className="text-4xl font-bold text-white font-bold tracking-tight">EduNavi</Text>
          <Text className="text-white/60 mt-3 text-base text-center font-medium max-w-[280px]">
            Navigate your professional & educational future
          </Text>
        </View>

        <View className="space-y-5">
          {/* Email Input */}
          <View className="mb-4">
            <Text className="text-white/60 text-sm font-semibold mb-2 ml-1">Email Address</Text>
            <View 
              className={`bg-primary-light border rounded-2xl px-4 flex-row items-center h-14 transition-colors duration-200 ${
                emailFocused ? 'border-secondary' : 'border-white/10'
              }`}
            >
              <Mail size={18} color={emailFocused ? '#00A3A3' : '#64748b'} />
              <TextInput
                className="flex-1 ml-3 text-white font-medium h-full"
                placeholder="you@example.com"
                placeholderTextColor="#64748b"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </View>
          </View>

          {/* Password Input */}
          <View className="mb-8">
            <Text className="text-white/60 text-sm font-semibold mb-2 ml-1">Password</Text>
            <View 
              className={`bg-primary-light border rounded-2xl px-4 flex-row items-center h-14 transition-colors duration-200 ${
                passwordFocused ? 'border-secondary' : 'border-white/10'
              }`}
            >
              <Lock size={18} color={passwordFocused ? '#00A3A3' : '#64748b'} />
              <TextInput
                className="flex-1 ml-3 text-white font-medium h-full"
                placeholder="••••••••"
                placeholderTextColor="#64748b"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                autoCapitalize="none"
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
            </View>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            className="bg-secondary active:bg-secondary-dark h-14 rounded-2xl flex-row items-center justify-center mb-4 shadow-xl shadow-secondary/10"
            onPress={signInWithEmail}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <LogIn size={18} color="#FFFFFF" />
                <Text className="text-white font-bold ml-2 text-base">Sign In</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Create Account Button */}
          <TouchableOpacity
            className="border border-white/10 active:border-secondary/50 h-14 rounded-2xl flex-row items-center justify-center"
            onPress={signUpWithEmail}
            disabled={loading}
          >
            <UserPlus size={18} color="#00A3A3" />
            <Text className="text-secondary font-bold ml-2 text-base">Create Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
