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
import { TwitchEmbed } from "react-twitch-embed";

const Builder = ({ data }) => {
  const { asPath, query } = useRouter();
  const dev = process.env.NEXT_NODE_ENV !== "production";
  const url = dev ? "http://localhost:3000" : "https://eft-ammo.com";
  const link = url + asPath;

  const [state, setState] = useState({
    shortenedURL: undefined,
    embed: undefined,
  });

  useEffect(() => {
    setState({
      ...state,
      shortenedURL: undefined,
      // embed: (
      //   <TwitchEmbed
      //     style={{ width: "100%", height: "100%" }}
      //     channel={"nofoodaftermidnight"}
      //     id={"nofoodaftermidnight"}
      //     key={"nofoodaftermidnight"}
      //     theme="dark"
      //     autoplay
      //     withChat={false}
      //     muted={true}
      //   />
      // ),
    });
  }, [asPath]);

  return (
    <Box py="64px">
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
              onClick={async () => {
                const { result } = await (
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
                  shortenedURL: result,
                });
              }}
            >
              Share this Loadout
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
      <Body data={data} query={query} />
      <Center>
        {/* <Box
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
          {state.embed}
        </Box> */}
      </Center>{" "}
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
    revalidate: 60,
  };
}

export default Builder;
