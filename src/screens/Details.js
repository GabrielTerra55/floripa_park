import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Linking,
  ScrollView,
  Pressable,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { addFavorite, removeFavorite } from "../redux/reducers/favorites";
import { useDispatch, useSelector } from "react-redux";
import { isItemInFavorites } from "../redux/selectors";
import empty from "../../assets/empty.png";
import heart from "../../assets/heart.png";

const Details = ({ route }) => {
  const { data } = route.params;

  const {
    name,
    email,
    phone,
    image,
    address,
    cost,
    opening_hours,
    video,
    website,
    id,
  } = data;

  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => isItemInFavorites(state, id));
  const favoriteIcon = isFavorite ? heart : empty;

  const handleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id));
      return;
    }

    dispatch(addFavorite(data));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ gap: 20 }}>
      <Image source={{ uri: image }} style={styles.image} />
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 18 }}>{name}</Text>
        <Pressable onPress={handleFavorites}>
          <Image source={favoriteIcon} style={{ width: 28, height: 28 }} />
        </Pressable>
      </View>
      <View style={styles.section}>
        <Text style={styles.contactDetails}>{address}</Text>
        <Text style={styles.contactDetails}>Valor do Ingresso: R$ {cost}</Text>
        <Text style={styles.contactDetails}>Horário: {opening_hours}</Text>

        <Text style={styles.contactDetails}>E-mail: {email}</Text>
        <Text style={styles.contactDetails}>Telefone: {phone}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Localização</Text>
        <MapView
          provider={PROVIDER_GOOGLE}
          scrollEnabled={false}
          initialRegion={{
            latitude: Number(data.geo.lat),
            longitude: Number(data.geo.lng),
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          style={{ width: "100%", height: 250 }}
        >
          <Marker
            coordinate={{
              latitude: Number(data.geo.lat),
              longitude: Number(data.geo.lng),
            }}
            title={name}
          />
        </MapView>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Mais Informações</Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Pressable onPress={() => Linking.openURL(video)}>
            <Image
              source={require("../../assets/youtube.png")}
              style={{ width: 50, height: 50, objectFit: "cover" }}
            />
          </Pressable>
          <Pressable onPress={() => Linking.openURL(website)}>
            <Image
              source={require("../../assets/world-wide-web.png")}
              style={{ width: 50, height: 50, objectFit: "cover" }}
            />
          </Pressable>
          <Pressable onPress={() => Linking.openURL(website)}>
            <Image
              source={require("../../assets/coupon.png")}
              style={{ width: 50, height: 50, objectFit: "cover" }}
            />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contactDetails: {
    fontSize: 16,
  },
  button: {
    padding: 15,
  },
  section: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    height: 200,
    width: "100%",
    marginTop: 20,
    borderRadius: 5,
  },
});

export default Details;
