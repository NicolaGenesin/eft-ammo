import Head from "next/head";
import {
  Box,
  Center,
  Wrap,
  Button,
  VStack,
  Input,
  Text,
  usePrevious,
  useInterval,
  HStack,
  useBreakpointValue,
  Link,
  Skeleton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import ItemLabel from "../../components/builder/ItemLabel";
import { url } from "../../utils/env";
import { TwitchEmbed } from "react-twitch-embed";
import deepEqual from "deep-equal";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import {
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  VKIcon,
  VKShareButton,
} from "react-share";
import { exampleConfiguration } from "../../utils/exampleConfiguration";

const persistVote = async (code, direction) => {
  await (
    await fetch(`${url}/api/guns/builds/${code}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        direction,
      }),
    })
  ).json();
};

const GunBuilder = ({ data, createMode }) => {
  if (!data) {
    return (
      <Center h="100vh" bg="vulcan.800">
        <Text fontSize="2xl" fontWeight="bold" color="tarkovYellow.100">
          Loading...
        </Text>
      </Center>
    );
  }

  if (!createMode) {
    // TODO if not all data is filled, create configuration with defaults
    // check field by field
    // ====================
    // TODO disable builder
  }

  const router = useRouter();
  const { query, asPath } = router;
  const [vote, setVote] = useState();
  const [score, setScore] = useState(data.socialVote || 0);
  const [state, setState] = useState({
    configuration: data?.configuration || {}, // this needs to stay empty (interval)
    embed: undefined,
  });
  const [doUpdatePrevConfiguration, setDoUpdatePrevConfiguration] =
    useState(false);

  const configurationRef = useRef();
  configurationRef.current = state.configuration;

  let prevConfiguration = usePrevious(JSON.stringify(state.configuration));
  const prevConfigurationRef = useRef();
  prevConfigurationRef.current = prevConfiguration;

  // Keep content up to date
  useInterval(async () => {
    const parsedPrevConfiguration = JSON.parse(
      prevConfigurationRef?.current || "{}"
    );

    const stateHasChanged = !deepEqual(
      parsedPrevConfiguration,
      configurationRef.current
    );

    if (Object.keys(parsedPrevConfiguration).length && stateHasChanged) {
      console.log("Saving New State");

      setDoUpdatePrevConfiguration(true);

      const result = await (
        await fetch(`${url}/api/guns/builds/${query.uuid}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: query.uuid,
            configuration: state.configuration,
          }),
        })
      ).json();

      console.log("+ Done", result);

      if (state.configuration.twitchLoginId?.length > 3) {
        const newState = {
          ...state,
          embed: (
            <TwitchEmbed
              style={{ width: "100%", height: "100%" }}
              channel={state.configuration.twitchLoginId}
              id={state.configuration.twitchLoginId}
              key={state.configuration.twitchLoginId}
              theme="dark"
              autoplay
              withChat={false}
              muted={true}
            />
          ),
        };
        setState(newState);
      }
    } else {
      console.log("No update");
    }
  }, 4000);

  // Update previous configuration when necessary
  useEffect(() => {
    prevConfiguration = JSON.stringify(state.configuration || {});
    setDoUpdatePrevConfiguration(false);
  }, [doUpdatePrevConfiguration]);

  // Clone logic
  useEffect(async () => {
    if (query.clone) {
      const response = await (
        await fetch(`${url}/api/guns/builds/${query.clone}`, {
          method: "GET",
        })
      ).json();

      const configuration = response.data.configuration || {};

      setState({ ...state, configuration });

      router.push(`/gun-builder/${query.uuid}`, undefined, { shallow: true });
    }
  }, [query.clone]);

  // Update Twitch Embed
  useEffect(() => {
    if (state.configuration.twitchLoginId?.length > 3 && !createMode) {
      const newState = {
        ...state,
        embed: (
          <TwitchEmbed
            style={{ width: "100%", height: "100%" }}
            channel={state.configuration.twitchLoginId}
            id={state.configuration.twitchLoginId}
            key={state.configuration.twitchLoginId}
            theme="dark"
            autoplay
            withChat={false}
            muted={true}
          />
        ),
      };
      setState(newState);
    }
  }, [state.configuration.twitchLoginId]);

  const isMobile = useBreakpointValue({ base: true, md: false });
  const shareURL = url + asPath;
  const shareTitle = "Check my EFT Gun Build";

  return (
    <Box color="tarkovYellow.100">
      <Head>
        <title>EFT | Gun Builder</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="description" content="Escape from Tarkov Gun Builder 🙌" />
      </Head>
      <Box
        style={{
          position: "fixed",
        }}
      >
        {!isMobile && (
          <Text fontSize="7xl" fontWeight="bold" opacity="0.15" ml="24px">
            Gun Builder
          </Text>
        )}
      </Box>
      <Center pb="5%" pt="2%">
        <VStack spacing="24px">
          {isMobile && (
            <Text fontSize="4xl" fontWeight="bold" textAlign="center">
              Gun Builder
            </Text>
          )}
          <HStack px="8px">
            {createMode ? (
              <Text fontSize="xs">
                Data saved automatically.{" "}
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(shareURL);
                  }}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  Copy URL
                </span>{" "}
                or share via Social when ready!
              </Text>
            ) : (
              <Text fontSize="xs">
                Want to re-share?{" "}
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(shareURL);
                  }}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  Copy URL
                </span>{" "}
                or do it via Social:
              </Text>
            )}
            <HStack>
              <TwitterShareButton url={shareURL} title={shareTitle}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <RedditShareButton
                url={shareURL}
                title={shareTitle}
                windowWidth={660}
                windowHeight={460}
              >
                <RedditIcon size={32} round />
              </RedditShareButton>
              <TelegramShareButton url={shareURL} title={shareTitle}>
                <TelegramIcon size={32} round />
              </TelegramShareButton>
              <VKShareButton url={shareURL}>
                <VKIcon size={32} round />
              </VKShareButton>
            </HStack>
          </HStack>
          <Wrap
            p="24px"
            shouldWrapChildren
            justify="center"
            position={!isMobile && "fixed"}
            right={0}
            bottom={0}
          >
            {!createMode && (
              <Button
                color="black"
                borderRadius="0"
                colorScheme="green"
                as="h1"
                fontSize="lg"
                fontWeight="bold"
                textTransform="uppercase"
                onClick={() => {
                  router.push(`/gun-builder-clone/${query.uuid}`);
                }}
              >
                Clone Build
              </Button>
            )}
            <Button
              color="black"
              borderRadius="0"
              colorScheme="orange"
              as="h1"
              fontSize="lg"
              fontWeight="bold"
              textTransform="uppercase"
              onClick={() => {
                if (createMode) {
                  setState({ ...state, configuration: {} });
                } else {
                  router.push("/gun-builder");
                }
              }}
            >
              {createMode ? "Reset Build" : "Create New Build"}
            </Button>
          </Wrap>
          <Wrap shouldWrapChildren justify="center" align="end">
            <VStack justify="center" spacing="0">
              <Box w={["300px", "400px", "500px"]} py="24px">
                <ItemLabel itemType="title" />
                <Input
                  minW="300px"
                  placeholder="[Optional]"
                  color="tarkovYellow.100"
                  textAlign="center"
                  _placeholder={{ color: "tarkovYellow.50" }}
                  _disabled={{ color: "tarkovYellow.100" }}
                  borderColor="white"
                  borderWidth="1px"
                  borderRadius="0"
                  size="md"
                  disabled={!createMode}
                  textTransform="capitalize"
                  value={state.configuration.title || ""}
                  onChange={(e) => {
                    const newState = { ...state };

                    newState.configuration.title = e.target.value;

                    setState(newState);
                  }}
                />
              </Box>
              <Box
                w={["300px", "400px", "500px"]}
                mt={["24px", "24px", "24px", 0]}
              >
                <ItemLabel itemType="embedTitle" />
                <Input
                  minW="300px"
                  placeholder="[Optional]"
                  color="tarkovYellow.100"
                  textAlign="center"
                  _placeholder={{ color: "tarkovYellow.50" }}
                  _disabled={{ color: "tarkovYellow.100" }}
                  borderColor="white"
                  borderWidth="1px"
                  borderRadius="0"
                  size="md"
                  disabled={!createMode}
                  textTransform="capitalize"
                  value={state.configuration.twitchLoginId || ""}
                  onChange={(e) => {
                    const newState = { ...state };

                    newState.configuration.twitchLoginId = e.target.value;

                    setState(newState);
                  }}
                />
                {!state.configuration.twitchLoginId && createMode && (
                  <Text
                    color="tarkovYellow.100"
                    fontSize="xs"
                    mt="8px"
                    textAlign="center"
                  >
                    If set, a Twitch embed will be displayed
                    <br />
                    at the bottom of this page.
                  </Text>
                )}
              </Box>
            </VStack>
            {!createMode && (
              <Box>
                <ItemLabel itemType="score" />
                <VStack
                  h="107px"
                  borderColor="white"
                  borderWidth="1px"
                  p="4px"
                  justify="center"
                  spacing="0"
                >
                  <BiUpvote
                    size={24}
                    color={vote === "up" ? "#38A169" : "#9AE6B4"}
                    onClick={() => {
                      if (vote === undefined) {
                        persistVote(query.uuid, "up");
                      } else {
                        persistVote(query.uuid, "down");
                      }
                      setVote(vote === "up" ? undefined : "up");
                      setScore(vote === "up" ? score - 1 : score + 1);
                    }}
                  />
                  <Text color="white">{score}</Text>
                  <BiDownvote
                    size={24}
                    color={vote === "down" ? "#E53E3E" : "#FC8181"}
                    onClick={() => {
                      if (vote === undefined) {
                        persistVote(query.uuid, "down");
                      } else {
                        persistVote(query.uuid, "up");
                      }
                      setVote(vote === "down" ? undefined : "down");
                      setScore(vote === "down" ? score + 1 : score - 1);
                    }}
                  />
                </VStack>
              </Box>
            )}
          </Wrap>
          <Center
            w={["360px", "450px", "550px", "600px"]}
            h="500px"
            borderColor="white"
            borderWidth="1px"
          >
            <Button
              colorScheme="blue"
              onClick={() => {
                const newConfiguration = {
                  ...state.configuration,
                  ...exampleConfiguration,
                };
                setState({ ...state, configuration: newConfiguration });
              }}
            >
              Set Example Configuration
            </Button>
          </Center>
          <Box
            w={["375px", "450px", "600px"]}
            h={["300px", "400px", "400px"]}
            pt="48px"
            pb="64px"
          >
            {state.configuration.twitchLoginId && (
              <Text
                textAlign="center"
                color="tarkovYellow.100"
                fontWeight="bold"
                fontSize={["lg", "2xl"]}
                as="h2"
                mb="8px"
              >
                <a
                  href={`https://www.twitch.tv/${state.configuration.twitchLoginId}/`}
                >
                  Watch {state.configuration.twitchLoginId}'s stream here:
                </a>
              </Text>
            )}
            {state.configuration.twitchLoginId && state.embed}
            {!state.configuration.twitchLoginId && createMode && (
              <Center
                w="100%"
                h="100%"
                borderColor="white"
                borderWidth="1px"
                align="center"
                fontWeight="bold"
                position="relative"
              >
                <Skeleton
                  position="absolute"
                  w="100%"
                  h="100%"
                  startColor="vulcan.900"
                  endColor="vulcan.800"
                  speed="1.5"
                />
                A Twitch Stream will show here if you fill
                <br />
                the Twitch ID input at the top of this page.
              </Center>
            )}
          </Box>
        </VStack>
      </Center>
    </Box>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const response = await (
    await fetch(`${url}/api/guns/builds/${context.params.uuid}`, {
      method: "GET",
    })
  ).json();

  const createMode = response.isNew;

  return {
    props: { data: response.data, createMode },
  };
}

export default GunBuilder;
