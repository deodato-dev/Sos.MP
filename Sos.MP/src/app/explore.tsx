import { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, ScrollView, Vibration } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; 

const translations = {
  pt: {
    safeAreaTitle: "Área Segura",
    emergencyNumberLabel: "Número de Emergência:",
    secretPasswordLabel: "Sua Senha Secreta:",
    saveSettingsButton: "Salvar Configurações",
    panicButtonText: "PEDIR AJUDA",
    backToNotesText: "Voltar para o Bloco de Notas",
    successTitle: "Sucesso",
    successMessage: "Configurações salvas!",
    attentionTitle: "Atenção",
    noNumberMessage: "Cadastre um número de emergência primeiro.",
    errorTitle: "Erro",
    noLocationMessage: "Precisamos da localização!",
    searchingTitle: "Buscando...",
    connectingMessage: "Conectando ao satélite...",
    sosMessagePrefix: "SOS! Preciso de ajuda urgente. Minha localização: ",
    warningTitle: "Aviso",
    noSmsMessage: "O sinal foi pra nuvem, mas o SMS não está disponível neste aparelho."
  },
  en: {
    safeAreaTitle: "Safe Area",
    emergencyNumberLabel: "Emergency Number:",
    secretPasswordLabel: "Your Secret Password:",
    saveSettingsButton: "Save Settings",
    panicButtonText: "ASK FOR HELP",
    backToNotesText: "Back to Notes",
    successTitle: "Success",
    successMessage: "Settings saved!",
    attentionTitle: "Attention",
    noNumberMessage: "Please register an emergency number first.",
    errorTitle: "Error",
    noLocationMessage: "Location permission is required!",
    searchingTitle: "Searching...",
    connectingMessage: "Connecting to satellite...",
    sosMessagePrefix: "SOS! I need urgent help. My location: ",
    warningTitle: "Warning",
    noSmsMessage: "Cloud signal sent, but SMS is not available on this device."
  }
};

export default function Secret() {
  const router = useRouter();
  
  const [emergencyNumber, setEmergencyNumber] = useState('');
  const [secretPassword, setSecretPassword] = useState('9999');
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const savedNumber = await AsyncStorage.getItem('emergencyNumber');
        const savedPassword = await AsyncStorage.getItem('secretPassword');
        const savedLanguage = await AsyncStorage.getItem('appLanguage');
        
        if (savedNumber) setEmergencyNumber(savedNumber);
        if (savedPassword) setSecretPassword(savedPassword);
        if (savedLanguage === 'pt' || savedLanguage === 'en') {
          setLanguage(savedLanguage);
        }
      };
      loadData();
    }, [])
  );

  const t = translations[language];

  const saveSettings = async () => {
    await AsyncStorage.setItem('emergencyNumber', emergencyNumber);
    await AsyncStorage.setItem('secretPassword', secretPassword);
    Alert.alert(t.successTitle, t.successMessage);
  };

  const requestHelp = async () => {
    Vibration.vibrate(50);

    if (!emergencyNumber) {
      Alert.alert(t.attentionTitle, t.noNumberMessage);
      return;
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t.errorTitle, t.noLocationMessage);
      return;
    }

    Alert.alert(t.searchingTitle, t.connectingMessage);
    
    let location = await Location.getCurrentPositionAsync({});
    const lat = location.coords.latitude;
    const long = location.coords.longitude;
    const mapLink = `https://maps.google.com/?q=${lat},${long}`;
    const message = `${t.sosMessagePrefix}${mapLink}`;

    try {
      await addDoc(collection(db, "alerts"), {
        guardianNumber: emergencyNumber,
        latitude: lat,
        longitude: long,
        mapLink: mapLink,
        dateTime: new Date().toISOString(),
        status: "Pending"
      });
    } catch (e) {
      console.error("Firebase error: ", e);
    }

    Vibration.vibrate([0, 500, 200, 500]);

    const isSmsAvailable = await SMS.isAvailableAsync();
    if (isSmsAvailable) {
      await SMS.sendSMSAsync([emergencyNumber], message);
    } else {
      Alert.alert(t.warningTitle, t.noSmsMessage);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>
        {t.safeAreaTitle}
      </Text>
      
      <View style={styles.settingsBox}>
        <Text style={styles.label}>
          {t.emergencyNumberLabel}
        </Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: 81999999999"
          placeholderTextColor="#A88B7D"
          keyboardType="phone-pad"
          value={emergencyNumber}
          onChangeText={setEmergencyNumber}
        />

        <Text style={styles.label}>
          {t.secretPasswordLabel}
        </Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: 1234"
          placeholderTextColor="#A88B7D"
          keyboardType="numeric"
          value={secretPassword}
          onChangeText={setSecretPassword}
        />

        <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
          <Text style={styles.buttonText}>
            {t.saveSettingsButton}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.panicButton} onPress={requestHelp}>
        <Text style={styles.panicButtonText}>
          {t.panicButtonText}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>
          {t.backToNotesText}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#4F2C1D' 
  },
  content: { 
    alignItems: 'center', 
    padding: 20, 
    paddingTop: 60 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#FFF6D9', 
    marginBottom: 30 
  },
  settingsBox: { 
    backgroundColor: '#FFF6D9', 
    width: '100%', 
    padding: 20, 
    borderRadius: 12, 
    marginBottom: 40 
  },
  label: { 
    color: '#4F2C1D', 
    fontWeight: 'bold', 
    marginBottom: 5, 
    fontSize: 16 
  },
  input: { 
    backgroundColor: '#FFFFFF', 
    borderWidth: 1, 
    borderColor: '#4F2C1D', 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 15, 
    color: '#4F2C1D' 
  },
  saveButton: { 
    backgroundColor: '#4F2C1D', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#FFF6D9', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  panicButton: { 
    backgroundColor: '#D32F2F', 
    width: 220, 
    height: 220, 
    borderRadius: 110, 
    alignItems: 'center', 
    justifyContent: 'center', 
    elevation: 10, 
    marginBottom: 30 
  },
  panicButtonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16, 
    textAlign: 'center', 
    padding: 10 
  },
  backButton: { 
    padding: 15 
  },
  backButtonText: { 
    color: '#FFF6D9', 
    fontSize: 16, 
    textDecorationLine: 'underline' 
  }
});