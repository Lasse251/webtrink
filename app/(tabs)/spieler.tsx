import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addSpieler, clearSpielerListe, getSpielerListe, removeSpielerAtIndex } from '../data/spielerliste';

export default function MainScreen() {
  const [hintergrundFarbe, setHintergrundFarbe] = useState('#343541');
  const [textFarbe, setTextFarbe] = useState('#fff');
  const [spielerEingabe, setSpielerEingabe] = useState('');
  const [spielerListe, setSpielerListe] = useState<string[]>([]);

useEffect(() => {
  setSpielerListe(getSpielerListe());
}, []);

const handleAddSpieler = () => {
  if (spielerEingabe.trim().length === 0) return;
  const name = spielerEingabe.trim().toUpperCase();
  addSpieler(name); 
  setSpielerListe(getSpielerListe());
  setSpielerEingabe('');
};

const handleDeleteSpieler = (index: number) => {
  removeSpielerAtIndex(index);
  setSpielerListe(getSpielerListe());
};

  const handleClear = () => {
    clearSpielerListe();
    setSpielerListe([]);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: hintergrundFarbe }]}>
      <View style={styles.spielerMenue}>
        <TextInput
          style={[styles.input, { color: textFarbe }]}
          placeholder="SPIELERNAME"
          value={spielerEingabe}
          onChangeText={setSpielerEingabe}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddSpieler}>
            <Text style={styles.addButtonText}>HINZUFÜGEN</Text>
        </TouchableOpacity>

        {spielerListe.length === 0 ? (
          <Text style={{ color: textFarbe }}>KEINE SPIELER EINGETRAGEN.</Text>
        ) : (
          <View style={{ marginTop: 20, width: '100%' }}>
            {spielerListe.map((item, index) => (
              <View key={index.toString()} style={styles.spielerContainer}>
                <Text style={styles.spielerText}>{item}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteSpieler(index)}>
                  <Text style={styles.deleteIcon}>-</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

        )}
        <TouchableOpacity style={styles.addButton} onPress={handleClear}>
            <Text style={styles.addButtonText}>SPIELER LÖSCHEN</Text>
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
  spielerContainer: {
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
  spielerText: {
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
