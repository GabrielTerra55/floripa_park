import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  BackHandler,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadFavorite } from "../redux/reducers/favorites";

const Home = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const loadLocalData = async () => {
    try {
      const valor = await AsyncStorage.getItem("favorites");
      if (valor) {
        dispatch(loadFavorite(valor));
      }
    } catch (error) {
      console.error("Erro ao carregar dados do AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadLocalData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require("../../assets/park.png")} />
        <Text style={styles.title}>Parques Florianópolis</Text>
      </View>

      <View style={styles.content}>
        <Pressable style={styles.button} onPress={() => navigate("Lista")}>
          <Text style={styles.text}>Ver Parques</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigate("Favoritos")}>
          <Text style={styles.text}>Meus Favoritos</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => BackHandler.exitApp()}>
          <Text style={styles.text}>Sair</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
    gap: 30,
    flex: 1,
  },
  header: {
    alignItems: "center",
  },
  content: {
    gap: 20,
  },
  logo: {
    height: 200,
    width: 290,
  },
  title: {
    padding: 30,
    fontSize: 24,
    fontWeight: "700",
  },
  button: {
    backgroundColor: "green",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
});

export default Home;
