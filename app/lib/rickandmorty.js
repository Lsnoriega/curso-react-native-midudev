const extractIdFromUrl = (url) => {
  if (!url) return null;
  const matches = url.match(/\/(\d+)$/);
  return matches ? matches[1] : null;
};

export async function getCharacters() {
  const API_URL = "https://rickandmortyapi.com/api/character";

  const response = await fetch(API_URL);
  const json = await response.json();

  // la API devuelve un array en json.results
  const characters = json.results;

  // adaptamos el formato para que coincida con tu componente
  return characters.map((character) => {
    return {
      id: character.id, // identificador único
      image: character.image,
      title: character.name,
      species: character.species,
      status: character.status,
      location: character.location,
      description: `${character.species} - ${character.status}`,
      releaseDate: character.created, // solo como ejemplo
      first_episode: character.episode[0], // solo como ejemplo
      // score: character.episode.length, // cantidad de apariciones
    };
  });
}

export async function getCharacter(id) {
  const API_URL = "https://rickandmortyapi.com/api/character/" + id;

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // ⚠️ CORRECCIÓN: usa directamente la respuesta, sin .map()
    const characterData = await response.json();

    return {
      id: characterData.id,
      image: characterData.image,
      title: characterData.name,
      gender: characterData.gender,
      species: characterData.species,
      status: characterData.status,
      location: {
        name: characterData.location.name,
        url: characterData.location.url,
        id: extractIdFromUrl(characterData.location.url), // 👈 Nuevo
      },
      origin: {
        name: characterData.origin.name,
        url: characterData.origin.url,
        id: extractIdFromUrl(characterData.origin.url), // 👈 Nuevo
      },
      episode: characterData.episode,
      first_episode: characterData.episode[0],
      releaseDate: characterData.created,
    };
    //   id: characterData.id,
    //   image: characterData.image,
    //   title: characterData.name,
    //   gender: characterData.gender,
    //   species: characterData.species,
    //   status: characterData.status,
    //   origin: characterData.origin,
    //   location: characterData.location,
    //   episode: characterData.episode,
    //   releaseDate: characterData.created,
    //   first_episode: characterData.episode[0],
    // };
  } catch (error) {
    console.error("Error fetching character:", error);
    throw error;
  }
}

export async function getEpisode(episodeParam) {
  let API_URL;
  
  // Si episodeParam es una URL completa, úsala directamente
  // Si es solo un ID, construye la URL
  if (episodeParam.startsWith('http')) {
    API_URL = episodeParam;
  } else {
    API_URL = `https://rickandmortyapi.com/api/episode/${episodeParam}`;
  }

  try {
    console.log('🔍 Fetching episode from:', API_URL); // Debug
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const json = await response.json();
    console.log('✅ Episode data received:', json); // Debug
    
    return {
      id: json.id,
      name: json.name,
      episode: json.episode,
      air_date: json.air_date,
    };
  } catch (error) {
    console.error("❌ Error fetching episode:", error);
    throw error;
  }
}

export async function getLocation(id) {
  const API_URL = "https://rickandmortyapi.com/api/location/" + id;

  const response = await fetch(API_URL);
  const json = await response.json();

  return {
    id: json.id,
    name: json.name,
    type: json.type,
    dimension: json.dimension,
    residents: json.residents,
  };
}

// export async function getLatestGames() {
//   const LATEST_GAMES =
//     "https://internal-prod.apigee.fandom.net/v1/xapi/finder/metacritic/web?sortBy=-metaScore&productType=games&page=1&releaseYearMin=1958&releaseYearMax=2024&offset=0&limit=24&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u";

//   const rawData = await fetch(LATEST_GAMES);
//   const json = await rawData.json();

//   const {
//     data: { items },
//   } = json;

//   return items.map((item) => {
//     const { description, slug, releaseDate, image, criticScoreSummary, title } =
//       item;
//     const { score } = criticScoreSummary;

//     // crea la imagen
//     const { bucketType, bucketPath } = image;
//     const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

//     return {
//       description,
//       releaseDate,
//       score,
//       slug,
//       title,
//       image: img,
//     };
//   });
// }

// export async function getGameDetails(slug) {
//   const GAME_DETAILS = `https://internal-prod.apigee.fandom.net/v1/xapi/composer/metacritic/pages/games/${slug}/web?&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u`;

//   const rawData = await fetch(GAME_DETAILS);
//   const json = await rawData.json();

//   const { components } = json;
//   const { title, description, criticScoreSummary, images } = components[0];
//   const { score } = criticScoreSummary;

//   // get the card image
//   const cardImage = images.find((image) => image.typeName === "cardImage");
//   const { bucketType, bucketPath } = cardImage;
//   const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

//   const rawReviews = components[3].data.items;

//   // get the reviews
//   const reviews = rawReviews.map((review) => {
//     const { quote, score, date, publicationName, author } = review;
//     return { quote, score, date, publicationName, author };
//   });

//   return {
//     img,
//     title,
//     slug,
//     description,
//     score,
//     reviews,
//   };
// }
