import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import type { VFC } from "react";
import React, { useMemo } from "react";
import type { ColorSchemeName } from "react-native";
import { AuthProvider } from "src/navigations/AuthProvider";
import { LinkingConfiguration } from "src/navigations/LinkingConfiguration";
import { Navigator } from "src/navigations/Navigator";

export const Navigations: VFC<{ colorScheme: ColorSchemeName }> = (props) => {
  const themeResult = useMemo(() => {
    return props?.colorScheme === "dark" ? DarkTheme : DefaultTheme;
  }, [props]);

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={themeResult}>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </NavigationContainer>
  );
};
