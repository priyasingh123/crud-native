import { data } from "@/data/todos";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
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
  const [listData, setListData] = useState(data);
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;
  const separatorComp = <View style={styles.separator} />;

  const handleDelete = (id: number) => {
    const list = [...listData];
    const updatedList = list.filter((item) => item.id !== id);
    setListData(updatedList);
  };
  return (
    <Container style={styles.container}>
      <SearchBar setListData={setListData} />
      <FlatList
        contentContainerStyle={styles.todo_list}
        data={listData}
        ItemSeparatorComponent={() => separatorComp}
        renderItem={({ item }) => {
          return (
            <View style={styles.list_element}>
              <Text
                style={[styles.list_text, item.completed && styles.text_cut]}
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
