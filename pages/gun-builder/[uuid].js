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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import ItemLabel from "../../components/builder/ItemLabel";
import { url } from "../../utils/env";
import { TwitchEmbed } from "react-twitch-embed";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { TarkovGunBuilder } from "tarkov-gun-builder/dist/index";
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
import items from "../../utils/bsg/items.json";
import gamePresets from "../../utils/bsg/globals.json";
import defaultPresets from "../../utils/bsg/item_presets.json";

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

const getGunAndAllItems = (configuration) => {
  const gunAndAllItems = [];

  if (configuration?.gun) {
    gunAndAllItems.push(configuration.gun);
  }

  const getAllItems = (slots) => {
    slots.forEach((slot) => {
      if (slot.slots) {
        getAllItems(slot.slots);
      }

      if (slot.item) {
        gunAndAllItems.push(slot.item);
      }
    });
  };

  getAllItems(configuration?.currentBuild?.slots || []);

  return gunAndAllItems;
};

const GunBuilder = ({ data, createMode, pricesData }) => {
  if (!data) {
    return (
      <Center h="100vh" bg="vulcan.800">
        <Text fontSize="2xl" fontWeight="bold" color="tarkovYellow.100">
          Loading...
        </Text>
      </Center>
    );
  }

  const router = useRouter();
  const { query, asPath } = router;
  const [vote, setVote] = useState();
  const [prices, setPrices] = useState(pricesData || {});
  const [score, setScore] = useState(data.score || 0);
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

  const summaryItems = [];

  Object.keys(prices).forEach((key) => {
    const normalizedKey = key.replace("_", "");
    const item = items.find((item) => item.id === normalizedKey);

    summaryItems.push({
      name: item.name,
      shortName: item.shortName,
      price: prices[key].lastLowPrice,
    });
  });

  // Keep content up to date
  useInterval(async () => {
    if (!createMode) {
      return;
    }

    const parsedPrevConfiguration = JSON.parse(
      prevConfigurationRef?.current || "{}"
    );

    const stateHasChanged =
      JSON.stringify(parsedPrevConfiguration) !==
      JSON.stringify(configurationRef.current);

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

      setPrices(await fetchPrices(state.configuration));

      console.log("+ Done", result);
    } else {
      console.log("No update");
    }
  }, 4000);

  // clean url from clone logic
  useEffect(async () => {
    if (query.clone) {
      router.push(`/gun-builder/${query.uuid}`, undefined, { shallow: true });
    }
  }, [query.clone]);

  // Update previous configuration when necessary
  useEffect(() => {
    prevConfigurationRef.current = JSON.stringify(state.configuration || {});
    setDoUpdatePrevConfiguration(false);
  }, [doUpdatePrevConfiguration]);

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
              Tarkov Gun Builder
            </Text>
          )}
          <HStack px="24px">
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
                Share{" "}
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(shareURL);
                  }}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  via URL
                </span>{" "}
                or Social:
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
            zIndex={100}
          >
            {!createMode && (
              <Button
                color="black"
                borderRadius="0"
                colorScheme="orange"
                fontSize="lg"
                fontWeight="bold"
                textTransform="uppercase"
                onClick={() => {
                  router.push(`/gun-builder-clone/${query.uuid}`);
                }}
              >
                Clone
              </Button>
            )}
            {!createMode && (
              <Button
                color="black"
                borderRadius="0"
                colorScheme="green"
                fontSize="lg"
                fontWeight="bold"
                textTransform="uppercase"
                onClick={() => {
                  router.push("/gun-builder");
                }}
              >
                Create New
              </Button>
            )}
            <Button
              color="black"
              borderRadius="0"
              colorScheme="blue"
              fontSize="lg"
              fontWeight="bold"
              textTransform="uppercase"
              onClick={() => {
                navigator.clipboard.writeText(shareURL);

                setTimeout(
                  async () =>
                    alert(`${shareURL} has been copied to your clipboard!`),
                  500
                );
              }}
            >
              Share
            </Button>
          </Wrap>
          <Wrap shouldWrapChildren justify="center" align="end">
            <VStack justify="center" spacing="0">
              <Box w={["300px", "400px", "500px"]} py="24px">
                <ItemLabel itemType="title" />
                <Input
                  minW="300px"
                  bg="vulcan.950"
                  placeholder="[Optional]"
                  color="tarkovYellow.100"
                  textAlign="center"
                  _placeholder={{ color: "tarkovYellow.50" }}
                  _disabled={{ color: "tarkovYellow.100" }}
                  borderColor="vanishedWhite.100"
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
                  bg="vulcan.950"
                  placeholder="[Optional]"
                  color="tarkovYellow.100"
                  textAlign="center"
                  _placeholder={{ color: "tarkovYellow.50" }}
                  _disabled={{ color: "tarkovYellow.100" }}
                  borderColor="vanishedWhite.100"
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
              <Box bg="vulcan.950">
                <ItemLabel itemType="score" />
                <VStack
                  h="107px"
                  borderColor="vanishedWhite.100"
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
          <Box
            onClick={() => {
              if (!createMode) {
                alert(
                  "You cannot edit this Build. Please clone it or create a new one."
                );
              }
            }}
            zIndex={99}
          >
            <Center style={{ pointerEvents: createMode ? "auto" : "none" }}>
              <TarkovGunBuilder
                items={items}
                presets={gamePresets.ItemPresets}
                defaultPresets={defaultPresets}
                defaultConfiguration={
                  Object.keys(state.configuration).length > 0
                    ? state.configuration
                    : undefined
                }
                callback={(data) => {
                  // called every time the configuration changes
                  const newConfiguration = {
                    ...state.configuration,
                    ...data,
                  };
                  setState({ ...state, configuration: newConfiguration });
                }}
              />
            </Center>
            {summaryItems.length > 0 && (
              <Box
                mt="24px"
                bg="vulcan.1050"
                pb="8px"
                pt="16px"
                px="4px"
                borderColor="vanishedWhite.100"
                borderWidth="1px"
              >
                <Text
                  textAlign="center"
                  fontWeight="bold"
                  fontSize="lg"
                  mb="8px"
                >
                  BUILD SUMMARY &amp; PRICES
                </Text>
                <Table variant="unstyled" size="sm">
                  <TableCaption>
                    Prices provided by{" "}
                    <Link
                      textDecoration="underline"
                      href="https://tarkov-tools.com"
                    >
                      tarkov-tools.com
                    </Link>
                  </TableCaption>
                  <Thead textColor="tarkovYellow.50">
                    <Tr>
                      <Th>Name</Th>
                      <Th>Short Name</Th>
                      <Th textAlign="right">Last Low Price</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {summaryItems.map((item, index) => {
                      return (
                        <Tr key={`item-detail-${index}`}>
                          <Td>{item.name}</Td>
                          <Td>{item.shortName}</Td>
                          <Td textAlign="right">{item.price || "?"} ₽</Td>
                        </Tr>
                      );
                    })}
                    <Tr fontWeight="bold">
                      <Td fontSize="md">TOTAL</Td>
                      <Td fontSize="md"></Td>
                      <Td fontSize="md" textAlign="right">
                        {summaryItems
                          .map((item) => item.price)
                          .reduce((prev, next) => prev + next, 0)}{" "}
                        ₽
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            )}
          </Box>
          <Box
            w={["375px", "450px", "600px"]}
            h={["300px", "400px", "400px"]}
            pt="48px"
            pb="64px"
            px="16px"
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
            {state.configuration.twitchLoginId && !createMode && state.embed}
            {createMode && (
              <Center
                w="100%"
                h="100%"
                borderColor="vanishedWhite.100"
                borderWidth="1px"
                align="center"
                fontWeight="bold"
                bg="vulcan.950"
                p="16px"
              >
                Are you a Streamer? Set your Twitch login name at the top of
                this page.
                <br />A Twitch player will show here once you share this page.
              </Center>
            )}
          </Box>
        </VStack>
      </Center>
    </Box>
  );
};

export async function getServerSideProps(context) {
  let cloneData;

  // Clone logic
  if (context.query.clone) {
    // query.clone is the uuid of the original build we want to clone
    const response = await (
      await fetch(`${url}/api/guns/builds/${context.query.clone}`, {
        method: "GET",
      })
    ).json();

    cloneData = response.data;
  }

  const response = await (
    await fetch(`${url}/api/guns/builds/${context.params.uuid}`, {
      method: "GET",
    })
  ).json();

  const createMode = response.isNew;

  if (cloneData) {
    response.data = cloneData;
  }

  const props = { data: response.data, createMode };

  if (!createMode) {
    props.pricesData = await fetchPrices(response.data.configuration);
  }

  return {
    props,
  };
}

const fetchPrices = async (configuration) => {
  return await (
    await fetch(`${url}/api/prices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: getGunAndAllItems(configuration).map((item) => item.id),
      }),
    })
  ).json();
};

export default GunBuilder;
