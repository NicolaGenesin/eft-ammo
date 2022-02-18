import { Center, Text } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Center h="100vh" bg="vulcan.800">
      <Text fontSize="2xl" fontWeight="bold" color="tarkovYellow.100">
        Loading...
      </Text>
    </Center>
  );
};

export default Loading;
