import React, { useState } from "react";
import { Box, Text, HStack, Spacer, Center, Link } from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Feedback = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [content, setContent] = useState({});

  return (
    <Box
      h="auto"
      w="auto"
      maxW="350px"
      position="fixed"
      top="0"
      right="0"
      boxShadow="md"
      borderRadius="0 0 0 5px"
      bg="#ea6b0a"
      color="white"
      fontWeight="bold"
      p="4px 6px"
    >
      {!isButtonClicked ? (
        <Text
          fontSize="xs"
          cursor={"pointer"}
          onClick={() => {
            setIsButtonClicked(!isButtonClicked);
          }}
        >
          Feedback? 👀
        </Text>
      ) : (
        <Box p="6px 4px">
          <HStack>
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
          <Text fontWeight="semibold" mb="8px">
            Bugs? 🐛 Feedback? 👇
          </Text>
          <Text fontSize="xs">
            If you want a feature, found a bug or have feedback, write me on
            Discord. I'll build the feature / fix the bug for you!
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
