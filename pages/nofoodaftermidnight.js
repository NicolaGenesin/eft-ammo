import React, { useState, useEffect } from "react";
import Head from "next/head";
import { HStack, useBreakpointValue, VStack } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  Flex,
  Center,
  Text,
  Box,
  Input,
  Checkbox,
} from "@chakra-ui/react";
import getResults from "../utils/getResults";
import Legenda from "../components/Legenda";
import MobileRow from "../components/MobileRow";
import DesktopRow from "../components/DesktopRow";
import { SocialButton } from "../components/SmallFooterWithSocial";
import { FaTwitch } from "react-icons/fa";
import fallback from "../utils/fallback";
import aRandomwordgeneratorperformsasimplebutusefultaskitgeneratesrandomwordsButwwwrandomwordgeneratororgdoesmorethanjustgeneraterandomwordsitletsyouchoosethenumberofwordsgeneratedsearchFilter from "../utils/search";
import { TwitchEmbed } from "react-twitch-embed";
import CompareButton from "../components/CompareButton";
import CompareModal from "../components/CompareModal";
import AmmoChart from "../components/AmmoChart";

const App = ({ results, isFallback }) => {
  const [componentState, setComponentState] = useState({
    currentSearch: "",
    results,
    minimalView: true,
    embed: null,
    selectedAmmos: [], // each element is an ammo object
    showModal: false,
  });

  console.log("isFallback", isFallback);

  const isMobile = useBreakpointValue({ base: true, md: false });
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

  useEffect(() => {
    setComponentState({
      ...componentState,
      embed: (
        <TwitchEmbed
          style={{ width: "100%", height: "100%" }}
          channel={"nofoodaftermidnight"}
          id={"nofoodaftermidnight"}
          key={"nofoodaftermidnight"}
          theme="dark"
          autoplay
          withChat={false}
          muted={true}
        />
      ),
    });
  }, []);

  const MobileTable = () => (
    <>
      <Accordion textAlign="center" defaultIndex={[0]} allowMultiple>
        {keysFilteredByWeaponName.map((key, index) => {
          const allAmmosForCategory = componentState.results[key];

          return (
            <Box
              key={`allAmmos-${index}`}
              color="#ebece8"
              mx="8px"
              mb="24px"
              rounded="sm"
              border="12px solid"
              borderColor="vulcan.900"
              bg="vulcan.900"
            >
              <AccordionItem>
                <MobileRow
                  category={key}
                  allAmmosForCategory={allAmmosForCategory}
                  currentSearch={componentState.currentSearch}
                />
              </AccordionItem>
            </Box>
          );
        })}
      </Accordion>
    </>
  );

  const DesktopTable = () => (
    <>
      <Center>
        <VStack
          w={
            componentState.minimalView
              ? ["100%", "100%", "100%", "100%", "85%", "75%"]
              : "100%"
          }
        >
          {keysFilteredByWeaponName.map((key, index) => {
            const allAmmosForCategory = componentState.results[key];

            return (
              <Box
                key={`allAmmos-${index}`}
                color="#ebece8"
                mx="24px"
                mb="24px"
                rounded="sm"
                border="12px solid"
                borderColor="vulcan.900"
                bg="vulcan.900"
                w="100%"
              >
                <DesktopRow
                  category={key}
                  allAmmosForCategory={allAmmosForCategory}
                  minimalView={componentState.minimalView}
                  currentSearch={componentState.currentSearch}
                  selectedAmmos={componentState.selectedAmmos}
                  selectCallback={(ammo, newCheckboxValue) => {
                    let newSelectedRows = [...componentState.selectedAmmos];

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
                      const index = componentState.selectedAmmos.findIndex(
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
              </Box>
            );
          })}
        </VStack>
      </Center>
    </>
  );

  return (
    <Box py="48px">
      <Head>
        <title>EFT | Ammo and Armor Charts</title>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="description"
          content="Escape from Tarkov Ammo and Armor Charts created by NoFoodAfterMidnight 🙌"
        />

        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemProp="name" content="eft-ammo.com 🎮" />
        <meta
          itemProp="description"
          content="Escape from Tarkov Ammo and Armor Charts created by NoFoodAfterMidnight 🙌"
        />
        <meta itemProp="image" content="http://eft-ammo.com/assets/og-01.jpg" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://eft-ammo.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="eft-ammo.com 🎮" />
        <meta
          property="og:description"
          content="Escape from Tarkov Ammo and Armor Charts created by NoFoodAfterMidnight 🙌"
        />
        <meta name="og:image" content="http://eft-ammo.com/assets/og-01.jpg" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="eft-ammo.com" />
        <meta property="twitter:url" content="https://eft-ammo.com/" />
        <meta name="twitter:title" content="eft-ammo.com 🎮" />
        <meta
          name="twitter:description"
          content="Escape from Tarkov Ammo and Armor Charts created by NoFoodAfterMidnight 🙌"
        />
        <meta
          name="twitter:image"
          content="http://eft-ammo.com/assets/og-01.jpg"
        />
      </Head>
      <Box h="100vh">
        <AmmoChart results={results} />
      </Box>
      {componentState.selectedAmmos.length && (
        <CompareButton
          showModal={() => {
            setComponentState({
              ...componentState,
              showModal: true,
            });
          }}
        />
      )}
      {componentState.showModal && (
        <CompareModal
          selectedAmmos={componentState.selectedAmmos}
          onClose={() => {
            setComponentState({
              ...componentState,
              showModal: false,
            });
          }}
        />
      )}
      <Center mb="24px">
        <VStack>
          <Text
            textAlign="center"
            color="#ebece8"
            fontWeight="bold"
            fontSize={["xl", "3xl"]}
            mt="24px"
            as="h1"
          >
            Escape from Tarkov Ammo and Armor Charts
          </Text>
          <Text color="#ebece8" fontSize="sm">
            Updated for v0.12.12
          </Text>
          <HStack>
            <Center>
              <Text
                textAlign="center"
                color="#ebece8"
                fontWeight="bold"
                fontSize={["lg", "2xl"]}
                as="h1"
              >
                <a href="https://www.twitch.tv/nofoodaftermidnight/">
                  by{" "}
                  <span
                    style={{
                      backgroundImage:
                        "linear-gradient(120deg, purple 0%, purple 100%)",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100% 0.4em",
                      backgroundPosition: "0 88%",
                      transition: "background-size 0.25s ease-in",
                    }}
                  >
                    NoFoodAfterMidnight
                  </span>{" "}
                  | watch his stream{" "}
                  <span
                    style={{
                      backgroundImage:
                        "linear-gradient(120deg, purple 0%, purple 100%)",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100% 0.4em",
                      backgroundPosition: "0 88%",
                      transition: "background-size 0.25s ease-in",
                    }}
                  >
                    here
                  </span>
                </a>
              </Text>
            </Center>
            {!isMobile && (
              <SocialButton
                size={16}
                label={"Twitch"}
                href={"https://www.twitch.tv/nofoodaftermidnight/"}
              >
                <FaTwitch color="purple" size={32} />
              </SocialButton>
            )}
          </HStack>
          {isMobile && (
            <SocialButton
              size={12}
              label={"Twitch"}
              href={"https://www.twitch.tv/nofoodaftermidnight/"}
            >
              <FaTwitch color="purple" size={24} />
            </SocialButton>
          )}
        </VStack>
      </Center>

      <Center>
        <Flex pt="24px" px="8px" w={["100%", "75%"]}>
          <Legenda isDesktop={!isMobile} />
        </Flex>
      </Center>

      <Center py="64px">
        <Input
          w={["100%", "50%"]}
          mx="24px"
          bg="#fff"
          color="#333"
          textAlign="center"
          borderColor="#9a8866"
          _focus={{ borderColor: "#9a8866" }}
          placeholder="Search by Category or Ammo type"
          _placeholder={{ color: "#333", textAlign: "center" }}
          onChange={(e) => {
            setComponentState({
              ...componentState,
              currentSearch: e.target.value,
            });
          }}
        />
      </Center>
      {!isMobile && (
        <Center>
          <Checkbox
            m="24px"
            fontWeight="bold"
            size="sm"
            onChange={(e) =>
              setComponentState({
                ...componentState,
                minimalView: !componentState.minimalView,
              })
            }
            color={"#ebece8"}
            isChecked={componentState.minimalView}
          >
            Minimal Table View
          </Checkbox>
        </Center>
      )}
      {isMobile ? <MobileTable /> : <DesktopTable />}
      <Center>
        <Box
          w={["375px", "450px", "600px"]}
          h={["300px", "400px", "400px"]}
          pt="48px"
          pb="64px"
        >
          <Text
            textAlign="center"
            color="white"
            fontWeight="bold"
            fontSize={["lg", "2xl"]}
            as="h2"
            mb="8px"
          >
            <a href="https://www.twitch.tv/nofoodaftermidnight/">
              Watch NoFoodAfterMidnight's stream here:
            </a>
          </Text>
          {componentState.embed}
        </Box>
      </Center>
      <style jsx global>{`
        html,
        body {
          background: #131313 !important;

          height: 100%;
          width: 100%;

          background-position: center;
          background-size: cover;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </Box>
  );
};

export async function getStaticProps() {
  let results;
  let isFallback = false;

  try {
    results = await (await getResults()).json();
  } catch (error) {
    results = fallback;
    isFallback = true;

    console.log("\n\n\n******************************");
    console.log(
      "\nWarning - Issue with API or not reachable, using fallback\n"
    );
    console.log("******************************\n\n\n");
  }

  return {
    props: {
      results,
      isFallback,
    },
    revalidate: 900,
  };
}

export default App;
