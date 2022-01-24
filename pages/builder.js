import { Box, Button, Center, HStack, Link, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Body from "../components/builder/Body";
import getBuilderData from "../utils/getBuilderData";
import { BsClipboardPlus } from "react-icons/bs";
import getResults from "../utils/getResults";

const Builder = ({ data }) => {
  const { asPath, query } = useRouter();
  const dev = process.env.NEXT_NODE_ENV !== "production";
  const url = dev ? "http://localhost:3000" : "https://eft-ammo.com";
  const link = url + asPath;

  const [state, setState] = useState({
    shortenedURL: undefined,
  });

  useEffect(() => {
    setState({
      ...state,
      shortenedURL: undefined,
    });
  }, [asPath]);

  return (
    <Box py="24px">
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
    </Box>
  );
};

export async function getStaticProps() {
  return {
    props: {
      data: await (await getBuilderData()).json(),
    },
    revalidate: 7200,
  };
}

export default Builder;
