import React, { useState, useEffect } from "react";
import Head from "next/head";
import { HStack, useBreakpointValue, VStack } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  Flex,
  Center,
  Text,
  Box,
  Input,
  Checkbox,
} from "@chakra-ui/react";
import getResults from "../utils/getResults";
import Legenda from "../components/Legenda";
import MobileRow from "../components/MobileRow";
import DesktopRow from "../components/DesktopRow";
import { SocialButton } from "../components/SmallFooterWithSocial";
import { FaTwitch } from "react-icons/fa";
import fallback from "../utils/fallback";

const App = ({ results, isFallback }) => {
  const [componentState, setComponentState] = useState({
    currentSearch: "",
    results,
    minimalView: true,
  });

  console.log("isFallback", isFallback);

  const isMobile = useBreakpointValue({ base: true, md: false });
  const keys = Object.keys(componentState.results);
  let keysFilteredByWeaponName = keys;

  if (componentState.currentSearch && componentState.currentSearch.length) {
    keysFilteredByWeaponName = keys.filter((weaponName) =>
      weaponName
        .toLowerCase()
        .includes(componentState.currentSearch.toLowerCase())
    );

    keys.forEach((weaponName) => {
      const weapon = componentState.results[weaponName];

      weapon.forEach((ammo) => {
        if (
          ammo.name
            .toLowerCase()
            .includes(componentState.currentSearch.toLowerCase())
        ) {
          if (!keysFilteredByWeaponName.includes(weaponName)) {
            keysFilteredByWeaponName.push(weaponName);
          }
        }
      });
    });
  }

  const Mobile = () => (
    <>
      <Accordion textAlign="center" defaultIndex={[0]} allowMultiple>
        {keysFilteredByWeaponName.map((key, index) => {
          const allAmmosForCategory = componentState.results[key];

          return (
            <Box
              key={`allAmmos-${index}`}
              color="white"
              mx="24px"
              mb="24px"
              rounded="sm"
              border="12px solid"
              borderColor="#333"
              bg="#333"
            >
              <AccordionItem>
                <MobileRow
                  category={key}
                  allAmmosForCategory={allAmmosForCategory}
                />
              </AccordionItem>
            </Box>
          );
        })}
      </Accordion>
    </>
  );

  const Desktop = () => (
    <>
      <Center>
        <VStack
          w={
            componentState.minimalView
              ? ["100%", "100%", "100%", "100%", "85%", "75%"]
              : "100%"
          }
        >
          {keysFilteredByWeaponName.map((key, index) => {
            const allAmmosForCategory = componentState.results[key];

            return (
              <Box
                key={`allAmmos-${index}`}
                color="white"
                mx="24px"
                mb="24px"
                rounded="sm"
                border="12px solid"
                borderColor="#333"
                bg="#333"
                w="100%"
              >
                <DesktopRow
                  category={key}
                  allAmmosForCategory={allAmmosForCategory}
                  minimalView={componentState.minimalView}
                />
              </Box>
            );
          })}
        </VStack>
      </Center>
    </>
  );

  return (
    <Box pt="24px">
      <Head>
        <title>NoFoodAfterMidnight's EFT Ammo and Armor Charts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center mb="24px">
        <VStack>
          <Text
            textAlign="center"
            color="white"
            fontWeight="bold"
            fontSize={["xl", "3xl"]}
            mt="24px"
            as="h1"
          >
            NoFoodAfterMidnight's Quick Reference Sheet
          </Text>
          <HStack mt="24px">
            <Center>
              <Text
                textAlign="center"
                color="white"
                fontWeight="bold"
                fontSize={["lg", "2xl"]}
                as="h1"
              >
                <a href="https://www.twitch.tv/nofoodaftermidnight/">
                  Watch his stream here
                </a>
              </Text>
            </Center>
            <SocialButton
              size={16}
              label={"Twitch"}
              href={"https://www.twitch.tv/nofoodaftermidnight/"}
            >
              <FaTwitch size={32} />
            </SocialButton>
          </HStack>
        </VStack>
      </Center>

      <Center>
        <Flex pt="24px">
          <Legenda isDesktop={!isMobile} />
        </Flex>
      </Center>

      <Center py="64px">
        <Input
          w={["100%", "50%"]}
          mx="24px"
          bg="#fff"
          color="#333"
          textAlign="center"
          borderColor="#9a8866"
          _focus={{ borderColor: "#9a8866" }}
          placeholder="Search by Category or Ammo type"
          _placeholder={{ color: "#333", textAlign: "center" }}
          onChange={(e) => {
            setComponentState({
              currentSearch: e.target.value,
              results: componentState.results,
            });
          }}
        />
      </Center>
      {!isMobile && (
        <Center>
          <Checkbox
            m="24px"
            fontWeight="bold"
            size="sm"
            onChange={(e) =>
              setComponentState({
                ...componentState,
                minimalView: !componentState.minimalView,
              })
            }
            color={"white"}
            isChecked={componentState.minimalView}
          >
            Minimal Table View
          </Checkbox>
        </Center>
      )}
      {isMobile ? <Mobile /> : <Desktop />}
      <style jsx global>{`
        html,
        body {
          background: #222 !important;

          height: 100%;
          width: 100%;

          background-position: center;
          background-size: cover;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
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
    revalidate: 900,
  };
}

export default App;
