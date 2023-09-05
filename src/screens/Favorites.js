import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    async function loadFavorites() {
      try {
        const favoritosJSON = await AsyncStorage.getItem("favorites");
        if (favoritosJSON) {
          const favoritosArray = JSON.parse(favoritosJSON);
          setFavorites(favoritosArray);
        }
      } catch (error) {
        console.error("Erro ao carregar favoritos do AsyncStorage:", error);
      }
    }

    loadFavorites();
  }, [favorites]);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigate("Detalhes", { data: item })}
            style={styles.item}
          >
            <View style={styles.contact}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 120, height: 120, borderRadius: 5 }}
              />
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
});

export default Favorites;
