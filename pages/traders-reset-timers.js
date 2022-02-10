import Head from "next/head";
import {
  Box,
  Center,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import TradersResetTimers from "../components/TradersResetTimers";

const Timers = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box>
      <Head>
        <title>EFT | Traders Reset Timers</title>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="description"
          content="Escape from Tarkov Traders Reset Timers 🙌"
        />
      </Head>
      <Box
        style={{
          position: "fixed",
        }}
      >
        {!isMobile && (
          <Text fontSize="7xl" fontWeight="bold" opacity="0.15" ml="24px">
            Traders Reset Timers
          </Text>
        )}
      </Box>
      <Center>
        <VStack>
          {isMobile && (
            <Text fontSize="4xl" fontWeight="bold" textAlign="center">
              Traders Reset Timers
            </Text>
          )}
          <Box pt={!isMobile && "10%"}>
            <TradersResetTimers big={true} />
          </Box>
        </VStack>
      </Center>
    </Box>
  );
};

export default Timers;
