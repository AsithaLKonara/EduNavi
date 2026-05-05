import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from 'react-native';
import { supabase } from '../lib/supabase';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';

const { width, height } = Dimensions.get('window');

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
      className="flex-1"
    >
      <LinearGradient
        colors={['#000814', '#001A33', '#000D1A']}
        style={{ flex: 1 }}
      >
        {/* Ambient Background Glows */}
        <View 
          style={{ 
            position: 'absolute', top: -height * 0.1, left: -width * 0.2, 
            width: width * 0.8, height: width * 0.8, 
            borderRadius: width * 0.4, backgroundColor: '#00A3A3', 
            opacity: 0.15, transform: [{ scale: 1.5 }] 
          }} 
        />
        <View 
          style={{ 
            position: 'absolute', bottom: -height * 0.1, right: -width * 0.2, 
            width: width * 0.8, height: width * 0.8, 
            borderRadius: width * 0.4, backgroundColor: '#A3D900', 
            opacity: 0.1, transform: [{ scale: 1.5 }] 
          }} 
        />

        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="p-6">
          <MotiView 
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', delay: 100 }}
            className="mb-12 items-center"
          >
            <View className="w-20 h-20 rounded-full items-center justify-center mb-6 overflow-hidden">
              <BlurView intensity={30} tint="light" className="absolute inset-0 bg-secondary/20" />
              <View className="border border-secondary/30 w-full h-full rounded-full absolute" />
              <LogIn size={36} color="#00A3A3" />
            </View>
            <Text className="text-5xl font-bold text-white tracking-tighter">EduNavi</Text>
            <Text className="text-white/60 mt-3 text-base text-center font-medium max-w-[280px]">
              Navigate your professional & educational future
            </Text>
          </MotiView>

          <View className="space-y-5">
            {/* Email Input */}
            <MotiView 
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'spring', delay: 200 }}
              className="mb-4"
            >
              <Text className="text-white/60 text-sm font-semibold mb-2 ml-1">Email Address</Text>
              <View className="rounded-2xl overflow-hidden h-14">
                <BlurView intensity={20} tint="light" className="absolute inset-0 bg-white/5" />
                <View 
                  className={`flex-1 border rounded-2xl px-4 flex-row items-center transition-colors duration-200 ${
                    emailFocused ? 'border-secondary bg-secondary/10' : 'border-white/10'
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
            </MotiView>

            {/* Password Input */}
            <MotiView 
              from={{ opacity: 0, translateX: 20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'spring', delay: 300 }}
              className="mb-8"
            >
              <Text className="text-white/60 text-sm font-semibold mb-2 ml-1">Password</Text>
              <View className="rounded-2xl overflow-hidden h-14">
                <BlurView intensity={20} tint="light" className="absolute inset-0 bg-white/5" />
                <View 
                  className={`flex-1 border rounded-2xl px-4 flex-row items-center transition-colors duration-200 ${
                    passwordFocused ? 'border-secondary bg-secondary/10' : 'border-white/10'
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
            </MotiView>

            {/* Sign In Button */}
            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', delay: 400 }}
              className="mb-4"
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={signInWithEmail}
                disabled={loading}
                className="overflow-hidden rounded-2xl"
              >
                <LinearGradient
                  colors={['#00CCCC', '#00A3A3']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="h-14 flex-row items-center justify-center shadow-xl shadow-secondary/20"
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <>
                      <LogIn size={18} color="#FFFFFF" />
                      <Text className="text-white font-bold ml-2 text-base">Sign In</Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </MotiView>

            {/* Create Account Button */}
            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', delay: 500 }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={signUpWithEmail}
                disabled={loading}
                className="overflow-hidden rounded-2xl h-14"
              >
                <BlurView intensity={10} tint="light" className="absolute inset-0 bg-white/5" />
                <View className="flex-1 border border-white/10 flex-row items-center justify-center rounded-2xl">
                  <UserPlus size={18} color="#00A3A3" />
                  <Text className="text-secondary font-bold ml-2 text-base">Create Account</Text>
                </View>
              </TouchableOpacity>
            </MotiView>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
