import React, { useState } from "react";
import { 
  SafeAreaView, 
  View, 
  Text, 
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert
} from "react-native";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../../styles/colors";
import { styles } from "./style";

export default function UserIdentification() {

  // Estados gerenciam se o usuário está ou não no input
  // Para poder mudar a cor de borderBottom.

  const [ isFocused, setIsFocused ] = useState(false);
  const [ isContent, setIsContent ] = useState(false); // Estado do conteúdo dentro do input.
  const [ name, setName ] = useState<string>();

  const navigation = useNavigation();

  const handleInputBlur = () => {
    setIsFocused(false);
    setIsContent(!!name); // !! Checa o inverso de false, no caso true. Então se tiver texto dentro do input, faça valer true.
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };
  
  const handleInputChange = (value: string) => {
    setIsContent(!!value);
    setName(value);
  };

  const handleSubmit = async () => {
    if(!name) {
      return Alert.alert("Me diz como chamar você 😢");
    }

    try {
      await AsyncStorage.setItem("@plantmanager:user", name);

      navigation.navigate("Confirmation", {
        title: 'Prontinho',
        subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelection'
      });
      
    } catch {
      Alert.alert("Não foi possível salvar o seu nome. 😢");
    }
  };

  return (  
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
      >

        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
        >
          <View style={styles.content}>

            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  { isContent ? "😄" : "😀" }
                </Text>

                <Text style={styles.title}>
                  Como podemos {"\n"}
                  chamar você?
                </Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  (isFocused || isContent) && { borderColor: colors.green } // SE estiver em foco OU tiver conteúdo FAÇA a cor de borderBottom mudar.
                ]}
                placeholder="Digite o seu nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />

              <View style={styles.footer}>
                <Button 
                  title="Confirmação"
                  onPress={handleSubmit}
                />
              </View>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}