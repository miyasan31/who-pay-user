import { Ionicons } from "@expo/vector-icons";
import type { VFC } from "react";
import React from "react";
import { StyleSheet } from "react-native";
import { CircleKeyButton } from "src/components";
import { ColorButton, Text, View } from "src/components/custom";
import { Layout } from "src/components/layout";
import { usePasscodeUpsert, useThemeColor } from "src/hooks";
import { buttonStyles } from "src/styles";
import type { PasscodeScreenProps } from "types";

export const PasscodeScreen: VFC<PasscodeScreenProps<"Passcode">> = (props) => {
  const color = useThemeColor({}, "text2");
  const backGroundColor = useThemeColor({}, "bg1");

  const {
    error,
    passcode,
    secretView,
    onKeyPress,
    onDeletePress,
    onSubmitPress,
  } = usePasscodeUpsert({
    ...props,
    screen: "PasscodeUpdate",
  });

  return (
    <Layout>
      {error.isError ? (
        <Text
          lightTextColor="red"
          darkTextColor="red"
          style={styles.passcodeError}
        >
          {error.message}
        </Text>
      ) : (
        <Text style={styles.passCodeTitle}>
          {passcode.isVerify
            ? "確認のためもう一度入力してください"
            : "パスワードを入力してください"}
        </Text>
      )}

      <View
        lightBgColor={backGroundColor}
        darkBgColor={backGroundColor}
        style={styles.priceArea}
      >
        <Text style={styles.priceText}>{secretView}</Text>
      </View>

      <View style={styles.keyRow}>
        <CircleKeyButton title="1" onPress={onKeyPress} />
        <CircleKeyButton title="2" onPress={onKeyPress} />
        <CircleKeyButton title="3" onPress={onKeyPress} />
      </View>
      <View style={styles.keyRow}>
        <CircleKeyButton title="4" onPress={onKeyPress} />
        <CircleKeyButton title="5" onPress={onKeyPress} />
        <CircleKeyButton title="6" onPress={onKeyPress} />
      </View>
      <View style={styles.keyRow}>
        <CircleKeyButton title="7" onPress={onKeyPress} />
        <CircleKeyButton title="8" onPress={onKeyPress} />
        <CircleKeyButton title="9" onPress={onKeyPress} />
      </View>
      <View style={styles.keyRow}>
        <View style={styles.keyOutline}></View>
        <CircleKeyButton title="0" onPress={onKeyPress} />
        <CircleKeyButton onPress={onDeletePress}>
          <Ionicons name="backspace" size={40} color={color} />
        </CircleKeyButton>
      </View>

      <ColorButton
        title={passcode.isVerify ? "保存" : "確定"}
        outlineStyle={[buttonStyles.outline, buttonStyles.semi]}
        onPress={onSubmitPress}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  passCodeTitle: {
    paddingBottom: 30,
  },
  passcodeError: {
    paddingBottom: 30,
  },

  priceArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: 40,
    marginBottom: 30,
  },
  priceText: {
    flex: 1,
    fontSize: 38,
    paddingLeft: 5,
    textAlign: "center",
    letterSpacing: 10,
  },

  keyRow: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    width: "90%",
  },
  keyOutline: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "33%",
    opacity: 0,
  },
});
