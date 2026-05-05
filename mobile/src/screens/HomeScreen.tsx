import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { LogOut, Compass, GraduationCap, BookOpen, Award } from 'lucide-react-native';

export default function HomeScreen() {
  const { user, signOut } = useAuthStore();

  async function handleSignOut() {
    await supabase.auth.signOut();
    signOut();
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-row justify-between items-center px-6 py-4">
        <View>
          <Text className="text-secondary font-bold text-xl">EduNavi</Text>
        </View>
        <TouchableOpacity onPress={handleSignOut} className="p-2 bg-primary-light rounded-full border border-white/5">
          <LogOut size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6">
        <View className="bg-secondary/10 p-6 rounded-3xl border border-secondary/20 mb-8">
          <Text className="text-white text-lg">Welcome back,</Text>
          <Text className="text-white text-2xl font-bold mt-1">{user?.email}</Text>
          <View className="bg-accent h-1 w-12 rounded-full mt-4" />
        </View>

        <Text className="text-white text-xl font-bold mb-4">Start Your Journey</Text>
        
        <View className="space-y-4">
          <Card 
            icon={<Compass color="#00A3A3" size={24} />} 
            title="Discovery" 
            desc="Find courses that match your profile" 
          />
          <Card 
            icon={<GraduationCap color="#A3D900" size={24} />} 
            title="Career Paths" 
            desc="Explore AI-generated roadmaps" 
            marginTop={16}
          />
          <Card 
            icon={<Award color="#00A3A3" size={24} />} 
            title="Saved" 
            desc="Keep track of your favorites" 
            marginTop={16}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Card({ icon, title, desc, marginTop = 0 }) {
  return (
    <TouchableOpacity 
      style={{ marginTop }}
      className="bg-primary-light p-5 rounded-2xl flex-row items-center border border-white/5 shadow-sm"
    >
      <View className="bg-primary p-3 rounded-xl">
        {icon}
      </View>
      <View className="ml-4 flex-1">
        <Text className="text-white font-bold text-lg">{title}</Text>
        <Text className="text-white/50 text-sm">{desc}</Text>
      </View>
    </TouchableOpacity>
  );
}
