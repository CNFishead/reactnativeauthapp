import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useCallback, useContext, useEffect, useState } from "react";
import IconButton from "./components/ui/IconButton";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();

// keeep the splash screen visible while we fetch the token from storage
SplashScreen.preventAutoHideAsync();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => {
            const authCtx = useContext(AuthContext);
            return <IconButton title="Logout" onPress={authCtx.logout} icon={"exit"} color={tintColor} size={24} />;
          },
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {authCtx.isLoggedIn && <AuthenticatedStack />}
      {!authCtx.isLoggedIn && <AuthStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [loading, setLoading] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const tryLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        authCtx.login(token);
      }
      setLoading(false);
      await SplashScreen.hideAsync();
    };

    tryLogin();
  }, [authCtx]);
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
