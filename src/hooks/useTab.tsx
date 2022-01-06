import React, { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { CustomText as Text } from "src/components/custom/CustomText";
import { CustomView as View } from "src/components/custom/CustomView";

export const useTab = () => {
  const [select, setSelect] = useState<"phone" | "email">("phone");

  const onTabPress = useCallback((select: "phone" | "email") => {
    setSelect(select);
  }, []);

  const Tab = () => {
    return (
      <View style={styles.tabWrap}>
        <TouchableOpacity
          style={[styles.tab, select === "phone" ? styles.activeTab : null]}
          activeOpacity={0.4}
          onPress={() => onTabPress("phone")}
        >
          <Text style={styles.tabLabel} lightTextColor={select === "phone" ? "" : "#88888888"}>
            電話番号
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, select === "email" ? styles.activeTab : null]}
          activeOpacity={0.4}
          onPress={() => onTabPress("email")}
        >
          <Text style={styles.tabLabel} lightTextColor={select === "email" ? "" : "#88888888"}>
            メールアドレス
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return { select, Tab };
};

const styles = StyleSheet.create({
  tabWrap: {
    flexDirection: "row",
    borderRadius: 20,
  },
  tab: {
    flex: 1,
    paddingTop: 25,
    paddingBottom: 20,
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: "#88888888",
  },
  tabLabel: {
    fontSize: 16,
  },
});
