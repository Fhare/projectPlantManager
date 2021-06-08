import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, Alert } from "react-native";
import Header  from '../../components/Header';
import PlantCardSecondary  from '../../components/PlantCardSecondary';

import Load from "../../components/Load";

import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

import  { PlantProps, plantLoad, plantRemove } from "../../libs/storage";
import { styles } from "./styles";

const waterdrop = require('../../assets/waterdrop.png');

export default function MyPlants() {

  const [ myPlants, setMyPlants ] = useState<PlantProps[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ nextWaterd, setNextWaterd ] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não 🙏🏻',
        style: 'cancel',
      },
      {
        text: 'Sim 😢',
        onPress: async () => {
          try {
            await plantRemove(plant.id);

            setMyPlants((oldData) => 
              oldData.filter((item) => item.id != plant.id )
            );

          }catch(err) {
            Alert.alert('Não foi possível remover! 😢');
          }
        }
      }
    ])
  }

  useEffect(() => {
    async function loadStoragedData() {
      const plantsStoraged = await plantLoad();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBR }
      );

      setNextWaterd(`Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}`);

      setMyPlants(plantsStoraged);
      setLoading(false);
    }
    
    loadStoragedData();
  }, []);

  if (loading)
    return <Load />

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image 
          source={waterdrop}
          style={styles.spotlightImage}
        />
        <Text style={styles.spotlightText}>
          { nextWaterd }
        </Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>

        <FlatList 
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary 
              data={item}
              handleRemove={() => { handleRemove(item) }}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  );
}