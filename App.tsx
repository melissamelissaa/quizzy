// App.tsx
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import SetupScreen from "./src/screens/SetupScreen";
import QuizScreen from "./src/screens/QuizScreen";
import ResultsScreen from "./src/screens/ResultsScreen";

export interface QuestionType {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

// export type RootStackParamList = {
//   Setup: undefined;
//   Quiz: { questions: any[]; difficulty: string };
// };

export type RootStackParamList = {
  Setup: undefined;
  Quiz: { questions: QuestionType[]; difficulty: string };
  Results: { score: number; totalQuestions: number };
};

export type StackNavigation = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export interface QuestionType {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Setup" component={SetupScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});

export default App;
