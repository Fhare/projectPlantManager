import React from "react";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface ButtonProps extends TouchableOpacityProps {
  title: String;
}

export default function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.button}
      { ...rest }
    >
      <Text style={styles.text}>
        { title }
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.heading,
  },
});