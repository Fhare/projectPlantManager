import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";

import Header from "../../components/Header";
import EnviromentButton from "../../components/EnviromentButton";
import PlantCardPrimary from "../../components/PlantCardPrimary";
import Load from "../../components/Load";

import { useNavigation } from "@react-navigation/core";

import api from "../../services/api";

import { styles } from "./styles";
import colors from "../../styles/colors";
import { PlantProps } from "../../libs/storage";

interface EnvironmentProps {
  key: string,
  title: string,
}

export default function PlantSelection() {

  const [ environments, setEnvironments ] = useState<EnvironmentProps[]>([]);
  const [ plants, setPlants ] = useState<PlantProps[]>([]);
  const [ filteredPlants, setFilteredPlants ] = useState<PlantProps[]>([]);
  const [ environmentSelected, setEnvironmentSelected ] = useState("all");
  const [ loading, setLoading ] = useState(true);

  const [ page, setPage ] = useState(1);
  const [ loadingMore, setLoadingMore ] = useState(true);

  const navigation = useNavigation();

  const handlePlant = (plant: PlantProps) => {
    navigation.navigate("PlantSave", { plant });
  };

  const handleEnvironmentSelected = (environment: string) => {
    setEnvironmentSelected(environment);

    if(environment == "all") 
      return setFilteredPlants(plants);
    
    const filtered = plants.filter(plant => 
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  };

  async function fetchPlants() {
    const { data } = await api
    .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

    if(!data) {
      return setLoading(true);
    }

    if(page > 1) {
      setPlants(oldValue => [ ...oldValue, ...data ]);
      setFilteredPlants(oldValue => [ ...oldValue, ...data ]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  const handleFetchMore = (distance: number) => {
    if(distance < 1) 
      return;
    
    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  };

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get("plants_environments?_sort=title&_order=asc");
      setEnvironments([
        { 
          key: "all", 
          title: "Todos" 
        }, 
        ...data
      ]);
    }

    fetchEnvironment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  if(loading) {
    return <Load />
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>
          Em qual ambiente
        </Text>

        <Text style={styles.subtitle}>
          Você quer colocar sua planta?
        </Text>
      </View> 

      <View>
          <FlatList 
            data={environments}
            keyExtractor={item => String(item.key)}
            renderItem={({ item }) => (
              <EnviromentButton 
                title={item.title}
                active={item.key === environmentSelected}
                onPress={() => handleEnvironmentSelected(item.key)}
              />
            )}

            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.environmentList}
          />
        </View>

        <View style={styles.plants}>
          <FlatList 
            data={filteredPlants}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardPrimary 
                data={item}
                onPress={() => handlePlant(item)}
              />
            )}

            showsVerticalScrollIndicator={false}
            numColumns={2}
            onEndReachedThreshold={0.1}
            onEndReached={({ distanceFromEnd }) => {
              handleFetchMore(distanceFromEnd);
            }}
            ListFooterComponent={
              loadingMore
              ?
              <ActivityIndicator color={colors.green} />
              :
              <></>
            }
          />
        </View>
    </View>
  );
}