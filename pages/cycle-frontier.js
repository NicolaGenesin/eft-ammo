import React, { useState, useEffect } from "react";
import { url } from "../utils/env";
import Head from "next/head";
import {
  HStack,
  Skeleton,
  useBreakpointValue,
  VStack,
  Flex,
  Center,
  Text,
  Box,
} from "@chakra-ui/react";

import Legenda from "../components/Legenda";
import { SocialButton } from "../components/SmallFooterWithSocial";
import { FaTwitch } from "react-icons/fa";
import fallback from "../utils/fallback";
import { TwitchEmbed } from "react-twitch-embed";
import CompareButton from "../components/CompareButton";
import CompareModal from "../components/CompareModal";
import TableWrapper from "../components/cycle/TableWrapper";

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

  useEffect(async () => {
    let twitchId = "nofoodaftermidnight";

    setTimeout(async () => {
      try {
        const res = await fetch(
          "https://eft-ammo-embed-j5r9q.ondigitalocean.app/"
        );
        const data = await res.json();
        twitchId = data.twitchId;
      } catch (error) { }

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

  const rotation = useBreakpointValue({ base: "0", md: "10", lg: "15" });
  const customTransform = { transform: `rotate(${rotation}deg)` };

  return (
    <Box>
      <Head>
        <title>The Cycle: Frontier | Ammo and Armor Charts</title>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="description"
          content="The Cycle: Frontier Ammo and Armor Charts created by NoFoodAfterMidnight ????"
        />

        {/* <!-- Google / Search Engine Tags --> */}
        <meta
          itemProp="name"
          content="eft-ammo.com ???? | The definitive Tarkov Ammo charts"
        />
        <meta
          itemProp="description"
          content="The Cycle: Frontier Ammo and Armor Charts created by NoFoodAfterMidnight ????"
        />
        <meta itemProp="image" content="http://eft-ammo.com/assets/og-01.jpg" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://eft-ammo.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="eft-ammo.com ???? | The definitive The Cycle: Frontier Ammo charts"
        />
        <meta
          property="og:description"
          content="The Cycle: Frontier Ammo and Armor Charts created by NoFoodAfterMidnight ????"
        />
        <meta name="og:image" content="http://eft-ammo.com/assets/og-01.jpg" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="eft-ammo.com" />
        <meta property="twitter:url" content="https://eft-ammo.com/" />
        <meta
          name="twitter:title"
          content="eft-ammo.com ???? | The definitive The Cycle: Frontier Ammo charts"
        />
        <meta
          name="twitter:description"
          content="The Cycle: Frontier Ammo and Armor Charts created by NoFoodAfterMidnight ????"
        />
        <meta
          name="twitter:image"
          content="http://eft-ammo.com/assets/og-01.jpg"
        />
      </Head>
      <Box pb="48px">
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
              The Cycle: Frontier Ammo and Armor Charts
            </Text>
            <HStack>
              <Center>
                <Text
                  textAlign="center"
                  color="tarkovYellow.100"
                  fontWeight="bold"
                  fontSize={["lg", "xl"]}
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
                  size={12}
                  label={"Twitch"}
                  href={"https://www.twitch.tv/nofoodaftermidnight/"}
                >
                  <FaTwitch color="#a15422" size={28} />
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
        <Center w="100%" mt="48px">
          <Box w="100%">
            <TableWrapper
              isMobile={isMobile}
              componentState={componentState}
              setComponentState={setComponentState}
            />
          </Box>
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
    </Box>
  );
};

const getResults = async () => {
  const results = fetch(`${url}/api/data-cycle`, {
    method: "GET",
  });

  return results;
};

export async function getStaticProps() {
  const results = await (await getResults()).json();

  return {
    props: {
      results,
    },
    revalidate: 900,
  };
}

export default App;
