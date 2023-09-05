import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import routes from "./routes";

const { Screen, Navigator } = createNativeStackNavigator();

const options = {
  animation: "none",
  headerShadowVisible: false,
};

const Router = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={options}>
        {routes.map(({ component, name }) => (
          <Screen component={component} name={name} key={name} />
        ))}
      </Navigator>
    </NavigationContainer>
  );
};

export default Router;
