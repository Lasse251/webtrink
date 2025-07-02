let spielerListe: string[] = [];

export const getSpielerListe = () => spielerListe;

export const addSpieler = (name: string) => {
  spielerListe.push(name);
};

export const removeSpielerAtIndex = (index: number) => {
  spielerListe.splice(index, 1);
};

export const clearSpielerListe = () => {
  spielerListe = [];
};
