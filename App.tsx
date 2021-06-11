import React from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import {NavigationContainer} from "@react-navigation/native";
import {ThemeProvider} from "styled-components";
import theme from "./src/themes/theme";

import {AppRoutes} from "./src/routes/app.routes";
import {AuthProvider, useLogins} from "./src/hooks/logins";

export default function App() {
  const {isLoading} = useLogins();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });
  if (!fontsLoaded || isLoading) return <AppLoading />;

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}