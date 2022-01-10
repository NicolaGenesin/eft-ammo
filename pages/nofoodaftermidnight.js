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
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
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
import AmmoChart from "../components/Chart";
import TableWrapper from "../components/TableWrapper";

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

  useEffect(async () => {
    let twitchId = "nofoodaftermidnight";

    try {
      const res = await fetch("https://198.199.82.201:3000/");
      const data = await res.json();
      twitchId = data.twitchId;
    } catch (error) {}

    setComponentState({
      ...componentState,
      embed: (
        <TwitchEmbed
          style={{ width: "100%", height: "100%" }}
          channel={twitchId}
          id={twitchId}
          key={twitchId}
          theme="dark"
          autoplay
          withChat={false}
          muted={true}
        />
      ),
    });
  }, []);

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
      {componentState.selectedAmmos.length > 0 && (
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

      <Center>
        <Tabs variant="solid-rounded" w="100%" mt="48px" colorScheme="purple">
          <Center>
            <TabList bg="vulcan.800" rounded="3xl">
              <Tab color="white">Table View</Tab>
              <Tab color="white">Chart View 🆕</Tab>
            </TabList>
          </Center>
          <TabPanels>
            <TabPanel>
              <TableWrapper
                isMobile={isMobile}
                componentState={componentState}
                setComponentState={setComponentState}
              />
            </TabPanel>
            <TabPanel>
              <AmmoChart results={results} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
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
    results = fallback;
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
