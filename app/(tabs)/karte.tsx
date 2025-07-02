//karte.tsx
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import challenges from '../data/challenges';
import { getSpielerListe } from '../data/spielerliste';
import { getTrinkWort } from '../data/trinkwort';



export default function MainScreen() {
  const [hintergrundFarbe, setHintergrundFarbe] = useState('#343541');
  const [textFarbe, setTextFarbe] = useState('#fff');
  const [spielerListe, setSpielerListe] = useState<string[]>(getSpielerListe);
  const [aktuelleChallange, setAktuelleChallange] = useState('');
  const [trinkWort, setTrinkWort] = useState(getTrinkWort);
  const [aktuellerSpieler, setaktuellerSpieler] = useState(-1);
  const [nächsterSpieler, setnächsterSpieler] = useState(0);
  const [errorText, setErrorText] = useState('');


  const getChallange = () => {
    const aktuellesTrinkWort = getTrinkWort(); // hole den aktuellen Wert!

    if (spielerListe.length == 0) {
      setErrorText('Füge Spieler hinzu!');
    } else {
      const Index = Math.floor(Math.random() * challenges.length);
      let text = challenges[Index];
      text = text.replace('trinkWort', aktuellesTrinkWort);
      setAktuelleChallange(text);
      manageAktuellenSpieler();
    }
  };


  const manageAktuellenSpieler = () => {
    setaktuellerSpieler(nächsterSpieler);

    if (spielerListe.length <= nächsterSpieler + 1) {
      setnächsterSpieler(0);
    } else {
      setnächsterSpieler(nächsterSpieler + 1);
    };
  };


  return (
<ScrollView contentContainerStyle={[styles.container, { backgroundColor: hintergrundFarbe }]}>
      {/* Kartenbereich */}
        <View style={styles.kartenContainer}>
          {aktuellerSpieler != -1 && (<Text style={styles.infoText}>KARTE FÜR {spielerListe[aktuellerSpieler].toUpperCase()}</Text>)}
          {aktuellerSpieler == -1 && (<Text style={styles.warnText}>FÜGE SPIELER VORM ZIEHEN HINZU!</Text>)}
          <View style={[styles.card, {backgroundColor: textFarbe}]}>
            <Text style={styles.cardtext} numberOfLines={5} ellipsizeMode="tail">
              {aktuelleChallange}
            </Text>
          </View>
          {spielerListe.length != 0 && (<Text style={styles.infoSecondaryText}>NÄCHSTE KARTE FÜR {spielerListe[nächsterSpieler].toUpperCase()}</Text>)}
          {spielerListe.length == 0 && ( <Text style={styles.warnText}>{errorText}</Text>)}
          <TouchableOpacity style={styles.addButton} onPress={getChallange}>
            <Text style={styles.addButtonText}>KARTE ZIEHEN</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
  },
  kartenContainer: {
    alignItems: 'center',
    width: '100%',
    gap: 20, // moderne Abstandslösung
  },
  card: {
    width: '100%',
    maxWidth: 320,
    height: 200,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#2a2a2a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4fb1f2',
  },
  cardtext: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#0a6ed1',
    paddingVertical: 14,
    paddingHorizontal: 28,
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
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  infoText: {
    color: '#f0f0f0',
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  infoSecondaryText: {
    marginTop: 10,
    color: '#a0a0a0',
    fontSize: 14,
    textAlign: 'center',
  },
  warnText: {
    marginTop: 10,
    color: '#ff8888',
    fontSize: 14,
    textAlign: 'center',
  },
});

