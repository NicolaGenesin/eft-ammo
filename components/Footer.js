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
            <Link href={"/"}>Home</Link>
            <Link href={"/gun-builder"}>Gun Builder</Link>
            <Link href={"/builder"}>Loadout Builder</Link>
          </VStack>
          <VStack px="12px" pb={["24px", "0"]}>
            <ListHeader>NoFAM</ListHeader>
            <Text fontSize="xs">(Ammo Chart Creator &amp; Maintainer)</Text>
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
            <ListHeader>Filodreamz</ListHeader>
            <Text fontSize="xs">(Website Developer)</Text>
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
            <Link isExternal href={"https://andreibegu.me/"}>
              Andrew | andreibegu.me
            </Link>
          </VStack>
        </Wrap>
      </Center>
      <Box py={6}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            flexGrow: 1,
          }}
          _after={{
            content: '""',
            flexGrow: 1,
          }}
        >
          <Text textTransform="uppercase" fontWeight="bold" fontSize="2xl">
            eft-ammo
          </Text>
        </Flex>
        <Text textAlign="center" pt="16px" fontSize="sm">
          © {new Date().getFullYear()} Made with ❤️ by{" "}
          <Link href="https://www.twitch.tv/filodreamz">
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
              Filodreamz
            </span>
          </Link>
        </Text>
        <Text textAlign="center" pb="16px" fontSize="xs">
          Game content and materials are trademarks and copyrights of
          Battlestate Games and its licensors. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export { Footer };
