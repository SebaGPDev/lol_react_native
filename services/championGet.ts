import { ChampionData } from "../interface/championData"; // Importar la interfaz ChampionData desde el archivo separado

// Hacer la petición a la API y obtener los datos de los campeones
export const fetchChampions = async (): Promise<{
  [key: string]: ChampionData;
}> => {
  try {
    const response = await fetch(
      "http://ddragon.leagueoflegends.com/cdn/13.7.1/data/es_AR/champion.json"
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error("Failed to fetch champions data");
  }
};
