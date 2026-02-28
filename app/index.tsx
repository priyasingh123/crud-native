import { data } from "@/data/todos";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useState, useContext } from "react";
import { ThemeContext, ThemeContextType } from "@/context/ThemeContext";
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "./components/SearchBar";

export default function Index() {
  const [listData, setListData] = useState(data.sort((a, b) => b.id - a.id));
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;
  const separatorComp = <View style={styles.separator} />;
  const [loaded, error] = useFonts({ Inter_500Medium });
  const context = useContext<ThemeContextType | undefined>(ThemeContext);

  if (!context) {
    throw new Error("ThemeContext must be used within ThemeProvider");
  }

  const { colorScheme, theme, setColorScheme } = context;
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

  if (!loaded && !error) return null;
  return (
    <Container style={styles.container}>
      <SearchBar
        setListData={setListData}
        setColorScheme={setColorScheme}
        theme={theme}
        colorScheme={colorScheme}
      />
      <FlatList
        keyExtractor={(list) => list.id.toString()}
        contentContainerStyle={styles.todo_list}
        data={listData}
        ItemSeparatorComponent={() => separatorComp}
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
      ></FlatList>
    </Container>
  );
}

const styles = StyleSheet.create({
  todo_list: {
    backgroundColor: "#000",
    borderRadius: 12,
  },
  list_element: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  list_text: {
    color: "white",
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
    backgroundColor: "#121010",
  },
});
