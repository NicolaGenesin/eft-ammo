import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  HStack,
  Link,
  Spacer,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import {
  Flex,
  Center,
  Text,
  Box,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import getResults from "../utils/getResults";
import Legenda from "../components/Legenda";
import { SocialButton } from "../components/SmallFooterWithSocial";
import { FaTwitch } from "react-icons/fa";
import fallback from "../utils/fallback";
import { TwitchEmbed } from "react-twitch-embed";
import CompareButton from "../components/CompareButton";
import CompareModal from "../components/CompareModal";
import TableWrapper from "../components/TableWrapper";
import ChartWrapper from "../components/ChartWrapper";
import TradersResetTimers from "../components/TradersResetTimers";

const App = ({ results, isFallback }) => {
  const [componentState, setComponentState] = useState({
    currentSearch: "",
    results,
    minimalView: true,
    embed: (
      <Center color="tarkovYellow.100">
        <Box w={["375px", "450px", "600px"]}>
          <Skeleton h="300px" />
          <Center p="8px">
            <Text fontSize="sm">Loading Stream...</Text>
          </Center>
        </Box>
      </Center>
    ),
    selectedAmmos: [], // each element is an ammo object
    showModal: false,
  });

  console.log("isFallback", isFallback);

  const isMobile = useBreakpointValue({ base: true, md: false });
  const isLargeScreen = useBreakpointValue({ base: false, xl: true });

  useEffect(async () => {
    let twitchId = "nofoodaftermidnight";

    setTimeout(async () => {
      try {
        const res = await fetch(
          "https://eft-ammo-embed-j5r9q.ondigitalocean.app/"
        );
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
    }, 1000);
  }, []);

  return (
    <Box>
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
      <Box py="48px">
        <Center mb="24px">
          <VStack>
            <Text
              textAlign="center"
              color="tarkovYellow.100"
              fontWeight="bold"
              fontSize={["xl", "3xl"]}
              mt="24px"
              as="h1"
            >
              Escape from Tarkov Ammo and Armor Charts
            </Text>
            <Text color="tarkovYellow.100" fontSize="sm">
              Updated for v0.12.12
            </Text>
            <HStack>
              <Center>
                <Text
                  textAlign="center"
                  color="tarkovYellow.100"
                  fontWeight="bold"
                  fontSize={["lg", "2xl"]}
                  as="h1"
                >
                  <a href="https://www.twitch.tv/nofoodaftermidnight/">
                    by{" "}
                    <span
                      style={{
                        backgroundImage:
                          "linear-gradient(120deg, #a15422 0%, #a15422 100%)",
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
                          "linear-gradient(120deg, #a15422 0%, #a15422 100%)",
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
                  <FaTwitch color="#a15422" size={32} />
                </SocialButton>
              )}
            </HStack>
            {isMobile && (
              <SocialButton
                size={12}
                label={"Twitch"}
                href={"https://www.twitch.tv/nofoodaftermidnight/"}
              >
                <FaTwitch color="orange" size={24} />
              </SocialButton>
            )}
          </VStack>
        </Center>

        {isLargeScreen && (
          <HStack>
            <Spacer />
            <Link
              href="/builder"
              isExternal={true}
              style={{ textDecoration: "none" }}
            >
              <Button
                style={{ transform: "rotate(45deg)" }}
                colorScheme="orange"
                borderRadius="0"
                color="black"
                size="lg"
              >
                ⚙️ Want to try our simple
                <br />
                [beta] loadout builder? 👷
              </Button>
            </Link>
          </HStack>
        )}

        <Center>
          <Link
            href="https://forms.gle/ToTmLYiWoxuGsM2R6"
            isExternal={true}
            style={{ textDecoration: "none" }}
          >
            <Button
              colorScheme="orange"
              borderRadius="0"
              color="black"
              size="lg"
            >
              🛠️ Feedback or Ideas? 🛠️
            </Button>
          </Link>
        </Center>

        <Center>
          <Flex pt="24px" px="8px" w={["100%", "75%"]}>
            <Legenda isDesktop={!isMobile} />
          </Flex>
        </Center>

        <Center>
          <Tabs variant="unstyled" w="100%" mt="48px" size="lg">
            <Center>
              <TabList bg="vulcan.800">
                <Tab
                  fontWeight="bold"
                  color="tarkovYellow.100"
                  _selected={{ color: "black", bg: "orange.500" }}
                >
                  Table View
                </Tab>
                <Tab
                  fontWeight="bold"
                  color="tarkovYellow.100"
                  _selected={{ color: "black", bg: "orange.500" }}
                >
                  ⚠️ Chart View 🆕
                </Tab>
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
                <ChartWrapper results={results} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Center>

        <TradersResetTimers />

        <Center>
          <Box
            w={["375px", "450px", "600px"]}
            h={["300px", "400px", "400px"]}
            pt="48px"
            pb="64px"
          >
            <Text
              textAlign="center"
              color="tarkovYellow.100"
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
      </Box>
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
    revalidate: 7200,
  };
}

export default App;
