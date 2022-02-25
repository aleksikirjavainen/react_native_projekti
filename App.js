import * as React from "react";
import Weather from "./components/Weather";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Last_8_hours from "./components/Last_8_hours";
const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Weather" component={Weather} />
        <Stack.Screen name="Last 8 hours" component={Last_8_hours} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
