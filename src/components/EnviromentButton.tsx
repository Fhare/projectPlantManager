import React from "react";
import { Text, StyleSheet } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnviromentButtonProps extends RectButtonProps {
  title: String,
  active?: Boolean, // ? diz que o campo não é obrigatório (Syntax Typescript).
}

export default function EnviromentButton({ 
  title, 
  active = false, // Se o active não for passado ele assumirá false
  ...rest
}: EnviromentButtonProps) {
  return (
      <RectButton 
        style={[
          styles.EnviromentButton,
          active && styles.EnviromentButtonActive
        ]}
        { ...rest }
      >

      <Text style={[
        styles.title,
        active && styles.titleActive
      ]}>
        { title }
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  EnviromentButton: {
    backgroundColor: colors.shape,
    height: 40,
    width: 76,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginHorizontal: 6,
  },

  EnviromentButtonActive: {
    backgroundColor: colors.green_light,
  },

  title: {
    color: colors.heading,
    fontFamily: fonts.text,
  },

  titleActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark, 
  }
});