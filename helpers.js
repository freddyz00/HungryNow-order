export const computeSubtotal = (arr) => {
  return arr.reduce((value, item) => value + item.qty * item.price, 0);
};

export const getNumItemsInCart = (arr) => {
  return arr.reduce((value, item) => value + item.qty, 0);
};

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

export const validateEmail = (email) => {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return "Invalid Email";
  }
};

export const validatePassword = (password) => {
  if (password.length < 8) {
    return "Passwords must be at least 8 characters";
  }
};

export const validateConfirmPassword = (confirmPassword, password) => {
  if (confirmPassword !== password) {
    return "Passwords do not match";
  }
};
