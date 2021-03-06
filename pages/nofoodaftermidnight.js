import React, { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { Box, Center, Text, VStack } from "@chakra-ui/react";

const Home = () => {
  useEffect(() => {
    const { pathname } = Router;
    if (pathname == "/nofoodaftermidnight") {
      Router.push("/");
    }
  });

  return (
    <>
      <Head>
        <title>EFT | Ammo and Armor Charts</title>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="description"
          content="Escape from Tarkov Ammo and Armor Charts created by NoFoodAfterMidnight 🙌"
        />

        {/* <!-- Google / Search Engine Tags --> */}
        <meta
          itemProp="name"
          content="eft-ammo.com 🎮 | The definitive Tarkov Ammo charts 12.12"
        />
        <meta
          itemProp="description"
          content="Escape from Tarkov Ammo and Armor Charts created by NoFoodAfterMidnight 🙌"
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
          content="Escape from Tarkov Ammo and Armor Charts created by NoFoodAfterMidnight 🙌"
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
          content="Escape from Tarkov Ammo and Armor Charts created by NoFoodAfterMidnight 🙌"
        />
        <meta
          name="twitter:image"
          content="http://eft-ammo.com/assets/og-01.jpg"
        />
      </Head>
      <Center bg="vulcan.1000" color="tarkovYellow.100" h="100vh">
        <VStack px="24px" textAlign="center">
          <Text fontSize="4xl">Loading...</Text>
          <Box>
            Here you will find all ammunition types in the chaos of Tarkov.{" "}
            <br />
            Varying opponents will require different types of ammunition to
            tackle.
            <br /> This page lists all ammunition types in Escape from Tarkov.
          </Box>
        </VStack>
      </Center>
    </>
  );
};

export default Home;
