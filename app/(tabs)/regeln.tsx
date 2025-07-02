//regeln.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getTrinkWort, setTrinkWort } from '../data/trinkwort';

export default function MainScreen() {
  const [zeigeRegelMenü, setZeigeRegelMenü] = useState(false);
  const [hintergrundFarbe, setHintergrundFarbe] = useState('#343541');
  const [textFarbe, setTextFarbe] = useState('#fff');
  const [regelEingabe, setRegelEingabe] = useState('');
  const [regelListe, setRegelListe] = useState<string[]>([
    'Das Wort "trinken" und Wörter mit dem selben Stamm dürfen nicht gesagt werden.'
  ]);
  const [trinkWortInput, setTrinkWortInput] = useState(getTrinkWort());
  const [errorText, setErrorText] = useState('');

  const handleAddRegel = () => {
    if (regelEingabe.trim().length === 0) return;
    setRegelListe(prev => [...prev, regelEingabe.trim().toUpperCase()]);
    setRegelEingabe('');
  };

  const handleDeleteRegel = (index: number) => {
    setRegelListe(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setTrinkWort(trinkWortInput);
  }, [trinkWortInput]);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: hintergrundFarbe }]}>
      <View style={styles.spielerMenue}>
        <Text style={{ color: '#f0f0f0', fontWeight: '600', marginBottom: 5 }}>ALTERNATIVWORT FÜR TRINKEN</Text>
        <TextInput
          style={[styles.input, { color: textFarbe }]}
          value={trinkWortInput}
          onChangeText={setTrinkWortInput}
        />
        <Text style={{ color: textFarbe, fontWeight: 'bold' }}>EIGENE REGEL ERSTELLEN</Text>
        <TextInput
          style={[styles.input, { color: textFarbe }]}
          placeholder="Eigene Regel"
          value={regelEingabe}
          onChangeText={setRegelEingabe}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddRegel}>
          <Text style={styles.addButtonText}>HINZUFÜGEN</Text>
        </TouchableOpacity>
        {regelListe.length === 0 && (
          <Text style={{ color: textFarbe }}>KEINE REGELN VORHANDEN</Text>
        )}

        <View style={{ marginTop: 20, width: '100%' }}>
          {regelListe.map((item, index) => (
            <View key={index.toString()} style={styles.regelContainer}>
              <Text style={styles.regelText}>{item}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteRegel(index)}>
                <Text style={styles.deleteIcon}>–</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => setRegelListe([])}>
          <Text style={styles.addButtonText}>REGELN LÖSCHEN</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
  },
  spielerMenue: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#4fb1f2',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 12,
    paddingHorizontal: 15,
    color: '#f0f0f0',
    width: '90%',
  },
  regelContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#4fb1f2',
  },
  regelText: {
    flex: 1,
    color: '#f0f0f0',
    fontSize: 15,
    fontWeight: '500',
    paddingRight: 10,
  },
  deleteButton: {
    backgroundColor: '#a73737',
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: -1,
  },
  addButton: {
    backgroundColor: '#0a6ed1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: '#0a6ed1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

