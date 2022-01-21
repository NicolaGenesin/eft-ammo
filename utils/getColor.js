export const getColor = (value) => {
  if (value == 0) {
    return "#cf0b04";
  } else if (value == 1) {
    return "#dc3b07";
  } else if (value == 2) {
    return "#ea6b0a";
  } else if (value == 3) {
    return "#f99d10";
  } else if (value == 4) {
    return "#c0b825";
  } else if (value == 5) {
    return "#87d43d";
  } else if (value == 6) {
    return "#4cf057";
  }
};

export const getRecoilColor = (value) => {
  if (value === "") {
    return "vulcan.900";
  } else if (value <= 0) {
    return "#4cf057";
  } else if (value > 100) {
    return "#cf0b04";
  } else if (value > 80) {
    return "#ea6b0a";
  } else if (value > 40) {
    return "#f99d10";
  } else if (value > 0) {
    return "#c0b825";
  }
};
