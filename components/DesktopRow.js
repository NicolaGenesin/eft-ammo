import {
  Tooltip,
  Divider,
  Flex,
  Center,
  Checkbox,
  Box,
  VStack,
  Text,
  HStack,
  useBreakpointValue,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Spacer,
  Link,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { GiAk47 } from "react-icons/gi";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { getColor, getRecoilColor } from "../utils/getColor";
import headers from "../utils/headers";
import aRandomwordgeneratorperformsasimplebutusefultaskitgeneratesrandomwordsButwwwrandomwordgeneratororgdoesmorethanjustgeneraterandomwordsitletsyouchoosethenumberofwordsgeneratedsearchFilter from "../utils/search";
import gunsData from "../utils/gunsData";

const DesktopRow = ({
  category,
  allAmmosForCategory,
  minimalView,
  currentSearch,
  tableState,
  setTableState,
  selectCallback,
  selectedAmmos,
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

  const gunsForCategory = gunsData.guns
    .filter((gun) => gun.category === gunsData.categoriesMapping[category])
    .map((gun, index) => {
      return (
        <Text key={`gun-${index}`} fontSize="xs">
          ■ {gun.name}
        </Text>
      );
    });

  const sortedAmmos = [...allAmmosForCategory];

  if (tableState && tableState.sorting.columnBeingSorted) {
    const columnBeingSorted = tableState.sorting.columnBeingSorted;

    if (tableState.sorting.direction.highToLow) {
      sortedAmmos.sort((a, b) => {
        if (b[columnBeingSorted] == "") {
          return -1;
        } else if (a[columnBeingSorted] == "") {
          return 1;
        } else if (a[columnBeingSorted] == "" && b[columnBeingSorted] == "") {
          return 0;
        }

        return parseInt(b[columnBeingSorted]) - parseInt(a[columnBeingSorted]);
      });
    } else {
      sortedAmmos.sort((a, b) => {
        if (b[columnBeingSorted] == "") {
          return 1;
        } else if (a[columnBeingSorted] == "") {
          return -1;
        } else if (a[columnBeingSorted] == "" && b[columnBeingSorted] == "") {
          return 0;
        }

        return parseInt(a[columnBeingSorted]) - parseInt(b[columnBeingSorted]);
      });
    }
  }

  const useVerticalHeaders = useBreakpointValue({ base: true, lg: false });

  return (
    <Box>
      <AccordionButton p="0" _focus={{ boxShadow: "none" }}>
        <AccordionIcon ml="8px" />
        <Tooltip
          bg="#272712"
          label={
            gunsForCategory.length ? (
              <VStack py="8px" px="4px" align="left">
                <Text fontWeight="bold">Used by</Text>
                {gunsForCategory}
              </VStack>
            ) : null
          }
        >
          <Flex style={{ zIndex: 1 }}>
            <Text
              pl="8px"
              fontWeight="bold"
              fontSize="xl"
              bg={categoryMatch ? "blue.600" : ""}
            >
              {category}
            </Text>
            <Center ml="8px">
              {gunsForCategory.length ? <GiAk47 mb="2px" size="20" /> : null}
            </Center>
          </Flex>
        </Tooltip>
      </AccordionButton>
      <AccordionPanel pt={2} pb={0} px={0} mt="-32px" style={{ zIndex: 1 }}>
        <>
          <Flex>
            <Box h={maxCellHeight} minW="310px" />
            {Object.keys(headers).map((headerLabel, index) => {
              const headerProperty = headers[headerLabel];
              const isSortable = index < 5 && tableState;
              let toolTipLabel = "";

              if (index === 12) {
                toolTipLabel =
                  "Flea market prices provided by tarkov-tools.com";
              } else if (index === 5) {
                toolTipLabel = "Maximum Headshot Distance.";
              } else if (index === 4) {
                toolTipLabel =
                  "Effective Distance is the distance when the bullet has lost 25% of its damage and penetration.";
              } else if (index === 3) {
                toolTipLabel = "Recoil Index.";
              } else if (index === 2) {
                toolTipLabel =
                  "The chance a bullet will fragment, splitting into pieces on hit and essentially dealing 50% extra damage. Note that fragmentation chance is currently bugged, and chances will be lower than their chance implies, and any ammo with less than 20 pen value will be completely unable to fragment.";
              } else if (index === 1) {
                toolTipLabel =
                  "A value used to determine how well a bullet penetrates armor and how much durability damage it does to armor, the higher the better.";
              } else if (index === 0) {
                toolTipLabel = "This is how much health damage a bullet does.";
              } else {
                toolTipLabel = `Bullet effectiveness against armor ${headerLabel}`;
              }

              return (
                <Center
                  flex={index >= 6 && index < 12 ? "0.5" : "1"}
                  bg="vulcan.800"
                  key={`header-${index}`}
                  fontWeight="semibold"
                  fontSize="xs"
                  textAlign="center"
                >
                  {toolTipLabel ? (
                    <Tooltip bg="#272712" label={toolTipLabel}>
                      <Text
                        maxH="60px"
                        style={
                          useVerticalHeaders
                            ? {
                                writingMode: "vertical-rl",
                                textOrientation: "mixed",
                                paddingTop: "4px",
                                paddingBottom: "4px",
                              }
                            : {}
                        }
                      >
                        {headerLabel.toUpperCase()}
                      </Text>
                    </Tooltip>
                  ) : (
                    <Text>{headerLabel.toUpperCase()}</Text>
                  )}
                  {isSortable && (
                    <Box ml="4px">
                      <TiArrowSortedUp
                        onClick={() => {
                          setTableState({
                            ...tableState,
                            sorting: {
                              columnBeingSorted: headerProperty,
                              direction: {
                                highToLow: false,
                              },
                            },
                          });
                        }}
                      />
                      <TiArrowSortedDown
                        onClick={() => {
                          setTableState({
                            ...tableState,
                            sorting: {
                              columnBeingSorted: headerProperty,
                              direction: {
                                highToLow: true,
                              },
                            },
                          });
                        }}
                      />
                    </Box>
                  )}
                </Center>
              );
            })}
          </Flex>
          {sortedAmmos.map((ammo, index) => {
            let toolTipLabel = undefined;

            if (ammo.note) {
              toolTipLabel = ammo.note;
            } else if (ammo.secondNote) {
              toolTipLabel = ammo.secondNote;
            } else if (ammo.note && ammo.secondNote) {
              toolTipLabel = `${ammo.note} ${ammo.secondNote}`;
            }

            let imagePath = `${category || ammo.category}@${ammo.name}`;

            if (ammo.name.includes("Poleva-6u")) {
              // TODO real spaghetti, fix this

              imagePath = `${category || ammo.category}@Poleva-6`;
            }

            const imageURL = `/images/${imagePath}.webp`;
            const fallbackImageURL = `/images-fallback/${imagePath}.jpeg`;

            const ammoMatch =
              currentSearch.length &&
              aRandomwordgeneratorperformsasimplebutusefultaskitgeneratesrandomwordsButwwwrandomwordgeneratororgdoesmorethanjustgeneraterandomwordsitletsyouchoosethenumberofwordsgeneratedsearchFilter(
                currentSearch,
                ammo.name
              );

            const isChecked =
              selectedAmmos.find(
                (item) =>
                  item.name === ammo.name && item.category === ammo.category
              ) !== undefined;

            let ammoPrice;
            let tarkovItemLink;

            if (ammo.price) {
              ammoPrice = `${ammo.price} ₽`;
            }

            if (ammo.standard && ammo.standard.name) {
              tarkovItemLink = `https://tarkov-tools.com/item/${ammo.standard.normalizedName}`;
            }

            let recoil = "";

            if (ammo.recoil !== "") {
              if (ammo.recoil > 0) {
                recoil = `${ammo.recoil}% ▲`;
              } else if (ammo.recoil < 0) {
                recoil = `${ammo.recoil}% ▼`;
              } else {
                recoil = `${ammo.recoil}%`;
              }
            }

            return (
              <div key={`ammo-${index}`}>
                <Flex
                  fontSize="md"
                  fontWeight="normal"
                  bg={index % 2 === 0 ? "vulcan.900" : "vulcan.850"}
                >
                  <HStack minW="310px" bg="vulcan.800" py="2px" pr="8px">
                    {selectCallback && (
                      <Checkbox
                        borderColor="tarkovYellow.100"
                        colorScheme="orange"
                        size="lg"
                        ml="8px"
                        isChecked={isChecked}
                        onChange={(e) => {
                          selectCallback(ammo, e.target.checked);
                        }}
                      />
                    )}
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
                        width={maxCellHeight}
                        height={maxCellHeight}
                        src={encodeURIComponent(fallbackImageURL)}
                        alt={ammo.name}
                        loading="lazy"
                      />
                    </picture>
                    <Center
                      bg={ammoMatch ? "blue.600" : ""}
                      fontSize="xs"
                      fontWeight="semibold"
                      ml="8px"
                    >
                      {ammo.name.toUpperCase()}
                      {toolTipLabel && (
                        <Tooltip bg="#272712" label={toolTipLabel}>
                          <InfoOutlineIcon ml="8px" />
                        </Tooltip>
                      )}
                    </Center>
                    <Spacer />
                    {ammo.notAvailableOnFleaMarket && (
                      <Tooltip
                        bg="#272712"
                        label={
                          "This Ammo type is not available on Flea Market."
                        }
                      >
                        <Text
                          color="tomato"
                          fontSize="xs"
                          fontWeight="bold"
                          textAlign="center"
                        >
                          No F. M.
                        </Text>
                      </Tooltip>
                    )}
                  </HStack>
                  <Center flex="1" color="tarkovYellow.100">
                    {ammo.damage}
                  </Center>
                  <Center flex="1" color="tarkovYellow.100">
                    {ammo.penValue}
                  </Center>
                  <Center flex="1" color="tarkovYellow.100">
                    {ammo.fragChange}
                  </Center>
                  <Center flex="1" color={getRecoilColor(ammo.recoil)}>
                    {recoil}
                  </Center>
                  <Center flex="1" color="tarkovYellow.100">
                    {ammo.effDist}
                  </Center>
                  <Center flex="1" color="tarkovYellow.100">
                    {ammo.maxHsDist}
                  </Center>
                  <Center flex="0.5" bg={getColor(ammo.class1)} color="black">
                    {ammo.class1}
                  </Center>
                  <Center flex="0.5" bg={getColor(ammo.class2)} color="black">
                    {ammo.class2}
                  </Center>
                  <Center flex="0.5" bg={getColor(ammo.class3)} color="black">
                    {ammo.class3}
                  </Center>
                  <Center flex="0.5" bg={getColor(ammo.class4)} color="black">
                    {ammo.class4}
                  </Center>
                  <Center flex="0.5" bg={getColor(ammo.class5)} color="black">
                    {ammo.class5}
                  </Center>
                  <Center flex="0.5" bg={getColor(ammo.class6)} color="black">
                    {ammo.class6}
                  </Center>
                  <Center flex="1" color="tarkovYellow.100">
                    <Link
                      href={tarkovItemLink}
                      isExternal
                      style={{ textDecoration: "underline" }}
                    >
                      {ammoPrice || "-"}
                    </Link>
                  </Center>
                </Flex>
                <Divider style={{ opacity: "0.2" }} />
              </div>
            );
          })}
        </>
      </AccordionPanel>
    </Box>
  );
};

export default DesktopRow;
