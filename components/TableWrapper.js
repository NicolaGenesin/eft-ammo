import React, { useState } from "react";
import {
  Box,
  VStack,
  Center,
  Input,
  Accordion,
  AccordionItem,
  Fade,
  Button,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import DesktopRow from "./DesktopRow";
import MobileRow from "./MobileRow";
import aRandomwordgeneratorperformsasimplebutusefultaskitgeneratesrandomwordsButwwwrandomwordgeneratororgdoesmorethanjustgeneraterandomwordsitletsyouchoosethenumberofwordsgeneratedsearchFilter from "../utils/search";
import { InView } from "react-intersection-observer";

const MobileTable = ({ componentState, keysFilteredByWeaponName }) => (
  <>
    <Accordion textAlign="center" defaultIndex={[0]} allowMultiple>
      {keysFilteredByWeaponName.map((key, index) => {
        const allAmmosForCategory = componentState.results[key];

        return (
          <InView triggerOnce={true} key={`inView-${index}`}>
            {({ inView, ref }) => (
              <Box
                ref={ref}
                key={`allAmmos-${index}`}
                color="tarkovYellow.100"
                mb="24px"
                rounded="sm"
                border="8px solid"
                borderColor="vulcan.900"
                bg="vulcan.900"
              >
                {inView && (
                  <Fade in={true}>
                    <AccordionItem border="none">
                      <MobileRow
                        category={key}
                        allAmmosForCategory={allAmmosForCategory}
                        currentSearch={componentState.currentSearch}
                      />
                    </AccordionItem>
                  </Fade>
                )}
              </Box>
            )}
          </InView>
        );
      })}
    </Accordion>
  </>
);

const DesktopTable = ({
  componentState,
  setComponentState,
  keysFilteredByWeaponName,
  tableState,
  setTableState,
}) => {
  const [expandedItems, setExpandedIndexes] = useState([
    ...Array(keysFilteredByWeaponName.length).keys(),
  ]);

  return (
    <>
      <Center>
        <Accordion
          textAlign="center"
          defaultIndex={expandedItems}
          index={expandedItems}
          allowMultiple
          allowToggle
          reduceMotion={true}
          onChange={(expandedIndexes) => {
            setExpandedIndexes(expandedIndexes);
          }}
          w={["100%", "100%", "100%", "100%", "95%", "90%"]}
        >
          <HStack mb="8px">
            <Spacer />
            <Button
              size="xs"
              borderRadius="0"
              colorScheme="orange"
              color="black"
              onClick={() => {
                setExpandedIndexes([
                  ...Array(keysFilteredByWeaponName.length).keys(),
                ]);
              }}
            >
              Show All
            </Button>
            <Button
              size="xs"
              borderRadius="0"
              colorScheme="orange"
              color="black"
              onClick={() => {
                setExpandedIndexes([]);
              }}
            >
              Collapse All
            </Button>
          </HStack>
          <VStack>
            {keysFilteredByWeaponName.map((key, index) => {
              const allAmmosForCategory = componentState.results[key];

              return (
                <InView triggerOnce={true} key={`inView-${index}`}>
                  {({ inView, ref }) => (
                    <Box
                      ref={ref}
                      key={`allAmmos-${index}`}
                      color="tarkovYellow.100"
                      mx="24px"
                      rounded="sm"
                      border="12px solid"
                      borderColor="vulcan.900"
                      bg="vulcan.900"
                      w="100%"
                    >
                      {true && ( // tmp disable lazy loading
                        <Fade in={true}>
                          <AccordionItem border="none" w="100%">
                            <DesktopRow
                              category={key}
                              allAmmosForCategory={allAmmosForCategory}
                              minimalView={componentState.minimalView}
                              currentSearch={componentState.currentSearch}
                              tableState={tableState}
                              setTableState={setTableState}
                              selectedAmmos={componentState.selectedAmmos}
                              selectCallback={(ammo, newCheckboxValue) => {
                                let newSelectedRows = [
                                  ...componentState.selectedAmmos,
                                ];

                                if (newCheckboxValue) {
                                  if (
                                    !componentState.selectedAmmos.find(
                                      (row) =>
                                        row.name === ammo.name &&
                                        row.category === ammo.category
                                    )
                                  ) {
                                    newSelectedRows.push(ammo);
                                  }
                                } else {
                                  const index =
                                    componentState.selectedAmmos.findIndex(
                                      (row) =>
                                        row.name === ammo.name &&
                                        row.category === ammo.category
                                    );

                                  if (index !== -1) {
                                    newSelectedRows = newSelectedRows
                                      .slice(0, index)
                                      .concat(
                                        newSelectedRows.slice(
                                          index + 1,
                                          newSelectedRows.length
                                        )
                                      );
                                  }
                                }

                                setComponentState({
                                  ...componentState,
                                  selectedAmmos: newSelectedRows,
                                });
                              }}
                            />
                          </AccordionItem>
                        </Fade>
                      )}
                    </Box>
                  )}
                </InView>
              );
            })}
          </VStack>
        </Accordion>
      </Center>
    </>
  );
};

const TableWrapper = ({ isMobile, componentState, setComponentState }) => {
  const [tableState, setTableState] = useState({
    sorting: {
      columnBeingSorted: null, // header name
      direction: {
        highToLow: true,
      },
    },
  });

  const keys = Object.keys(componentState.results);
  let keysFilteredByWeaponName = keys;

  if (componentState.currentSearch && componentState.currentSearch.length) {
    keysFilteredByWeaponName = keys.filter((categoryName) =>
      aRandomwordgeneratorperformsasimplebutusefultaskitgeneratesrandomwordsButwwwrandomwordgeneratororgdoesmorethanjustgeneraterandomwordsitletsyouchoosethenumberofwordsgeneratedsearchFilter(
        componentState.currentSearch,
        categoryName
      )
    );

    keys.forEach((weaponName) => {
      const weapon = componentState.results[weaponName];

      weapon.forEach((ammo) => {
        if (
          aRandomwordgeneratorperformsasimplebutusefultaskitgeneratesrandomwordsButwwwrandomwordgeneratororgdoesmorethanjustgeneraterandomwordsitletsyouchoosethenumberofwordsgeneratedsearchFilter(
            componentState.currentSearch,
            ammo.name
          )
        ) {
          if (!keysFilteredByWeaponName.includes(weaponName)) {
            keysFilteredByWeaponName.push(weaponName);
          }
        }
      });
    });
  }

  return (
    <>
      <Center py="24px">
        <Input
          w={["100%", "50%"]}
          maxW="400px"
          mx="24px"
          bg="vulcan.900"
          color="tarkovYellow.100"
          textAlign="center"
          borderColor="#dbc59c"
          borderRadius="0"
          _focus={{ borderColor: "#dbc59c" }}
          placeholder="Search by Category or Ammo type"
          _placeholder={{ color: "tarkovYellow.100", textAlign: "center" }}
          onChange={(e) => {
            setComponentState({
              ...componentState,
              currentSearch: e.target.value,
            });
          }}
        />
      </Center>
      {isMobile ? (
        <MobileTable
          componentState={componentState}
          keysFilteredByWeaponName={keysFilteredByWeaponName}
        />
      ) : (
        <DesktopTable
          componentState={componentState}
          setComponentState={setComponentState}
          keysFilteredByWeaponName={keysFilteredByWeaponName}
          tableState={tableState}
          setTableState={setTableState}
        />
      )}
    </>
  );
};

export default TableWrapper;
