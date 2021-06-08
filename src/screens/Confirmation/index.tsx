import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { SafeAreaView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/core";

interface Params {
  title: string,
  subtitle: string,
  buttonTitle: string,
  icon: "smile" | "hug",
  nextScreen: string,
}

const emojis = { 
  smile: "🤗",
  hug: "😄"
}

export default function Confirmation() {

  const [ userName, setUserName ] = useState<string>("");

  const navigation = useNavigation();
  const routes = useRoute();

  const { title, subtitle, buttonTitle, icon, nextScreen } = routes.params as Params;

  const handleSelect = () => {
    navigation.navigate(nextScreen );
  };

  async function getUserName() {
    const user = await AsyncStorage.getItem("@plantmanager:user");
    setUserName(user || "");
  }

  useEffect(() => {
    getUserName();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          { emojis[icon] }
        </Text>

        <Text style={styles.title}>
          { title }, {"\n"}
          { userName }!
        </Text>

        <Text style={styles.subtitle}>
          { subtitle }
        </Text>

        <View style={styles.footer}>
          <Button 
            title={ buttonTitle }
            onPress={ handleSelect }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}