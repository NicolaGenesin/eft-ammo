import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  TabList,
  Tab,
  Tabs,
  Center,
  useBreakpointValue,
} from "@chakra-ui/react";
import { url } from "../../utils/env";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";

const Explorer = () => {
  const [builds, setBuilds] = useState([]);
  const [orderBy, setOrderBy] = useState();
  const [tabIndex, setTabIndex] = React.useState(0);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const router = useRouter();

  useEffect(async () => {
    if (!builds.length) {
      let requestURL = `${url}/api/guns/builds/`;

      if (orderBy) {
        requestURL = `${requestURL}?orderBy=${orderBy}`;
      }

      const response = await (
        await fetch(requestURL, {
          method: "GET",
        })
      ).json();

      setBuilds(response.data.filter((x) => x?.configuration?.gun?.name));
    }
  }, [builds]);

  if (!builds.length) {
    return <Loading />;
  }

  return (
    <Box>
      <Head>
        <title>EFT | Gun Builds Explorer</title>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="description"
          content="Escape from Tarkov Gun Build Explorer 🙌"
        />
      </Head>
      <Box
        style={{
          position: "fixed",
        }}
      >
        {!isMobile && (
          <Text fontSize="7xl" fontWeight="bold" opacity="0.1" ml="24px">
            Explorer
          </Text>
        )}
      </Box>
      <Box p="24px">
        <Center>
          <Tabs
            variant="unstyled"
            w="100%"
            mb="24px"
            size="lg"
            index={tabIndex}
            onChange={(index) => {
              setTabIndex(index);
            }}
          >
            <Center>
              <TabList bg="vulcan.800">
                <Tab
                  fontWeight="bold"
                  color="tarkovYellow.100"
                  _selected={{ color: "black", bg: "orange.500" }}
                  onClick={() => {
                    setOrderBy();
                    setBuilds([]);
                  }}
                >
                  Latest
                </Tab>
                <Tab
                  fontWeight="bold"
                  color="tarkovYellow.100"
                  _selected={{ color: "black", bg: "orange.500" }}
                  onClick={() => {
                    setOrderBy("score");
                    setBuilds([]);
                  }}
                >
                  By Upvotes
                </Tab>
              </TabList>
            </Center>
          </Tabs>
        </Center>
        <Table size="sm" variant="unstyled">
          <Thead color="tarkovYellow.50">
            <Tr>
              <Th>Build Name</Th>
              <Th>Gun Used</Th>
              <Th>Total Mods</Th>
              <Th>Created By</Th>
              <Th>Created At</Th>
              <Th>Upvotes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {builds.map((build, index) => {
              let modsCount = 0;

              if (build.configuration) {
                const slots = build.configuration.currentBuild?.slots || [];

                const countSlots = (slots) => {
                  slots.forEach((slot) => {
                    if (slot.item) {
                      modsCount += 1;
                    }
                    if (slot.slots?.length) {
                      countSlots(slot.slots);
                    }
                  });
                };

                countSlots(slots);
              }

              return (
                <Tr
                  bg={index % 2 === 0 ? "vulcan.900" : "vulcan.850"}
                  opacity="0.90"
                  transitionProperty="shadow"
                  transitionDuration="1"
                  transitionTimingFunction="ease-in-out"
                  _hover={{ shadow: "lg", bg: "vulcan.800" }}
                  onClick={() => {
                    router.push(
                      `/${
                        router.asPath.includes("sherpa")
                          ? "sherpa-hub"
                          : "gun-builder"
                      }/${build.code}`
                    );
                  }}
                >
                  <Td
                    _hover={{ cursor: "pointer" }}
                    fontSize="md"
                    textTransform="capitalize"
                  >
                    {build.configuration?.title || "-"}
                  </Td>
                  <Td _hover={{ cursor: "pointer" }} fontSize="md">
                    {build.configuration?.gun?.name || "-"}
                  </Td>
                  <Td _hover={{ cursor: "pointer" }} fontSize="md">
                    {modsCount}
                  </Td>
                  <Td _hover={{ cursor: "pointer" }} fontSize="md">
                    {build.configuration?.twitchLoginId || "-"}
                  </Td>
                  <Td _hover={{ cursor: "pointer" }} fontSize="md">
                    {new Date(build.createdAt).toLocaleString()}
                  </Td>
                  <Td _hover={{ cursor: "pointer" }} fontSize="md">
                    {build.score}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Explorer;
