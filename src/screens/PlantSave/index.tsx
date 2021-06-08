import React, { useState } from "react";
import { View, Alert, Text, Image, ScrollView, Platform, TouchableOpacity } from "react-native";
import { SvgFromUri } from "react-native-svg";
import Button from "../../components/Button";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { isBefore, format } from "date-fns";

import { useRoute, useNavigation } from "@react-navigation/core";

import { styles } from "./styles";
import { PlantProps, plantSave } from "../../libs/storage";

const waterDrop = require("../../assets/waterdrop.png");

interface Params {
  plant: PlantProps;
}

export default function PlantSave() {

  const [ selectedDateTime, setSelectedDateTime ] = useState(new Date());
  const [ showDatePicker, setShowDatePicker ] = useState(Platform.OS == 'ios');

  const route = useRoute();
  const navigation = useNavigation();

  const { plant } = route.params as Params;

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if(Platform.OS == 'android') {
      setShowDatePicker(oldValue => !oldValue);
    }

    if(dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());

      return Alert.alert("Escolha uma hora do futuro! ⏰");
    }

    if(dateTime) 
      setSelectedDateTime(dateTime);
    
  }

  function handleOpenDatetimePickerForAndroid() {
    setShowDatePicker(oldValue => !oldValue);
  }; 

  async function handleSave() {
    try {
      await plantSave({
        ...plant,
        dateTimeNotification: selectedDateTime
      });

      navigation.navigate("Confirmation", {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
        buttonTitle: 'Muito Obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants'
      });

    } catch {
      Alert.alert("Não foi possível salvar 😢");
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri 
            uri={plant.photo}
            width={150}
            height={150}
          />

          <Text style={styles.plantName}>
            { plant.name }
          </Text>
          <Text style={styles.plantAbout}>
          { plant.about }
          </Text>

        </View>

        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image 
              source={waterDrop}
              style={styles.tipImage}
            />

            <Text style={styles.tipText}>
              { plant.water_tips }
            </Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado: 
          </Text>
          
          {showDatePicker && (
              <DateTimePicker
                value={selectedDateTime}  
                mode="time"
                display="spinner"
                onChange={handleChangeTime}
              />
            )} 

          {
            Platform.OS === "android" && (
              <TouchableOpacity
                style={styles.dateTimePickerButton}
                onPress={handleOpenDatetimePickerForAndroid}
              >
                <Text style={styles.dateTimePickerText}>
                  { `Mudar ${format(selectedDateTime, "HH:mm")}` }
                </Text>
              </TouchableOpacity>
            )
          }

          <Button 
            title="Cadastrar planta"
            onPress={handleSave}
          />
        </View>
      </View>
    </ScrollView>
  );
}