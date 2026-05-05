import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getCourses } from '../services/api';
import { supabase } from '../lib/supabase';
import { Search, BookOpen, LogOut, ChevronRight, Award } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';

const { width, height } = Dimensions.get('window');
const CATEGORIES = ['All', 'Government', 'Private', 'Technology', 'Business', 'Healthcare'];

export default function CourseListScreen() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { data: courses, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const filteredCourses = courses?.filter((course: any) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
                          course.provider.toLowerCase().includes(search.toLowerCase());
    
    if (selectedCategory === 'All') return matchesSearch;
    return matchesSearch && (course.type?.toLowerCase() === selectedCategory.toLowerCase() || 
                             course.category?.toLowerCase() === selectedCategory.toLowerCase());
  });

  const renderSkeletonCard = (index: number) => (
    <MotiView 
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', delay: index * 100 }}
      className="mb-4 rounded-3xl overflow-hidden"
    >
      <BlurView intensity={20} tint="light" className="p-5 border border-white/10 h-40 justify-between bg-white/5">
        <View>
          <View className="flex-row justify-between items-center mb-3">
            <View className="bg-white/10 w-20 h-6 rounded-lg" />
            <View className="bg-white/10 w-6 h-6 rounded-full" />
          </View>
          <View className="bg-white/10 w-3/4 h-5 rounded-md mb-2" />
          <View className="bg-white/10 w-1/2 h-4 rounded-md" />
        </View>
        <View className="flex-row justify-between items-center border-t border-white/5 pt-3">
          <View className="bg-white/10 w-24 h-4 rounded-md" />
          <View className="bg-white/10 w-16 h-4 rounded-md" />
        </View>
      </BlurView>
    </MotiView>
  );

  return (
    <View className="flex-1">
      {/* Deep Background Gradient */}
      <LinearGradient
        colors={['#000814', '#001A33', '#000D1A']}
        style={{ position: 'absolute', width, height }}
      />
      
      {/* Ambient Background Glows */}
      <View 
        style={{ 
          position: 'absolute', top: height * 0.2, right: -width * 0.3, 
          width: width * 0.8, height: width * 0.8, 
          borderRadius: width * 0.4, backgroundColor: '#00A3A3', 
          opacity: 0.1, transform: [{ scale: 1.5 }] 
        }} 
      />
      <View 
        style={{ 
          position: 'absolute', bottom: height * 0.1, left: -width * 0.3, 
          width: width * 0.8, height: width * 0.8, 
          borderRadius: width * 0.4, backgroundColor: '#A3D900', 
          opacity: 0.08, transform: [{ scale: 1.5 }] 
        }} 
      />

      {/* Glassmorphic Sticky Header */}
      <View className="pt-12 z-10 overflow-hidden rounded-b-3xl">
        <BlurView intensity={30} tint="dark" className="px-6 py-4 bg-[#001A33]/50">
          <View className="flex-row justify-between items-center mb-4">
            <MotiView from={{ opacity: 0, translateX: -20 }} animate={{ opacity: 1, translateX: 0 }} transition={{ delay: 100 }}>
              <Text className="text-secondary text-xs font-bold uppercase tracking-widest">EduNavi Discovery</Text>
              <Text className="text-white text-3xl font-bold tracking-tight">Find Your Path</Text>
            </MotiView>
            <MotiView from={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 200 }}>
              <TouchableOpacity 
                onPress={handleSignOut}
                className="w-10 h-10 border border-white/10 rounded-full items-center justify-center bg-white/5 active:bg-white/10"
              >
                <LogOut size={16} color="#ef4444" />
              </TouchableOpacity>
            </MotiView>
          </View>

          {/* Search Bar */}
          <MotiView from={{ opacity: 0, translateY: -10 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 300 }}>
            <View className="flex-row items-center border border-white/10 rounded-2xl px-4 h-14 bg-white/5">
              <Search size={18} color="#64748b" />
              <TextInput
                className="flex-1 ml-3 text-white font-medium h-full"
                placeholder="Search courses, institutes, careers..."
                placeholderTextColor="#64748b"
                value={search}
                onChangeText={setSearch}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')}>
                  <Text className="text-white/40 text-sm font-semibold">Clear</Text>
                </TouchableOpacity>
              )}
            </View>
          </MotiView>

          {/* Category Filter Pills */}
          <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 400 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-4 -mb-2">
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <TouchableOpacity
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full mr-3 border transition-all duration-300 ${
                      isSelected 
                        ? 'bg-secondary/20 border-secondary' 
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <Text className={`text-sm font-semibold ${isSelected ? 'text-secondary' : 'text-white/60'}`}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </MotiView>
        </BlurView>
      </View>

      {/* Main Course Feed */}
      {isLoading || isFetching ? (
        <ScrollView className="flex-1 px-6 pt-4">
          {[1, 2, 3].map((_, idx) => renderSkeletonCard(idx))}
        </ScrollView>
      ) : (
        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 100 }}
          onRefresh={refetch}
          refreshing={isFetching}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <MotiView
              from={{ opacity: 0, translateY: 50 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'spring', delay: index * 100, damping: 20 }}
            >
              <TouchableOpacity activeOpacity={0.8} className="mb-5 rounded-3xl overflow-hidden shadow-lg shadow-black/40">
                <BlurView intensity={25} tint="light" className="p-5 border border-white/10 bg-white/5">
                  <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-row items-center flex-wrap flex-1">
                      <View className="bg-secondary/15 px-2.5 py-1 rounded-md border border-secondary/20 mr-2 mb-2">
                        <Text className="text-secondary text-[10px] font-bold uppercase tracking-wider">{item.type || 'Course'}</Text>
                      </View>
                      {item.verified && (
                        <View className="bg-accent/15 px-2.5 py-1 rounded-md border border-accent/20 flex-row items-center mb-2">
                          <Award size={10} color="#A3D900" />
                          <Text className="text-accent text-[10px] font-bold ml-1">VERIFIED</Text>
                        </View>
                      )}
                    </View>
                    <View className="w-8 h-8 rounded-full bg-white/5 border border-white/10 items-center justify-center">
                      <ChevronRight size={14} color="#94a3b8" />
                    </View>
                  </View>
                  
                  <Text className="text-white font-bold text-xl leading-7 mb-1">{item.title}</Text>
                  <Text className="text-white/50 text-sm font-medium mb-4">{item.provider}</Text>
                  
                  <View className="flex-row items-center justify-between border-t border-white/5 pt-4">
                    <View className="flex-row items-center bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                      <BookOpen size={14} color="#00A3A3" />
                      <Text className="text-white/80 text-xs font-semibold ml-2">{item.category || 'General Education'}</Text>
                    </View>
                    <Text className="text-accent font-bold text-base tracking-tight">
                      {item.price ? `${item.currency || 'LKR'} ${item.price.toLocaleString()}` : 'Free'}
                    </Text>
                  </View>
                </BlurView>
              </TouchableOpacity>
            </MotiView>
          )}
          ListEmptyComponent={
            <MotiView from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="items-center justify-center mt-12 py-10 px-6 border border-dashed border-white/10 rounded-3xl bg-white/5">
              <BookOpen size={48} color="#64748b" />
              <Text className="text-white font-bold text-lg mt-4 text-center">No Courses Found</Text>
              <Text className="text-white/40 text-sm mt-2 text-center max-w-[240px] leading-5">
                We couldn't find any courses matching your filters. Try adjusting your search criteria.
              </Text>
              {(search.length > 0 || selectedCategory !== 'All') && (
                <TouchableOpacity 
                  onPress={() => { setSearch(''); setSelectedCategory('All'); }}
                  className="mt-6 border border-secondary/30 bg-secondary/10 px-6 py-2.5 rounded-full"
                >
                  <Text className="text-secondary font-bold text-sm">Reset Filters</Text>
                </TouchableOpacity>
              )}
            </MotiView>
          }
        />
      )}
    </View>
  );
}
