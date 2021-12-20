import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaTwitter, FaTwitch } from "react-icons/fa";

const SocialButton = ({ children, label, href, size }) => {
  return (
    <chakra.button
      bg="white"
      color="black"
      rounded={"full"}
      w={size || 8}
      h={size || 8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const SmallFooterWithSocial = () => {
  return (
    <Box color="white">
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>
          © {new Date().getFullYear()} NoFoodAfterMidnight - All rights reserved
          |{" "}
          <Link href="https://www.twitch.tv/filodreamz" color="teal.200">
            Made with ❤️ by filodreamz <ExternalLinkIcon mx="2px" />
          </Link>
          ,{" "}
          <Link
            href="https://docs.google.com/spreadsheets/d/1jjWcIue0_PCsbLQAiL5VrIulPK8SzM5jjiCMx9zUuvE/htmlview#"
            color="teal.200"
          >
            data fetched from NoFAM
            <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"Twitter"} href={"https://twitter.com/food_eft"}>
            <FaTwitter />
          </SocialButton>
          <SocialButton
            label={"Twitch"}
            href={"https://www.twitch.tv/nofoodaftermidnight/"}
          >
            <FaTwitch />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
};

export { SocialButton, SmallFooterWithSocial };
