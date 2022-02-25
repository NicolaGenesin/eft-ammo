import {
  Box,
  Button,
  Center,
  HStack,
  Link,
  VStack,
  Text,
  Wrap,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Body from "../components/builder/Body";
import getBuilderData from "../utils/getBuilderData";
import { BsClipboardPlus } from "react-icons/bs";
import Head from "next/head";
import { TwitchEmbed } from "react-twitch-embed";
import TradersResetTimers from "../components/TradersResetTimers";
import { url } from "../utils/env";

const Builder = ({ data }) => {
  const router = useRouter();
  const { asPath, query } = router;
  const link = `${url}${asPath}`;

  const [state, setState] = useState({
    loading: false,
    shortenedURL: undefined,
    embed: undefined,
  });

  useEffect(() => {
    const newState = {
      ...state,
      shortenedURL: undefined,
    };

    setState(newState);

    const embedUser = query.embedUser;

    newState.embedUser = embedUser;

    if (embedUser) {
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

    const interval = setInterval(() => {
      console.log(
        state.embedUser,
        newState.embedUser,
        state.embedUser !== newState.embedUser
      );

      if (state.embedUser !== newState.embedUser) {
        setState(newState);

        newState.embedUser = state.embedUser;
      }
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, [asPath, query]);

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box>
      <Box
        style={{
          position: "fixed",
        }}
      >
        {!isMobile && (
          <Text fontSize="7xl" fontWeight="bold" opacity="0.15" ml="24px">
            Loadout Builder
          </Text>
        )}
      </Box>
      <Box py="64px">
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
            <Wrap shouldWrapChildren justify="center">
              {Object.keys(query).length > 0 && (
                <Button
                  color="black"
                  borderRadius="0"
                  colorScheme="blue"
                  as="h1"
                  fontSize="lg"
                  fontWeight="bold"
                  textTransform="uppercase"
                  onClick={() => {
                    router.push("/builder");
                  }}
                >
                  Create New Loadout
                </Button>
              )}
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

                    const { code } = await (
                      await fetch(`${url}/api/urlShortener/`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ link }),
                      })
                    ).json();

                    setState({
                      ...state,
                      shortenedURL: `${url}/build/${code}`,
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
                <HStack
                  onClick={() => {
                    navigator.clipboard.writeText(state.shortenedURL);
                  }}
                >
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
                  >
                    <BsClipboardPlus size={16} />
                  </Button>
                </HStack>
              )}
            </Wrap>
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

  // console.log(data);

  return {
    props: {
      data,
    },
    revalidate: 7200,
  };
}

export default Builder;
