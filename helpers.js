export const calculateMapCoords = (location1, location2 = null) => {
  if (!location2) {
    return {
      latitude: location1.latitude,
      longitude: location1.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
  }

  const latitude = (location1.latitude + location2.latitude) / 2;
  const longitude = (location1.longitude + location2.longitude) / 2;
  const latitudeDelta = Math.max(
    Math.abs(location1.latitude - location2.latitude) * 1.3,
    0.01
  );
  const longitudeDelta = Math.max(
    Math.abs(location1.longitude - location2.longitude) * 1.3,
    0.01
  );
  return { latitude, longitude, latitudeDelta, longitudeDelta };
};
