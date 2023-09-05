import { useNavigation } from "@react-navigation/native";
import React from "react";
import data from "../../assets/parques.json";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

const List = () => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigate("Detalhes", { data: item })}
            style={styles.item}
          >
            <View style={styles.contact}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.text}>{item.name}</Text>
              <Text style={{ fontSize: 12 }}>{item.city}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  item: {
    backgroundColor: "#E1E1E1",
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    height: 40,
    textAlign: "center",
  },
  contact: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 5,
  },
});

export default List;
