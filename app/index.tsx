import { data, Todo } from "@/data/todos";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons";
import { useState, useContext, useEffect } from "react";
import { ThemeContext, ThemeContextType } from "@/context/ThemeContext";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "./components/SearchBar";
import { ThemeType } from "@/constants/Colors";
import Animated, { LinearTransition } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  const context = useContext<ThemeContextType | undefined>(ThemeContext);
  if (!context) {
    throw new Error("ThemeContext must be used within ThemeProvider");
  }
  const { colorScheme, theme, setColorScheme } = context;
  const styles = createStyles(theme);
  const [listData, setListData] = useState<Todo[]>([]);
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;
  const separatorComp = <View style={styles.separator} />;
  const [loaded, error] = useFonts({ Inter_500Medium });

  const handleDelete = (id: number) => {
    const list = [...listData];
    const updatedList = list.filter((item) => item.id !== id);
    setListData(updatedList);
  };

  const toggleListItem = (id: number) => {
    const list = [...listData];
    const updatedList = list.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setListData(updatedList);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("TodoApp");
        const storageTodos = jsonValue !== null ? JSON.parse(jsonValue) : null;
        if (storageTodos && storageTodos.length) {
          setListData(storageTodos.sort((a: Todo, b: Todo) => b.id - a.id));
        } else {
          setListData(data.sort((a, b) => b.id - a.id));
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [data]);

  useEffect(() => {
    const storeData = async () => {
      try {
        await AsyncStorage.setItem("TodoApp", JSON.stringify(listData));
      } catch (e) {
        console.error(e);
      }
    };
    storeData();
  }, [listData]);

  if (!loaded && !error) return null;
  return (
    <Container style={styles.container}>
      <SearchBar
        setListData={setListData}
        setColorScheme={setColorScheme}
        theme={theme}
        colorScheme={colorScheme}
      />
      <Animated.FlatList
        keyExtractor={(list) => list.id.toString()}
        contentContainerStyle={styles.todo_list}
        data={listData}
        ItemSeparatorComponent={() => separatorComp}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode="on-drag" // keyboard will collapse when user drag to see rest of the list
        renderItem={({ item }) => {
          return (
            <View style={styles.list_element}>
              <Text
                style={[styles.list_text, item.completed && styles.text_cut]}
                onPress={() => toggleListItem(item.id)}
              >
                {item.title}
              </Text>
              <Pressable onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" color="red" size={22} />
              </Pressable>
            </View>
          );
        }}
      />
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </Container>
  );
}

function createStyles(theme: ThemeType) {
  return StyleSheet.create({
    todo_list: {
      backgroundColor: theme.background,
      borderRadius: 12,
    },
    list_element: {
      padding: 15,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    list_text: {
      color: theme.text,
      fontSize: 15,
      fontFamily: "Inter_500Medium",
    },
    text_cut: {
      textDecorationLine: "line-through",
      color: "grey",
    },
    separator: {
      borderBottomColor: "white",
      borderWidth: 1,
    },
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 20,
      backgroundColor: theme.background,
    },
  });
}
