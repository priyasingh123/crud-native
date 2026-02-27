import { Todo } from "@/data/todos";
import { Dispatch, SetStateAction, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type SearchBarProps = {
  setListData: Dispatch<SetStateAction<Todo[]>>;
};
const SearchBar = ({ setListData }: SearchBarProps) => {
  const [todoVal, setTodoVal] = useState("");
  const handleAdd = () => {
    setListData((prev) => [
      ...prev,
      { id: prev.length + 1, title: todoVal, completed: false },
    ]);
    setTodoVal("");
  };
  return (
    <View style={styles.search_bar_container}>
      <TextInput
        style={styles.search_input}
        value={todoVal}
        placeholder="Add a new Todo"
        onChangeText={setTodoVal}
      />
      <Pressable style={styles.submit_btn} onPress={handleAdd}>
        <Text>Add</Text>
      </Pressable>
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  submit_btn: {
    borderColor: "black",
    borderWidth: 1,
    color: "black",
    backgroundColor: "white",
    marginLeft: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  search_input: {
    flex: 1,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
  },
  search_bar_container: {
    marginTop: 10,
    flexDirection: "row",
    marginHorizontal: 25,
    width: "70%",
    alignSelf: "center",
  },
});
