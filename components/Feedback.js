import React, { useState } from "react";
import { Box, Text, HStack, Spacer, Center, Link } from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Feedback = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  return (
    <Box
      position="fixed"
      bottom="6%"
      right="0"
      margin="0"
      borderRadius="5px 5px 0 0"
      color="#ebece8"
      fontWeight="bold"
    >
      {!isButtonClicked ? (
        <Text
          p="4px 6px"
          bg="purple"
          transform="translateX(30%) rotate(-90deg)"
          fontSize="xs"
          cursor={"pointer"}
          onClick={() => {
            setIsButtonClicked(!isButtonClicked);
          }}
        >
          👀 Feedback
        </Text>
      ) : (
        <Box p="12px" bg="purple">
          <HStack mb="16px">
            <Text fontWeight="semibold">Bugs? 🐛 Feedback? Ideas? 👇</Text>
            <Spacer />
            <Box
              rounded="md"
              bg={"blackAlpha.500"}
              p="8px"
              onClick={() => setIsButtonClicked(!isButtonClicked)}
              cursor={"pointer"}
            >
              <IoMdClose />
            </Box>
          </HStack>
          <Text fontSize="xs">
            If you want a feature, found a bug or have feedback,
            <br />
            write me on Discord. I'll build the feature / fix the bug for you!
          </Text>
          <Link href="https://discord.gg/ZmK8PdWPV9">
            <Center rounded="md" bg={"blackAlpha.500"} mt="8px" py="4px">
              <Text mr="8px" fontSize="sm" fontWeight="bold">
                Join the discord
              </Text>{" "}
              <FaDiscord size={24} />
            </Center>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default Feedback;
