import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  Wrap,
  VStack,
  HStack,
  Center,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight="bold" fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  return (
    <Box bg="vulcan.900" color="tarkovYellow.100">
      <Center>
        <Wrap
          justify="center"
          shouldWrapItems
          maxW={"6xl"}
          pt="24px"
          spacing="0"
          align="start"
        >
          <VStack px="12px" pb={["24px", "0"]}>
            <ListHeader>Resources</ListHeader>
            <Link href={"/nofoodaftermidnight"}>Home</Link>
            <Link href={"/builder"}>Loadout Builder</Link>
          </VStack>
          <VStack px="12px" pb={["24px", "0"]}>
            <ListHeader>NoFAM's Resources</ListHeader>
            <Link isExternal href={"https://twitter.com/food_eft"}>
              Twitter
            </Link>
            <Link isExternal href={"https://www.twitch.tv/nofoodaftermidnight"}>
              Twitch
            </Link>
            <Link isExternal href={"https://discord.gg/wexEyCg"}>
              Discord
            </Link>
          </VStack>
          <VStack px="12px" pb={["24px", "0"]}>
            <ListHeader>Filodreamz's Resources</ListHeader>
            <Link isExternal href={"https://www.twitch.tv/filodreamz"}>
              Twitch
            </Link>
            <Link isExternal href={"https://discord.gg/H4v5sQR7We"}>
              Discord
            </Link>
            <Link isExternal href={"https://multistream.gg"}>
              Multistream.gg
            </Link>
          </VStack>
          <VStack px="12px" pb={["24px", "0"]}>
            <ListHeader>Special Thanks To</ListHeader>
            <Link isExternal href={"https://tarkov-tools.com"}>
              Kokarn from tarkov-tools
            </Link>
          </VStack>
        </Wrap>
      </Center>
      <Box py={6}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: "tarkovYellow.100",
            flexGrow: 1,
            opacity: 0.5,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: "tarkovYellow.100",
            opacity: 0.5,
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Text textTransform="uppercase" fontWeight="bold" fontSize="2xl">
            eft-ammo
          </Text>
        </Flex>
        <Text textAlign="center" pt="16px">
          © {new Date().getFullYear()}{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(120deg, #a15422 0%, #a15422 100%)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 0.4em",
              backgroundPosition: "0 88%",
              transition: "background-size 0.25s ease-in",
            }}
          >
            NoFoodAfterMidnight
          </span>{" "}
          - All rights reserved |{" "}
          <Link href="https://www.twitch.tv/filodreamz">
            Made with ❤️ by filodreamz <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export { Footer };
