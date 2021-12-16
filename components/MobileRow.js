import {
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Center,
  Text,
  Image,
  Box,
  VStack,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import getColor from "../utils/getColor";

const MobileRow = ({ category, allAmmosForCategory }) => {
  return (
    <Box bg="#333">
      <AccordionButton>
        <Center h="64px">
          <Text
            w="100%"
            fontWeight="bold"
            fontSize="2xl"
            px="8px"
            style={{
              whiteSpace: "nowrap",
            }}
          >
            {category}
          </Text>
        </Center>
        <Spacer />
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pt={4} px={0}>
        <Flex color="white" direction="column">
          {allAmmosForCategory.map((ammo, index) => {
            return (
              <Box key={`allAmmos-${index}`} bg="#3C3C3C" mb="12px" p="8px">
                <HStack>
                  <Center>
                    <Image
                      boxSize="48px"
                      objectFit="cover"
                      src={`./images/${category}@${ammo.name}.png`}
                      alt={ammo.name}
                      fallbackSrc={`./images/fallback.png`}
                    />
                  </Center>
                  <Center>
                    <Text fontSize="sm" fontWeight="semibold" ml="8px">
                      {ammo.name.toUpperCase()}
                    </Text>
                  </Center>
                </HStack>
                <HStack
                  mt="8px"
                  fontSize="xs"
                  justify="space-around"
                  style={{
                    whiteSpace: "nowrap",
                  }}
                >
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" p="2px" w="100%">
                      DMG
                    </Center>
                    <Center bg="#4E4E4C" w="100%">
                      {ammo.damage}
                    </Center>
                  </VStack>
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" p="2px" w="100%">
                      PEN VAL
                    </Center>
                    <Center bg="#4E4E4C" w="100%">
                      {ammo.penValue}
                    </Center>
                  </VStack>
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" p="2px" w="100%">
                      ARMOR DMG
                    </Center>
                    <Center bg="#4E4E4C" w="100%">
                      {ammo.armorDamage}
                    </Center>
                  </VStack>
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" p="2px" w="100%">
                      FRAG %
                    </Center>
                    <Center bg="#4E4E4C" w="100%">
                      {ammo.fragChange}
                    </Center>
                  </VStack>
                </HStack>
                <HStack mt="8px" fontSize="xs" justify="space-around">
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" w="100%" p="1px">
                      C1
                    </Center>
                    <Center bg={getColor(ammo.class1)} color="black" w="100%">
                      {ammo.class1}
                    </Center>
                  </VStack>
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" w="100%" p="1px">
                      C2
                    </Center>
                    <Center bg={getColor(ammo.class2)} color="black" w="100%">
                      {ammo.class2}
                    </Center>
                  </VStack>
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" w="100%" p="1px">
                      C3
                    </Center>
                    <Center bg={getColor(ammo.class3)} color="black" w="100%">
                      {ammo.class3}
                    </Center>
                  </VStack>
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" w="100%" p="1px">
                      C4
                    </Center>
                    <Center bg={getColor(ammo.class4)} color="black" w="100%">
                      {ammo.class4}
                    </Center>
                  </VStack>
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" w="100%" p="1px">
                      C5
                    </Center>
                    <Center bg={getColor(ammo.class5)} color="black" w="100%">
                      {ammo.class5}
                    </Center>
                  </VStack>
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" w="100%" p="1px">
                      C6
                    </Center>
                    <Center bg={getColor(ammo.class6)} color="black" w="100%">
                      {ammo.class6}
                    </Center>
                  </VStack>
                </HStack>
              </Box>
            );
          })}
        </Flex>
      </AccordionPanel>
    </Box>
  );
};

export default MobileRow;
