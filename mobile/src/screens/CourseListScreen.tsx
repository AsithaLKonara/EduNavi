import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getCourses } from '../services/api';
import { Search, Filter, BookOpen, MapPin } from 'lucide-react-native';

export default function CourseListScreen() {
  const [search, setSearch] = useState('');
  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  });

  const filteredCourses = courses?.filter((course: any) => 
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    course.provider.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="px-6 py-4">
        <Text className="text-white text-2xl font-bold mb-4">Discover Courses</Text>
        
        <View className="flex-row items-center bg-primary-light border border-white/10 rounded-xl px-4 h-12">
          <Search size={18} color="#94a3b8" />
          <TextInput
            className="flex-1 ml-3 text-white"
            placeholder="Search courses, institutes..."
            placeholderTextColor="#94a3b8"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color="#00A3A3" />
        </View>
      ) : (
        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TouchableOpacity className="bg-primary-light border border-white/5 p-4 rounded-2xl mb-4">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <View className="bg-secondary/20 self-start px-2 py-1 rounded-md mb-2">
                    <Text className="text-secondary text-xs font-bold uppercase">{item.type}</Text>
                  </View>
                  <Text className="text-white font-bold text-lg leading-6">{item.title}</Text>
                  <Text className="text-white/50 text-sm mt-1">{item.provider}</Text>
                </View>
              </View>
              
              <View className="flex-row items-center mt-4 border-t border-white/5 pt-4">
                <View className="flex-row items-center">
                  <BookOpen size={14} color="#00A3A3" />
                  <Text className="text-white/70 text-xs ml-1">{item.category || 'General'}</Text>
                </View>
                <View className="flex-row items-center ml-4">
                  <Text className="text-secondary-light font-bold text-xs">
                    {item.price ? `${item.currency} ${item.price}` : 'Free'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View className="items-center mt-10">
              <Text className="text-white/30 text-lg">No courses found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
