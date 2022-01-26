import {
  Box,
  Button,
  Center,
  HStack,
  Link,
  VStack,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Body from "../components/builder/Body";
import getBuilderData from "../utils/getBuilderData";
import { BsClipboardPlus } from "react-icons/bs";
import Head from "next/head";
import { TwitchEmbed } from "react-twitch-embed";
import TradersResetTimers from "../components/TradersResetTimers";

const Builder = ({ data }) => {
  const { asPath, query } = useRouter();
  const link = `https://eft-ammo.com${asPath}`;

  const [state, setState] = useState({
    loading: false,
    shortenedURL: undefined,
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
    embedUser: "nofoodaftermidnight",
  });

  useEffect(() => {
    const newState = {
      ...state,
      shortenedURL: undefined,
    };

    if (query.embedUser) {
      const embedUser = query.embedUser;

      newState.embedUser = embedUser;
      newState.embed = (
        <TwitchEmbed
          style={{ width: "100%", height: "100%" }}
          channel={embedUser}
          id={embedUser}
          key={embedUser}
          theme="dark"
          autoplay
          withChat={false}
          muted={true}
        />
      );
    }

    setState(newState);
  }, [asPath]);

  return (
    <Box>
      <Box
        style={{
          background: "url(/builder/background.jpg)",
          backgroundPositionY: "50%",
          position: "fixed",
          backgroundSize: "cover",
          width: "100%",
          height: "100vh",
          zIndex: "-1",
        }}
      />
      <Box py="64px" zIndex="1">
        <Head>
          <title>EFT | Loadout Builder</title>
          <link rel="icon" href="/favicon.ico" />

          <meta
            name="description"
            content="Escape from Tarkov Loadout Builder 🙌"
          />
        </Head>
        <Center color="tarkovYellow.100">
          <VStack>
            {!state.shortenedURL && (
              <Button
                color="black"
                borderRadius="0"
                colorScheme="orange"
                as="h1"
                fontSize="lg"
                fontWeight="bold"
                textTransform="uppercase"
                disabled={state.loading}
                onClick={async () => {
                  setState({
                    ...state,
                    loading: true,
                  });

                  const { result } = await (
                    await fetch("https://eft-ammo.com/api/urlShortener/", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ link }),
                    })
                  ).json();

                  setState({
                    ...state,
                    shortenedURL: result,
                    loading: false,
                  });
                }}
              >
                {state.loading
                  ? "Please Wait..."
                  : "Click here to share this Loadout"}
              </Button>
            )}
            {state.shortenedURL && (
              <HStack>
                <Box
                  color="tarkovYellow.100"
                  textAlign="center"
                  borderColor="tarkovYellow.100"
                  borderWidth="2px"
                  borderRadius="0"
                  py="4px"
                  px="8px"
                >
                  <Link textAlign="center">{state.shortenedURL}</Link>
                </Box>
                <Button
                  w="36px"
                  h="36px"
                  p="0"
                  color="tarkovYellow.100"
                  colorScheme="orange"
                  borderColor="tarkovYellow.100"
                  borderWidth="2px"
                  borderRadius="0"
                  onClick={() => {
                    navigator.clipboard.writeText(state.shortenedURL);
                  }}
                >
                  <BsClipboardPlus size={16} />
                </Button>
              </HStack>
            )}
          </VStack>
        </Center>
        <Box>
          <Body data={data} query={query} />
        </Box>
        {state.embedUser && (
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
                <a href={`https://www.twitch.tv/${state.embedUser}/`}>
                  Watch {state.embedUser}'s stream here:
                </a>
              </Text>
              {state.embed}
            </Box>
          </Center>
        )}
        <Center py="32px">
          <TradersResetTimers />
        </Center>
        <Center>
          <Link href="/nofoodaftermidnight" style={{ textDecoration: "none" }}>
            <Button
              colorScheme="orange"
              borderRadius="0"
              color="black"
              size="lg"
            >
              Back to Ammo Chart
            </Button>
          </Link>
        </Center>
      </Box>
    </Box>
  );
};

export async function getStaticProps() {
  let data = {};

  try {
    data = await (await getBuilderData()).json();
  } catch (error) {
    console.log(error);
  }

  console.log(data);

  return {
    props: {
      data,
    },
    revalidate: 7200,
  };
}

export default Builder;
