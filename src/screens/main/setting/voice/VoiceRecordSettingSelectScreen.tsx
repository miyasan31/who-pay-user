import { MaterialIcons } from "@expo/vector-icons";
import type { VFC } from "react";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "src/components";
import { Text } from "src/components/custom";
import { Layout } from "src/components/layout";
import { useThemeColor } from "src/hooks";
import type { VoiceRecordScreenProps } from "types";

type List = {
  id: string;
  label: string;
  screen: "VoiceRecord" | "VoiceRecordUpdate";
};

const data: Readonly<List[]> = [
  { id: "1", screen: "VoiceRecord", label: "登録する" },
  { id: "2", screen: "VoiceRecordUpdate", label: "更新する" },
];

export const VoiceRecordSettingSelectScreen: VFC<
  VoiceRecordScreenProps<"VoiceRecordSettingSelect">
> = (props) => {
  const icon1 = useThemeColor({}, "icon1");

  const onNavigation = (screen: List["screen"]) => {
    props.navigation.navigate(screen);
  };

  return (
    <Layout style={styles.full}>
      {data.map((item) => {
        return (
          <ListItem key={item.id} style={styles.list} onPress={() => onNavigation(item.screen)}>
            <View style={styles.listbox}>
              <Text style={styles.key}>{item.label}</Text>
              <MaterialIcons name="keyboard-arrow-right" size={24} color={icon1} />
            </View>
          </ListItem>
        );
      })}
    </Layout>
  );
};

const styles = StyleSheet.create({
  full: {
    flex: 1,
    justifyContent: "flex-start",
  },
  list: {
    width: "100%",
  },
  listbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#b3b3b333",
  },
  key: {
    width: "90%",
    fontSize: 18,
    textAlign: "left",
    fontWeight: "400",
  },
});
