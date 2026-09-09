import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Vibration } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

export default function App() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<string[]>([]);
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'Merosa': require('../../assets/fonts/Merosa.otf'),
  });

  useEffect(() => {
    const loadSavedLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('appLanguage');
      if (savedLanguage === 'pt' || savedLanguage === 'en') {
        setLanguage(savedLanguage);
      }
    };
    loadSavedLanguage();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const toggleLanguage = async () => {
    const newLanguage = language === 'pt' ? 'en' : 'pt';
    setLanguage(newLanguage);
    await AsyncStorage.setItem('appLanguage', newLanguage);
  };

  const saveNote = async () => {
    const savedPassword = await AsyncStorage.getItem('secretPassword') || '9999';

    if (note.trim() === savedPassword) {
      Vibration.vibrate(100);
      setNote('');
      router.push('/explore');
      return;
    }

    if (note.trim() !== '') {
      setNotes([...notes, note]);
      setNote('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {language === 'pt' ? 'Minhas Anotações' : 'My Notes'}
        </Text>
        
        <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
          <Text style={styles.languageButtonText}>
            {language === 'pt' ? '🇬🇧 EN' : '🇧🇷 PT'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder={language === 'pt' ? "Escreva uma nova nota..." : "Write a new note..."}
        placeholderTextColor="#A88B7D"
        value={note}
        onChangeText={setNote}
      />
      
      <TouchableOpacity style={styles.button} onPress={saveNote}>
        <Text style={styles.buttonText}>
          {language === 'pt' ? 'Salvar' : 'Save'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text style={styles.noteText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF6D9', 
    paddingTop: 60, 
    paddingHorizontal: 20 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  title: { 
    fontSize: 28, 
    fontFamily: 'Merosa', 
    color: '#4F2C1D' 
  },
  languageButton: { 
    backgroundColor: '#4F2C1D', 
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    borderRadius: 20 
  },
  languageButtonText: { 
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
  button: { 
    backgroundColor: '#4F2C1D', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginBottom: 20 
  },
  buttonText: { 
    color: '#FFF6D9', 
    fontWeight: 'bold', 
    fontSize: 18, 
    fontFamily: 'Merosa' 
  },
  noteItem: { 
    backgroundColor: '#FFFFFF', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 10, 
    borderLeftWidth: 5, 
    borderLeftColor: '#4F2C1D' 
  },
  noteText: { 
    color: '#4F2C1D', 
    fontSize: 22, 
    fontFamily: 'Merosa' 
  }
});