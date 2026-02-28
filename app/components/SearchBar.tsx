import { Todo } from "@/data/todos";
import { Dispatch, SetStateAction, useState } from "react";
import {
  ColorSchemeName,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { ThemeType } from "@/constants/Colors";

type SearchBarProps = {
  setListData: Dispatch<SetStateAction<Todo[]>>;
  setColorScheme: Dispatch<SetStateAction<ColorSchemeName>>;
  colorScheme: ColorSchemeName;
  theme: ThemeType;
};
const SearchBar = ({
  setListData,
  setColorScheme,
  theme,
  colorScheme,
}: SearchBarProps) => {
  const [todoVal, setTodoVal] = useState("");
  const handleAdd = () => {
    setListData((prev) => [
      { id: prev.length + 1, title: todoVal, completed: false },
      ...prev,
    ]);
    setTodoVal("");
  };
  const styles = createStyle(theme);
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
      <Pressable
        onPress={() =>
          setColorScheme((prev) => (prev === "dark" ? "light" : "dark"))
        }
        style={{ marginLeft: 10 }}
      >
        <Octicons
          name={colorScheme === "dark" ? "moon" : "sun"}
          size={22}
          color={theme.text}
          selectable={undefined}
        />
      </Pressable>
    </View>
  );
};
export default SearchBar;

function createStyle(theme: ThemeType) {
  return StyleSheet.create({
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
      borderColor: "grey",
      borderRadius: 10,
      borderWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginRight: 5,
      color: "grey",
      fontSize: 15,
    },
    search_bar_container: {
      marginBottom: 15,
      flexDirection: "row",
    },
  });
}
