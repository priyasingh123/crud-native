import { data } from "@/data/todos";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import SearchBar from "./components/SearchBar";

export default function Index() {
  const separatorComp = <View style={styles.separator} />;
  return (
    <View style={styles.container}>
      <SearchBar />
      <FlatList
        contentContainerStyle={styles.todo_list}
        data={data}
        ItemSeparatorComponent={() => separatorComp}
        renderItem={({ item }) => {
          return (
            <View style={styles.list_element}>
              <Text style={styles.list_text}>{item.title}</Text>
              <Pressable></Pressable>
            </View>
          );
        }}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  todo_list: {
    backgroundColor: "#000",
    color: "white",
    margin: 25,
    width: "70%",
    alignSelf: "center",
  },
  list_element: {
    padding: 15,
  },
  list_text: {
    color: "white",
  },
  separator: {
    borderBottomColor: "white",
    borderWidth: 1,
  },
  container: {
    flex: 1,
  },
});
