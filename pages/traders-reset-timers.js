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
