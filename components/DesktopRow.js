import {
  Tooltip,
  Divider,
  Flex,
  Center,
  Checkbox,
  Box,
  VStack,
  Text,
  useBreakpointValue,
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
      sortedAmmos.sort(
        (a, b) =>
          parseInt(b[columnBeingSorted]) - parseInt(a[columnBeingSorted])
      );
    } else {
      sortedAmmos.sort(
        (a, b) =>
          parseInt(a[columnBeingSorted]) - parseInt(b[columnBeingSorted])
      );
    }
  }

  const useVerticalHeaders = useBreakpointValue({ base: true, lg: false });

  return (
    <>
      <Flex>
        <Box
          h={maxCellHeight}
          mb="4px"
          textAlign="left"
          fontWeight="bold"
          minW="300px"
          fontSize="xl"
          px="8px"
          style={{
            whiteSpace: "nowrap",
          }}
          bg={categoryMatch ? "blue.600" : ""}
        >
          {
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
              <Flex>
                {category}
                <Center ml="8px">
                  {gunsForCategory.length ? (
                    <GiAk47 mb="2px" size="20" />
                  ) : null}
                </Center>
              </Flex>
            </Tooltip>
          }
        </Box>
        {Object.keys(headers).map((headerLabel, index) => {
          const headerProperty = headers[headerLabel];
          const isSortable = index < 6 && tableState;
          let toolTipLabel = "";

          if (index === 6) {
            toolTipLabel = "Maximum Headshot Distance";
          } else if (index === 5) {
            toolTipLabel = "Effective Distance";
          } else if (index === 4) {
            toolTipLabel = "Recoil Index";
          } else if (index === 3) {
            toolTipLabel =
              "The chance a bullet will fragment, splitting into pieces on hit and essentially dealing 50% extra damage. Note that fragmentation chance is currently bugged, and chances will be lower than their chance implies, and any ammo with less than 20 pen value will be completely unable to fragment.";
          } else if (index === 2) {
            toolTipLabel =
              "A modifier used in calculating durability damage, the higher the better.";
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
              flex={headerLabel.toLowerCase().includes("class") ? "0.5" : "1"}
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
            (item) => item.name === ammo.name && item.category === ammo.category
          ) !== undefined;

        return (
          <div key={`ammo-${index}`}>
            <Flex fontSize="md" fontWeight="normal">
              <Flex minW="300px" bg="vulcan.800" py="2px">
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
              </Flex>
              <Center flex="1" color="tarkovYellow.100">
                {ammo.damage}
              </Center>
              <Center flex="1" color="tarkovYellow.100">
                {ammo.penValue}
              </Center>
              <Center flex="1" color="tarkovYellow.100">
                {ammo.fragChange}
              </Center>
              <Center flex="1" bg={getRecoilColor(ammo.recoil)} color="black">
                {ammo.recoil}
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
            </Flex>
            <Divider style={{ opacity: "0.2" }} />
          </div>
        );
      })}
    </>
  );
};

export default DesktopRow;
