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
  Divider,
} from "@chakra-ui/react";
import { getColor, getRecoilColor } from "../utils/getColor";
import search from "../utils/search";
import categories from "../utils/categories";
import headers from "../utils/headers";

const MobileRow = ({ category, allAmmosForCategory, currentSearch, language = 'en' }) => {
  const categoryMatch =
    currentSearch.length &&
    search(
      currentSearch,
      category
    );

  return (
    <Box>
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
            bg={categoryMatch ? "blue.600" : ""}
          >
            {language !== 'en' ? categories[category][language] || category : category}
          </Text>
        </Center>
        <Spacer />
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pt={4} px={0}>
        <Flex color="tarkovYellow.100" direction="column">
          {allAmmosForCategory.map((ammo, index) => {
            let imagePath = `${category}@${ammo.name}`;

            if (ammo.name.includes("Poleva-6u")) {
              // TODO real spaghetti, fix this

              imagePath = `${category}@Poleva-6`;
            }

            const imageURL = `/images/${imagePath}.webp`;
            const fallbackImageURL = `/images-fallback/${imagePath}.jpeg`;

            const ammoMatch =
              currentSearch.length &&
              search(
                currentSearch,
                ammo.name
              );

            let ammoPrice;

            if (ammo.price) {
              ammoPrice = `${ammo.price} ₽`;
            }

            let recoil = "No Data";

            if (ammo.recoil !== "") {
              if (ammo.recoil > 0) {
                recoil = `${ammo.recoil}% ▲`;
              } else if (ammo.recoil < 0) {
                recoil = `${ammo.recoil}% ▼`;
              } else {
                recoil = `${ammo.recoil}%`;
              }
            }

            const labels = Object.keys(headers[language])

            return (
              <Box key={`allAmmos-${index}`} bg="vulcan.800" mb="12px" p="8px">
                <HStack>
                  <picture>
                    <source
                      srcSet={encodeURIComponent(imageURL)}
                      type="image/webp"
                    />
                    <img
                      style={{
                        marginLeft: "8px",
                        objectFit: "cover",
                      }}
                      width="48px"
                      height="48px"
                      src={encodeURIComponent(fallbackImageURL)}
                      alt={ammo.name}
                      loading="lazy"
                    />
                  </picture>
                  <Center
                    bg={ammoMatch ? "blue.600" : ""}
                    fontSize="sm"
                    fontWeight="semibold"
                    ml="8px"
                  >
                    {ammo.standard.translations[language || 'en'].name.toUpperCase()}
                  </Center>
                  <Spacer />
                  {ammo.notAvailableOnFleaMarket ? (
                    <Text
                      color="tomato"
                      fontSize="xs"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      {language === 'en' ? "Not on F.M." : "No en F.M."}
                    </Text>
                  ) : (
                    <Text
                      color="tarkovYellow.100"
                      fontSize="xs"
                      fontWeight="bold"
                      textAlign="right"
                    >
                      {language === 'en' ? "Last Low F.M." : "Último bajo F.M."}
                      <br />
                      {ammoPrice || "-"}
                    </Text>
                  )}
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
                      {labels[0]}
                    </Center>
                    <Center bg="#4E4E4C" w="100%">
                      {ammo.damage}
                    </Center>
                  </VStack>
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" p="2px" w="100%">
                      {labels[1]}
                    </Center>
                    <Center bg="#4E4E4C" w="100%">
                      {ammo.penValue}
                    </Center>
                  </VStack>
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" p="2px" w="100%">
                      {labels[2]}
                    </Center>
                    <Center bg="#4E4E4C" w="100%">
                      {ammo.fragChange}
                    </Center>
                  </VStack>
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" p="2px" w="100%">
                      {labels[6]}
                    </Center>
                    <Center bg="#4E4E4C" w="100%">
                      {ammo.initialSpeed === ""
                        ? "No Data"
                        : `${ammo.initialSpeed}`}
                    </Center>
                  </VStack>
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
                      {labels[3]}
                    </Center>
                    <Center
                      color={
                        ammo.recoil === ""
                          ? "tarkovYellow.100"
                          : getRecoilColor(ammo.recoil)
                      }
                      bg="#4E4E4C"
                      w="100%"
                    >
                      {recoil}
                    </Center>
                  </VStack>
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" p="2px" w="100%">
                      {labels[4]}
                    </Center>
                    <Center bg="#4E4E4C" w="100%">
                      {ammo.effDist === "" ? "No Data" : `${ammo.effDist}`}
                    </Center>
                  </VStack>
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" p="2px" w="100%">
                      {labels[5]}
                    </Center>
                    <Center bg="#4E4E4C" w="100%">
                      {ammo.maxHsDist === "" ? "No Data" : `${ammo.maxHsDist}`}
                    </Center>
                  </VStack>
                </HStack>
                <Divider my="8px" borderColor="vulcan.900" />
                <Center color="tarkovYellow.100" fontSize="xs" mb="4px">
                  {language === 'en' ? "Bullet effectiveness against armor class" : "Eficacia de la bala contra la clase de armadura"}
                </Center>
                <HStack fontSize="xs" justify="space-around">
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" w="100%" p="1px">
                      {labels[7]}
                    </Center>
                    <Center bg={getColor(ammo.class1)} color="black" w="100%">
                      {ammo.class1}
                    </Center>
                  </VStack>
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" w="100%" p="1px">
                      {labels[8]}
                    </Center>
                    <Center bg={getColor(ammo.class2)} color="black" w="100%">
                      {ammo.class2}
                    </Center>
                  </VStack>
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" w="100%" p="1px">
                      {labels[9]}
                    </Center>
                    <Center bg={getColor(ammo.class3)} color="black" w="100%">
                      {ammo.class3}
                    </Center>
                  </VStack>
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" w="100%" p="1px">
                      {labels[10]}
                    </Center>
                    <Center bg={getColor(ammo.class4)} color="black" w="100%">
                      {ammo.class4}
                    </Center>
                  </VStack>
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" w="100%" p="1px">
                      {labels[11]}
                    </Center>
                    <Center bg={getColor(ammo.class5)} color="black" w="100%">
                      {ammo.class5}
                    </Center>
                  </VStack>
                  <VStack spacing="0" w="100%">
                    <Center bg="#232314" w="100%" p="1px">
                      {labels[12]}
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
