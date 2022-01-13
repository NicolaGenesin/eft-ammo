import React from "react";
import { Center, Button, HStack, Text } from "@chakra-ui/react";
import { MdCompareArrows } from "react-icons/md";

const CompareButton = ({ showModal }) => {
  return (
    <Center
      position="fixed"
      bottom="0"
      right="0"
      left="0"
      mb="24px"
      fontWeight="bold"
    >
      <Button size="lg" onClick={showModal} colorScheme="teal">
        <HStack>
          <Text>Compare Ammunitions</Text>
          <MdCompareArrows />
        </HStack>
      </Button>
    </Center>
  );
};

export default CompareButton;
