import { Box, Text } from "@chakra-ui/react";
import React from "react";

const ItemLabel = ({ itemType, position }) => {
  let label = itemType;

  if (itemType === "bodyArmor") {
    label = "body armor";
  } else if (itemType === "faceCover") {
    label = "face cover";
  } else if (itemType === "onSling") {
    label = "on sling";
  } else if (itemType === "onBack") {
    label = "on back";
  } else if (itemType === "facecover") {
    label = "face cover";
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

  return (
    <Box
      mt="-16px"
      bgImage="url('/builder/label.png')"
      bgPosition="left"
      bgRepeat="no-repeat"
      color="white"
      fontSize="xs"
      fontWeight="bold"
      mx="2px"
      px="4px"
    >
      <Text textTransform="uppercase">{label}</Text>
    </Box>
  );
};

export default ItemLabel;
