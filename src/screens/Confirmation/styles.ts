import { StyleSheet } from "react-native";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 30,
  },

  emoji: {
    fontSize: 78,
  },

  title: {
    fontSize: 26,
    fontFamily: fonts.heading,
    textAlign: "center",
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15,
  }, 

  subtitle: {
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 30,
    color: colors.heading,
  },

  footer: {
    width: "80%",
    marginTop: 20,
  },
});