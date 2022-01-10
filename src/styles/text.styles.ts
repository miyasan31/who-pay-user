import { StyleSheet } from "react-native";

export const textStyles = StyleSheet.create({
  title: {
    paddingVertical: 15,
    fontSize: 25,
  },
  subtitle: {
    fontSize: 15,
    paddingBottom: 15,
    fontWeight: "normal",
  },
  label: {
    paddingVertical: 10,
    fontSize: 15,
    textAlign: "left",
  },
  error: {
    paddingTop: 5,
    lineHeight: 0,
    fontSize: 12,
    textAlign: "right",
  },
  fetchResult: {
    paddingVertical: 15,
    paddingLeft: 15,
    fontSize: 20,
    fontWeight: "normal",
    textAlign: "left",
  },
});
