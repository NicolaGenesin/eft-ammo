export const getItemLabel = (itemType, position) => {
  let label = itemType;

  if (itemType === "bodyArmor") {
    label = "body armor";
  } else if (itemType === "faceCover") {
    label = "face cover";
  } else if (itemType === "onSling") {
    label = "on sling";
  } else if (itemType === "onBack") {
    label = "on back";
  } else if (itemType === "title") {
    label = "title";
  } else if (itemType === "holster") {
    label = "holster";
  } else if (itemType.includes("onSling")) {
    label = `on sling (${position})`;
  } else if (itemType.includes("holster")) {
    label = `holster (${position})`;
  } else if (itemType.includes("onBack")) {
    label = `on back (${position})`;
  }

  return label;
};

export const getModalTitleLabel = (itemType) => {
  let label = itemType;

  if (itemType === "bodyArmor") {
    label = "body armor";
  } else if (itemType === "onSling") {
    label = "primary gun";
  } else if (itemType === "onBack") {
    label = "secondary gun";
  } else if (itemType === "faceCover") {
    label = "face cover";
  } else if (itemType === "holster") {
    label = "holster";
  } else if (itemType.includes("onSling")) {
    label = "ammo type for the primary gun";
  } else if (itemType.includes("holster")) {
    label = "ammo type for the holster";
  } else if (itemType.includes("onBack")) {
    label = "ammo type for the secondary gun";
  }

  return label;
};
