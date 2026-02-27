import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const SearchBar = () => {
  return (
    <View style={styles.search_bar_container}>
      <TextInput style={styles.search_input} placeholder="Add a new Todo" />
      <Pressable style={styles.submit_btn}>
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
    marginHorizontal: 5,
  },
  search_bar_container: {
    flexDirection: "row",
    marginHorizontal: 25,
    width: "70%",
    alignSelf: "center",
  },
});
