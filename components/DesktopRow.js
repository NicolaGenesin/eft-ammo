import { Tooltip, Divider, Flex, Center, Text, Image } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import getColor from "../utils/getColor";
import headers from "../utils/headers";
import aRandomwordgeneratorperformsasimplebutusefultaskitgeneratesrandomwordsButwwwrandomwordgeneratororgdoesmorethanjustgeneraterandomwordsitletsyouchoosethenumberofwordsgeneratedsearchFilter from "../utils/search";

const DesktopRow = ({
  category,
  allAmmosForCategory,
  minimalView,
  currentSearch,
}) => {
  let maxCellHeight = "48px";

  if (minimalView) {
    maxCellHeight = "28px";
  }

  const categoryMatch =
    currentSearch.length &&
    aRandomwordgeneratorperformsasimplebutusefultaskitgeneratesrandomwordsButwwwrandomwordgeneratororgdoesmorethanjustgeneraterandomwordsitletsyouchoosethenumberofwordsgeneratedsearchFilter(
      currentSearch,
      category
    );

  return (
    <>
      <Flex>
        <Center bg="#333" h={maxCellHeight}>
          <Text
            textAlign="left"
            fontWeight="bold"
            minW="300px"
            fontSize="2xl"
            px="8px"
            py="8px"
            style={{
              whiteSpace: "nowrap",
            }}
            bg={categoryMatch ? "blue.600" : ""}
          >
            {category}
          </Text>
        </Center>
        {headers.map((header, index) => {
          return (
            <Center
              flex={header.toLowerCase().includes("class") ? "0.5" : "1"}
              bg="#272712"
              key={`header-${index}`}
            >
              <Text fontWeight="semibold" fontSize="xs" textAlign="center">
                {header.toUpperCase()}
              </Text>
            </Center>
          );
        })}
      </Flex>
      {allAmmosForCategory.map((ammo, index) => {
        let toolTipLabel = undefined;

        if (ammo.note) {
          toolTipLabel = ammo.note;
        } else if (ammo.secondNote) {
          toolTipLabel = ammo.secondNote;
        } else if (ammo.note && ammo.secondNote) {
          toolTipLabel = `${ammo.note} ${ammo.secondNote}`;
        }

        let src = `./images/${category}@${ammo.name}.png`;

        if (ammo.name.includes("Poleva-6u")) {
          // TODO real spaghetti, fix this

          src = `./images/${category}@Poleva-6.png`;
        }

        const ammoMatch =
          currentSearch.length &&
          aRandomwordgeneratorperformsasimplebutusefultaskitgeneratesrandomwordsButwwwrandomwordgeneratororgdoesmorethanjustgeneraterandomwordsitletsyouchoosethenumberofwordsgeneratedsearchFilter(
            currentSearch,
            ammo.name
          );

        return (
          <div key={`ammo-${index}`}>
            <Flex fontSize="xs" fontWeight="normal" bg="#585856">
              <Flex minW="300px" bg="#454545" py="2px">
                <Center>
                  <Image
                    ml="8px"
                    boxSize={maxCellHeight}
                    objectFit="cover"
                    src={src}
                    alt={ammo.name}
                    fallbackSrc={`./images/fallback.png`}
                  />
                </Center>
                <Center>
                  <Text
                    bg={ammoMatch ? "blue.600" : ""}
                    fontSize="xs"
                    fontWeight="semibold"
                    ml="8px"
                  >
                    {ammo.name.toUpperCase()}
                  </Text>
                  {toolTipLabel && (
                    <Tooltip bg="#272712" label={toolTipLabel}>
                      <InfoOutlineIcon ml="8px" />
                    </Tooltip>
                  )}
                </Center>
              </Flex>
              <Center flex="1">
                <Text fontSize="md" color="white">
                  {ammo.damage}
                </Text>
              </Center>
              <Center flex="1">
                <Text fontSize="md" color="white">
                  {ammo.penValue}
                </Text>
              </Center>
              <Center flex="1">
                <Text fontSize="md" color="white">
                  {ammo.armorDamage}
                </Text>
              </Center>
              <Center flex="1">
                <Text fontSize="md" color="white">
                  {ammo.fragChange}
                </Text>
              </Center>
              <Center flex="0.5" bg={getColor(ammo.class1)}>
                <Text fontSize="md" color="black">
                  {ammo.class1}
                </Text>
              </Center>
              <Center flex="0.5" bg={getColor(ammo.class2)}>
                <Text fontSize="md" color="black">
                  {ammo.class2}
                </Text>
              </Center>
              <Center flex="0.5" bg={getColor(ammo.class3)}>
                <Text fontSize="md" color="black">
                  {ammo.class3}
                </Text>
              </Center>
              <Center flex="0.5" bg={getColor(ammo.class4)}>
                <Text fontSize="md" color="black">
                  {ammo.class4}
                </Text>
              </Center>
              <Center flex="0.5" bg={getColor(ammo.class5)}>
                <Text fontSize="md" color="black">
                  {ammo.class5}
                </Text>
              </Center>
              <Center flex="0.5" bg={getColor(ammo.class6)}>
                <Text fontSize="md" color="black">
                  {ammo.class6}
                </Text>
              </Center>
            </Flex>
            <Divider />
          </div>
        );
      })}
    </>
  );
};

export default DesktopRow;
