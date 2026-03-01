import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  ColorSchemeName,
} from "react-native";
import { useEffect, useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext, ThemeContextType } from "@/context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { Octicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Todo } from "@/data/todos";
import { ThemeType } from "@/constants/Colors";

export default function EditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [todo, setTodo] = useState<Todo>();
  const router = useRouter();
  const [loaded, error] = useFonts({ Inter_500Medium });
  const context = useContext<ThemeContextType | undefined>(ThemeContext);

  if (!context) {
    throw new Error("Context is undefined or null");
  }
  const { colorScheme, setColorScheme, theme } = context;
  useEffect(() => {
    const fetchTodoDetails = async (id: string) => {
      try {
        const res = await AsyncStorage.getItem("TodoApp");
        const response = res ? JSON.parse(res) : [];
        const result = response.find((res: Todo) => {
          return res.id.toString() === id;
        });
        console.log("result", result);
        setTodo(result);
      } catch (e) {
        console.error(e);
      }
    };
    fetchTodoDetails(id);
  }, [id]);

  const handleSave = async () => {
    const savedTodo = { ...todo, title: todo?.title };
    const jsonValue = await AsyncStorage.getItem("TodoApp");
    if (jsonValue) {
      let updatedData = JSON.parse(jsonValue);
      updatedData = updatedData.map((data: Todo) => {
        if (data.id.toString() === id) {
          return savedTodo;
        }
        return data;
      });
      await AsyncStorage.setItem("TodoApp", JSON.stringify(updatedData));
    }
    router.push("/");
  };

  if (!loaded && !error) return null;

  const styles = createStyle(theme, colorScheme);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Edit todo"
          placeholderTextColor="gray"
          value={todo?.title || ""}
          onChangeText={(text) =>
            setTodo((prev) => (prev ? { ...prev, title: text } : prev))
          }
        />
        <Pressable
          onPress={() =>
            setColorScheme((prev) => (prev === "dark" ? "light" : "dark"))
          }
          style={{ marginLeft: 10, marginTop: 5 }}
        >
          <Octicons
            name={colorScheme === "dark" ? "moon" : "sun"}
            size={22}
            color={theme.text}
            selectable={undefined}
          />
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <Pressable onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/")}
          style={[styles.saveButton, { backgroundColor: "red" }]}
        >
          <Text style={[styles.saveButtonText, { color: "white" }]}>
            Cancel
          </Text>
        </Pressable>
      </View>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );

  function createStyle(theme: ThemeType, colorScheme: ColorSchemeName) {
    return StyleSheet.create({
      container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
        backgroundColor: theme.background,
      },
      inputContainer: {
        marginBottom: 15,
        flexDirection: "row",
        // pointerEvents: "auto", // to get rid of some of the warnings but I didnt get any
      },
      input: {
        flex: 1,
        borderColor: theme.text_version,
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 5,
        color: theme.text_version,
        fontSize: 15,
      },
      saveButton: {
        borderColor: theme.background,
        borderWidth: 1,
        backgroundColor: theme.button,
        marginLeft: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 5,
        borderRadius: 10,
      },
      saveButtonText: {
        fontSize: 15,
        color: colorScheme === "dark" ? "black" : "white",
      },
    });
  }
}
