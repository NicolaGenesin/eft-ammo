import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { getItemLabel } from "../../utils/labels";

const ItemLabel = ({ itemType, position }) => {
  const label = getItemLabel(itemType, position);

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
