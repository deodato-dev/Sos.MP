import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Vibration } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

export default function App() {
  const [nota, setNota] = useState('');
  const [listaDeNotas, setListaDeNotas] = useState<string[]>([]);
  const [idioma, setIdioma] = useState<'pt' | 'en'>('pt');
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'Merosa': require('../../assets/fonts/Merosa.otf'),
  });

  // Carrega o idioma salvo anteriormente ao abrir o app
  useEffect(() => {
    const carregarIdiomaSalvo = async () => {
      const idiomaSalvo = await AsyncStorage.getItem('idiomaApp');
      if (idiomaSalvo === 'pt' || idiomaSalvo === 'en') {
        setIdioma(idiomaSalvo);
      }
    };
    carregarIdiomaSalvo();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  // Função para alternar e salvar o idioma
  const alternarIdioma = async () => {
    const novoIdioma = idioma === 'pt' ? 'en' : 'pt';
    setIdioma(novoIdioma);
    await AsyncStorage.setItem('idiomaApp', novoIdioma);
  };

  const salvarNota = async () => {
    const senhaSalva = await AsyncStorage.getItem('senhaSecreta') || '9999';

    if (nota.trim() === senhaSalva) {
      Vibration.vibrate(100); 
      setNota(''); 
      router.push('/explore'); 
      return; 
    }

    if (nota.trim() !== '') {
      setListaDeNotas([...listaDeNotas, nota]);
      setNota(''); 
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com o Título e o Botão de Idioma */}
      <View style={styles.header}>
        <Text style={styles.titulo}>
          {idioma === 'pt' ? 'Minhas Anotações' : 'My Notes'}
        </Text>
        
        <TouchableOpacity style={styles.botaoIdioma} onPress={alternarIdioma}>
          <Text style={styles.textoBotaoIdioma}>
            {idioma === 'pt' ? '🇬🇧 EN' : '🇧🇷 PT'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder={idioma === 'pt' ? "Escreva uma nova nota..." : "Write a new note..."}
        placeholderTextColor="#A88B7D"
        value={nota}
        onChangeText={setNota}
      />
      
      <TouchableOpacity style={styles.botao} onPress={salvarNota}>
        <Text style={styles.textoBotao}>
          {idioma === 'pt' ? 'Salvar' : 'Save'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={listaDeNotas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemNota}>
            <Text style={styles.textoNota}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF6D9', paddingTop: 60, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  titulo: { 
    fontSize: 28, 
    fontFamily: 'Merosa', 
    color: '#4F2C1D' 
  },
  botaoIdioma: { 
    backgroundColor: '#4F2C1D', 
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    borderRadius: 20 
  },
  textoBotaoIdioma: { 
    color: '#FFF6D9', 
    fontWeight: 'bold', 
    fontSize: 14 
  },
  input: { 
    backgroundColor: '#FFFFFF', 
    padding: 15, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#4F2C1D', 
    marginBottom: 10, 
    color: '#4F2C1D',
    fontFamily: 'Merosa',
    fontSize: 20
  },
  botao: { backgroundColor: '#4F2C1D', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  textoBotao: { color: '#FFF6D9', fontWeight: 'bold', fontSize: 18, fontFamily: 'Merosa' },
  itemNota: { 
    backgroundColor: '#FFFFFF', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 10, 
    borderLeftWidth: 5, 
    borderLeftColor: '#4F2C1D' 
  },
  textoNota: { 
    color: '#4F2C1D', 
    fontSize: 22, 
    fontFamily: 'Merosa' 
  }
});