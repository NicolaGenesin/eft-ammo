import React, { useState, useEffect } from "react";
import Head from "next/head";
import { TwitchEmbed } from "react-twitch-embed";
import {
  Divider,
  HStack,
  useBreakpointValue,
  VStack,
  Center,
  Text,
  Box,
  Skeleton,
  Wrap,
  Image,
} from "@chakra-ui/react";
import { SocialButton } from "../components/SmallFooterWithSocial";
import { FaTwitch } from "react-icons/fa";
import ReactPlayer from "react-player";

const values = {
  INSANE: {
    bg: "#ff8686",
    values: [
      "https://eft-ammo.com/%2Fimages-fallback%2F12%20Gauge%20Shot%40Flechette.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F5.45x39%20mm%407n40.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F7.62x39%20mm%40BP.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F7.62x51%20mm%40M62%20(Tracer).jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F7.62x51%20mm%40M61.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F7.62x51%20mm%40M993.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F12.7x55%20mm%40ps12b.jpeg",
    ],
  },
  GOOD: {
    bg: "#ffd587",
    values: [
      "https://eft-ammo.com/%2Fimages-fallback%2F9x19mm%40RIP.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F.45%40ACP%20AP.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F4.6x30%20mm%40Subsonic%20SX.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F4.6x30%20mm%40FMJ%20SX.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F7.62x39%20mm%40US.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F7.62x51%20mm%40M80.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F7.62x54R%40BT%20(Tracer).jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F7.62x54R%40SNB.jpeg",
    ],
  },
  DECENT: {
    bg: "#feef7e",
    values: [
      "https://eft-ammo.com/%2Fimages-fallback%2F9x19mm%40Quakemaker.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F.45%40ACP%20FMJ.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F5.7x28%20mm%40sb193.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F5.7x28%20mm%40ss190.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F4.6x30%20mm%40AP%20SX.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F9x39mm%40SP5.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F9x39mm%40PAB9.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F.366%40AP.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F5.45x39%20mm%40BS.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F5.56x45%20mm%40M855A1.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F.300%20blk%40AP.jpeg",
    ],
  },
  AVERAGE: {
    bg: "#feff74",
    values: [
      "https://eft-ammo.com/%2Fimages-fallback%2F12%20Gauge%20Slugs%40AP%2020%20Slug.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F9x19mm%40PBP.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F5.7x28%20mm%40r37f.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F9x39mm%40SP6.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F9x39mm%40SPP.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F9x39mm%40BP.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F5.45x39%20mm%40BT%20(Tracer).jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F5.56x45%20mm%40M856A1%20(Tracer).jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F5.56x45%20mm%40M995.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F7.62x54R%40PS.jpeg",
    ],
  },
  MEH: {
    bg: "#caff78",
    values: [
      "https://eft-ammo.com/%2Fimages-fallback%2F9x19mm%40AP%206.3.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F5.45x39%20mm%40PP.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F5.45x39%20mm%40BP.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F5.45x39%20mm%40PPBS%20%22Igolnik%22.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F7.62x39%20mm%40PS.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F7.62x54R%40LPS%20Gzh.jpeg",
    ],
  },
  AWFUL: {
    bg: "#4deaea",
    values: [
      "https://eft-ammo.com/%2Fimages-fallback%2F9x19mm%40PST%20gzh.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F5.56x45%20mm%40M855.jpeg",
      "https://eft-ammo.com/%2Fimages-fallback%2F.300%20blk%40M62%20(Tracer).jpeg",
    ],
  },
};

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

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(async () => {
    let twitchId = "rengawr";

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
        <title>EFT | Ammo Tier List</title>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="description"
          content="Escape from Tarkov Ammo and Armor Charts created by rengawr 🙌"
        />

        {/* <!-- Google / Search Engine Tags --> */}
        <meta
          itemProp="name"
          content="eft-ammo.com 🎮 | The definitive Tarkov Ammo charts 12.12"
        />
        <meta
          itemProp="description"
          content="Escape from Tarkov Ammo and Armor Charts created by rengawr 🙌"
        />
        <meta itemProp="image" content="http://eft-ammo.com/assets/og-01.jpg" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://eft-ammo.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="eft-ammo.com 🎮 | The definitive Tarkov Ammo charts 12.12"
        />
        <meta
          property="og:description"
          content="Escape from Tarkov Ammo and Armor Charts created by rengawr 🙌"
        />
        <meta name="og:image" content="http://eft-ammo.com/assets/og-01.jpg" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="eft-ammo.com" />
        <meta property="twitter:url" content="https://eft-ammo.com/" />
        <meta
          name="twitter:title"
          content="eft-ammo.com 🎮 | The definitive Tarkov Ammo charts 12.12"
        />
        <meta
          name="twitter:description"
          content="Escape from Tarkov Ammo and Armor Charts created by rengawr 🙌"
        />
        <meta
          name="twitter:image"
          content="http://eft-ammo.com/assets/og-01.jpg"
        />
      </Head>
      <Box pb="48px">
        <Divider borderColor="tarkovYellow.100" opacity="0.5" />
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
              Ammo Tier List
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
                  fontSize={["lg", "xl"]}
                  as="h1"
                >
                  <a href="https://www.twitch.tv/rengawr/">
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
                      RengaWr
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
                  href={"https://www.twitch.tv/rengawr/"}
                >
                  <FaTwitch color="#a15422" size={28} />
                </SocialButton>
              )}
            </HStack>
            {isMobile && (
              <SocialButton
                size={12}
                label={"Twitch"}
                href={"https://www.twitch.tv/rengawr/"}
              >
                <FaTwitch color="orange" size={24} />
              </SocialButton>
            )}
          </VStack>
        </Center>
        <Center>
          <VStack mx="8px">
            {Object.keys(values).map((value, index) => {
              const item = values[value];

              return (
                <Wrap
                  shouldWrapChildren
                  key={`wrap-${value}-${index}`}
                  bg={item.bg}
                  p="20px"
                  justify="center"
                  align="center"
                  spacing="30px"
                >
                  <Text fontWeight="bold" fontSize="3xl" color="vulcan.800">
                    {value}
                  </Text>
                  {item.values.map((value, index) => {
                    return (
                      <Box key={`value-${index}`}>
                        <Image boxSize="64px" src={value} objectFit="contain" />
                      </Box>
                    );
                  })}
                </Wrap>
              );
            })}
            <Text pt="24px" pb="8px" fontStyle="italic">
              Watch the full explaination on this video
            </Text>
            <ReactPlayer
              width={isMobile ? "100%" : "600px"}
              url="https://www.youtube.com/watch?v=EpZzN7BqJeM"
            />
          </VStack>
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
              <a href="https://www.twitch.tv/rengawr/">
                Watch RengaWr's stream here:
              </a>
            </Text>
            {componentState.embed}
          </Box>
        </Center>
      </Box>
    </Box>
  );
};

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 900,
  };
}

export default App;
