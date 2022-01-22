import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import type { VFC } from "react";
import React from "react";
import type { ColorSchemeName } from "react-native";
import { AuthProvider } from "src/navigations/AuthProvider";
import { LinkingConfiguration } from "src/navigations/LinkingConfiguration";
import { Navigator } from "src/navigations/Navigator";

export const Navigations: VFC<{ colorScheme: ColorSchemeName }> = (props) => {
  const themeResult = props?.colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={themeResult}>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </NavigationContainer>
  );
};
