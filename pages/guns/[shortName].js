import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Center,
} from "@chakra-ui/react";
import gunsData from "../../utils/gunsData";
import NotFound from "../notFound";

const GunDetails = (props) => {
  const router = useRouter();
  const { shortName } = router.query;
  const gun = gunsData.guns.find((gun) => gun.shortName === shortName);

  if (!gun) {
    return <NotFound />;
  }

  return (
    <Container maxW={"7xl"} color="tarkovYellow.100">
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        my={{ base: 18, md: 24 }}
        p="16px"
        bg="vulcan.900"
      >
        <Center>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={gun.imageURL}
            fit={"cover"}
            align={"center"}
            w="600px"
            h="150px"
          />
        </Center>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {gun.name}
            </Heading>
            <Text fontWeight={300} fontSize={"2xl"}>
              AKA {gun.shortName} - Category: {gun.category}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"}>
                The Remington Model 870 is a pump-action shotgun manufactured by
                Remington Arms Company, LLC. It is widely used by the public for
                sport shooting, hunting, and self-defense and used by law
                enforcement and military organizations worldwide.
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Features
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Chronograph</ListItem>
                  <ListItem>Master Chronometer Certified</ListItem>{" "}
                  <ListItem>Tachymeter</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Anti‑magnetic</ListItem>
                  <ListItem>Chronometer</ListItem>
                  <ListItem>Small seconds</ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Width:
                  </Text>{" "}
                  {gun.size.width}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Height:
                  </Text>{" "}
                  {gun.size.height}
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={"vulcan.800"}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            Back to Ammo Chart
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default GunDetails;
