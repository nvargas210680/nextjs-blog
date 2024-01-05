async function getCoordinates(address) {
  const accessToken = "pk.eyJ1IjoibnZhcmdhczIxMDY4MCIsImEiOiJjbHBtemRta2QwYmg2MmpvdjBob2ZtNXFhIn0.YVcTrkMEHEs1gdAO41Zc8A";
  const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${accessToken}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const coordinates = data.features[0].geometry.coordinates;
      return {
        lat: coordinates[1],
        lng: coordinates[0],
      };
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("Error fetching geocoding data", error);
    throw error;
  }
}

const address = "264 woodbine blvd";
getCoordinates(address)
  .then((coordinates) => console.log("Coordinates:", coordinates))
  .catch((error) => console.error("Error:", error));

getCoordinates();
