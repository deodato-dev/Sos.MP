import { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, ScrollView, Vibration } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; 

export default function Secret() {
  const router = useRouter();
  
  const [numero, setNumero] = useState('');
  const [senha, setSenha] = useState('9999');
  const [idioma, setIdioma] = useState<'pt' | 'en'>('pt');
  
  // useFocusEffect roda toda vez que você entra/volta para esta tela
  useFocusEffect(
    useCallback(() => {
      const carregarDados = async () => {
        const numSalvo = await AsyncStorage.getItem('numeroEmergencia');
        const senhaSalva = await AsyncStorage.getItem('senhaSecreta');
        const idiomaSalvo = await AsyncStorage.getItem('idiomaApp');
        
        if (numSalvo) setNumero(numSalvo);
        if (senhaSalva) setSenha(senhaSalva);
        if (idiomaSalvo === 'pt' || idiomaSalvo === 'en') {
          setIdioma(idiomaSalvo);
        }
      };
      carregarDados();
    }, [])
  );

  const salvarConfiguracoes = async () => {
    await AsyncStorage.setItem('numeroEmergencia', numero);
    await AsyncStorage.setItem('senhaSecreta', senha);
    Alert.alert(
      idioma === 'pt' ? "Sucesso" : "Success", 
      idioma === 'pt' ? "Configurações salvas!" : "Settings saved!"
    );
  };

  const pedirAjuda = async () => {
    Vibration.vibrate(50);

    if (!numero) {
      Alert.alert(
        idioma === 'pt' ? "Atenção" : "Attention", 
        idioma === 'pt' ? "Cadastre um número de emergência primeiro." : "Please register an emergency number first."
      );
      return;
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Erro', idioma === 'pt' ? 'Precisamos da localização!' : 'Location permission is required!');
      return;
    }

    Alert.alert(
      idioma === 'pt' ? "Buscando..." : "Searching...", 
      idioma === 'pt' ? "Conectando ao satélite..." : "Connecting to satellite..."
    );
    let location = await Location.getCurrentPositionAsync({});
    const lat = location.coords.latitude;
    const long = location.coords.longitude;
    const linkMapa = `https://maps.google.com/?q=${lat},${long}`;
    const mensagem = idioma === 'pt' 
      ? `SOS! Preciso de ajuda urgente. Minha localização: ${linkMapa}`
      : `SOS! I need urgent help. My location: ${linkMapa}`;

    try {
      await addDoc(collection(db, "alertas"), {
        numeroGuardiao: numero,
        latitude: lat,
        longitude: long,
        linkMapa: linkMapa,
        dataHora: new Date().toISOString(),
        status: "Pendente"
      });
    } catch (e) {
      console.error("Erro ao salvar no Firebase: ", e);
    }

    Vibration.vibrate([0, 500, 200, 500]);

    const smsDisponivel = await SMS.isAvailableAsync();
    if (smsDisponivel) {
      await SMS.sendSMSAsync([numero], mensagem);
    } else {
      Alert.alert(
        "Aviso", 
        idioma === 'pt' ? "O sinal foi pra nuvem, mas o SMS não está disponível neste aparelho." : "Cloud signal sent, but SMS is not available on this device."
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>
        {idioma === 'pt' ? 'Área Segura' : 'Safe Area'}
      </Text>
      
      <View style={styles.caixaConfig}>
        <Text style={styles.label}>
          {idioma === 'pt' ? 'Número de Emergência:' : 'Emergency Number:'}
        </Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: 81999999999"
          placeholderTextColor="#A88B7D"
          keyboardType="phone-pad"
          value={numero}
          onChangeText={setNumero}
        />

        <Text style={styles.label}>
          {idioma === 'pt' ? 'Sua Senha Secreta:' : 'Your Secret Password:'}
        </Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: 1234"
          placeholderTextColor="#A88B7D"
          keyboardType="numeric"
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.botaoSalvarConfig} onPress={salvarConfiguracoes}>
          <Text style={styles.textoBotao}>
            {idioma === 'pt' ? 'Salvar Configurações' : 'Save Settings'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botaoPanico} onPress={pedirAjuda}>
        <Text style={styles.textoBotaoPanico}>
          {idioma === 'pt' ? 'PEDIR AJUDA' : 'ASK FOR HELP'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
        <Text style={styles.textoVoltar}>
          {idioma === 'pt' ? 'Voltar para o Bloco de Notas' : 'Back to Notes'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4F2C1D' },
  content: { alignItems: 'center', padding: 20, paddingTop: 60 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#FFF6D9', marginBottom: 30 },
  caixaConfig: { backgroundColor: '#FFF6D9', width: '100%', padding: 20, borderRadius: 12, marginBottom: 40 },
  label: { color: '#4F2C1D', fontWeight: 'bold', marginBottom: 5, fontSize: 16 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#4F2C1D', padding: 12, borderRadius: 8, marginBottom: 15, color: '#4F2C1D' },
  botaoSalvarConfig: { backgroundColor: '#4F2C1D', padding: 15, borderRadius: 8, alignItems: 'center' },
  textoBotao: { color: '#FFF6D9', fontWeight: 'bold', fontSize: 16 },
  botaoPanico: { backgroundColor: '#D32F2F', width: 220, height: 220, borderRadius: 110, alignItems: 'center', justifyContent: 'center', elevation: 10, marginBottom: 30 },
  textoBotaoPanico: { color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center', padding: 10 },
  botaoVoltar: { padding: 15 },
  textoVoltar: { color: '#FFF6D9', fontSize: 16, textDecorationLine: 'underline' }
});