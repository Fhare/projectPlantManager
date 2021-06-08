import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getStatusBarHeight } from "react-native-iphone-x-helper";

// const profile = require("../assets/profile.png");
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function Header() {

  const [ userName, setUserNamr ] = useState<string>("");

  useEffect(() => {
    async function getUserName() {
      const user = await AsyncStorage.getItem("@plantmanager:user");
      setUserNamr(user || "");
    }

    getUserName();
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{ userName }</Text>
      </View>

      {/* <Image 
        style={styles.image}
        source={profile}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
});