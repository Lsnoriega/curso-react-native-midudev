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
      description: `${character.species} - ${character.status}`,
      releaseDate: character.created, // solo como ejemplo
      score: character.episode.length, // cantidad de apariciones
    };
  });
}

export async function getGameDetails(slug) {
  const API_URL = `https://rickandmortyapi.com/api/character/${id}`;

  const response = await fetch(API_URL);
  const json = await response.json();

  return {
    img: json.image,
    title: json.name,
    slug: json.id,
    description: `${json.species} - ${json.status}`,
    score: json.episode.length,
    reviews: json.episode, // solo como dato de ejemplo
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
