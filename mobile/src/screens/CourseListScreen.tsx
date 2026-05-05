import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getCourses } from '../services/api';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { Search, Filter, BookOpen, LogOut, ChevronRight, Award, DollarSign, Calendar } from 'lucide-react-native';

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

  // Render a single premium skeleton card
  const renderSkeletonCard = () => (
    <View className="bg-primary-light/50 border border-white/5 p-5 rounded-3xl mb-4 h-40 justify-between">
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
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-primary">
      {/* Header */}
      <View className="px-6 py-4 flex-row justify-between items-center border-b border-white/5">
        <View>
          <Text className="text-white/60 text-xs font-semibold uppercase tracking-wider font-semibold">EduNavi Discovery</Text>
          <Text className="text-white text-2xl font-bold tracking-tight">Find Your Path</Text>
        </View>
        <TouchableOpacity 
          onPress={handleSignOut}
          className="w-10 h-10 bg-primary-light border border-white/10 rounded-full items-center justify-center active:bg-white/10"
        >
          <LogOut size={16} color="#ef4444" />
        </TouchableOpacity>
      </View>

      {/* Search and Category filters */}
      <View className="px-6 pt-5 pb-2">
        <View className="flex-row items-center bg-primary-light border border-white/10 rounded-2xl px-4 h-14 mb-4">
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

        {/* Horizontal Category Scroll */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="py-1"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                className={`px-4 py-2.5 rounded-full mr-2.5 border transition-all duration-200 ${
                  isSelected 
                    ? 'bg-secondary border-secondary shadow-lg shadow-secondary/20' 
                    : 'bg-primary-light/40 border-white/10'
                }`}
              >
                <Text 
                  className={`text-sm font-semibold ${
                    isSelected ? 'text-white' : 'text-white/70'
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Main Course Feed */}
      {isLoading || isFetching ? (
        <ScrollView className="px-6 py-4">
          {renderSkeletonCard()}
          {renderSkeletonCard()}
          {renderSkeletonCard()}
        </ScrollView>
      ) : (
        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 10, paddingBottom: 100 }}
          onRefresh={refetch}
          refreshing={isFetching}
          renderItem={({ item }) => (
            <TouchableOpacity 
              activeOpacity={0.8}
              className="bg-primary-light/40 border border-white/5 p-5 rounded-3xl mb-4 shadow-sm"
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <View className="flex-row items-center mb-3">
                    <View className="bg-secondary/15 px-2.5 py-1 rounded-lg border border-secondary/20">
                      <Text className="text-secondary text-xs font-bold uppercase tracking-wider">{item.type || 'Course'}</Text>
                    </View>
                    {item.verified && (
                      <View className="bg-accent/15 px-2.5 py-1 rounded-lg border border-accent/20 ml-2 flex-row items-center">
                        <Award size={10} color="#A3D900" />
                        <Text className="text-accent text-xs font-bold ml-1">VERIFIED</Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-white font-bold text-lg leading-6 mb-1.5">{item.title}</Text>
                  <Text className="text-white/50 text-sm font-medium">{item.provider}</Text>
                </View>
                <View className="w-8 h-8 rounded-full bg-white/5 items-center justify-center">
                  <ChevronRight size={16} color="#64748b" />
                </View>
              </View>
              
              <View className="flex-row items-center justify-between mt-5 border-t border-white/5 pt-4">
                <View className="flex-row items-center">
                  <BookOpen size={14} color="#64748b" />
                  <Text className="text-white/60 text-xs font-medium ml-1.5">{item.category || 'General Education'}</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-accent font-bold text-sm tracking-tight">
                    {item.price ? `${item.currency || 'LKR'} ${item.price.toLocaleString()}` : 'Free'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View className="items-center justify-center mt-12 py-10 px-6 border border-dashed border-white/10 rounded-3xl">
              <BookOpen size={48} color="#64748b" />
              <Text className="text-white font-bold text-lg mt-4 text-center">No Courses Found</Text>
              <Text className="text-white/40 text-sm mt-2 text-center max-w-[240px]">
                We couldn't find any courses matching your filters. Try search keywords or choosing "All" categories.
              </Text>
              {(search.length > 0 || selectedCategory !== 'All') && (
                <TouchableOpacity 
                  onPress={() => { setSearch(''); setSelectedCategory('All'); }}
                  className="mt-6 bg-primary-light border border-white/10 px-6 py-2.5 rounded-full"
                >
                  <Text className="text-white font-semibold text-sm">Reset Filters</Text>
                </TouchableOpacity>
              )}
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
