import type { VFC } from "react";
import React, { useCallback } from "react";
import { ColorButton, Text } from "src/components/custom";
import { AuthLayout } from "src/components/layout";
import { buttonStyles, textStyles } from "src/styles";
import type { AuthScreenProps } from "types";

export const SigninActionScreen: VFC<AuthScreenProps<"SigninAction">> = (props) => {
  const onNavigateSignin = useCallback(() => {
    props.navigation.navigate("Signin");
  }, [props]);

  const onNavigateSignup = useCallback(() => {
    props.navigation.navigate("Signup");
  }, [props]);

  return (
    <AuthLayout>
      <Text style={textStyles.title}>WhoPAYへようこそ</Text>
      <Text style={textStyles.subtitle}>今までにない決済体験をご提案します</Text>

      <ColorButton
        title="サインイン"
        outlineStyle={buttonStyles.outline}
        onPress={onNavigateSignin}
      />
      <ColorButton
        title="サインアップ"
        outlineStyle={buttonStyles.outline}
        onPress={onNavigateSignup}
      />
    </AuthLayout>
  );
};
