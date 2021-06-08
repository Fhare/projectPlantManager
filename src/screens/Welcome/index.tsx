import React, { useState } from "react";
import { styles } from "./styles";
import { 
  SafeAreaView, 
  Text, 
  View,
  Image, 
  TouchableOpacity
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const waterningImg = require("../../assets/watering.png");

export default function Welcome() {

  const navigation = useNavigation();

  const handleStart = () => {
    navigation.navigate("UserIdentification");
  };

  return (
    <SafeAreaView style={styles.container}> 
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'}
          suas plantas de {'\n'}
          forma fácil
        </Text>


        <Image 
          source={waterningImg}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. {'\n'}
          Nós cuidamos de lembrar você sempre que precisar.
        </Text>

        <TouchableOpacity 
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleStart}
          >
          <Entypo 
            name="chevron-thin-right" 
            style={styles.icon}  
          />  
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};