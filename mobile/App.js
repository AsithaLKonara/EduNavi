import "./global.css";
import { StatusBar } from "expo-status-bar";
import { Text, View, SafeAreaView } from "react-native";
import { Compass, GraduationCap, BookOpen } from "lucide-react-native";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 items-center justify-center p-6">
        <View className="mb-8 items-center">
          <View className="bg-secondary p-4 rounded-full mb-4 shadow-lg">
            <GraduationCap size={64} color="#A3D900" />
          </View>
          <Text className="text-4xl font-bold text-white">EduNavi</Text>
          <Text className="text-secondary-light text-center mt-2 italic">
            Your Direction. Your Education. Your Future.
          </Text>
        </View>

        <View className="w-full space-y-4">
          <View className="bg-primary-light p-4 rounded-2xl flex-row items-center border border-white/10">
            <Compass color="#00A3A3" size={24} />
            <View className="ml-4">
              <Text className="text-white font-semibold text-lg">Smart Matching</Text>
              <Text className="text-white/60 text-sm">AI-driven course recommendations</Text>
            </View>
          </View>

          <View className="bg-primary-light p-4 rounded-2xl flex-row items-center border border-white/10 mt-4">
            <BookOpen color="#A3D900" size={24} />
            <View className="ml-4">
              <Text className="text-white font-semibold text-lg">Local Intelligence</Text>
              <Text className="text-white/60 text-sm">Gov, Private & Global courses</Text>
            </View>
          </View>
        </View>

        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}
