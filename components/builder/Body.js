import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useDisclosure,
  VStack,
  Center,
  Link,
  WrapItem,
  Wrap,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import Item from "./Item";
import ItemLabel from "./ItemLabel";
import ModalTable from "./ModalTable";
import { GiWeight } from "react-icons/gi";
import { useRouter } from "next/router";
import { getModalTitleLabel } from "../../utils/labels";

const updateQueryString = (router, loadout) => {
  const query = {};

  Object.keys(loadout).forEach((item) => {
    if (loadout[item]) {
      if (loadout[item].normalizedName) {
        query[item] = loadout[item].normalizedName;
      } else {
        query[item] = loadout[item];
      }
    }
  });

  router.push(
    {
      pathname: "/builder",
      query,
    },
    undefined,
    { shallow: true }
  );
};

const renderAmmoTypes = (target, state, setState, onOpen, router) => {
  return (
    <VStack spacing="36px">
      {[...Array(3).keys()].map((index) => {
        const key = `${target}Ammo${index + 1}`;
        const data = state.loadout[key];

        return (
          <Box key={key}>
            <ItemLabel itemType={key} position={index + 1} />
            <HStack color="tarkovYellow.100" bg="vulcan.900" pr="8px">
              <Box>
                <Item
                  data={data}
                  h="64px"
                  w="64px"
                  unselect={() => {
                    const newLoadout = { ...state.loadout };

                    delete newLoadout[key];

                    setState({
                      loadout: newLoadout,
                      currentItemType: "",
                    });
                  }}
                  select={() => {
                    setState({
                      ...state,
                      currentItemType: key,
                    });
                    onOpen();
                  }}
                />
              </Box>
              <NumberInput
                style={{ textAlign: "right" }}
                value={state.loadout[`${key}Q`] || 0}
                min={0}
                max={500}
                maxW="80px"
                onChange={(value) => {
                  const newState = { ...state };

                  newState.loadout[`${key}Q`] = value;

                  setState(newState);
                  updateQueryString(router, newState.loadout);
                }}
              >
                <NumberInputField
                  borderRadius="0"
                  borderColor="vulcan.900"
                  _hover={{ borderColor: "vulcan.900" }}
                />
                <NumberInputStepper borderRadius="0" borderColor="vulcan.900">
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
          </Box>
        );
      })}
    </VStack>
  );
};

const renderItem = ({ itemType, state, setState, onOpen, w, h }) => {
  return (
    <Box h={h} w={w}>
      <ItemLabel itemType={itemType} />
      <Item
        itemType={itemType}
        data={state.loadout[itemType]}
        h={h}
        w={w}
        unselect={() => {
          const newLoadout = { ...state.loadout };

          delete newLoadout[itemType];

          setState({
            loadout: newLoadout,
            currentItemType: "",
          });
        }}
        select={() => {
          setState({
            ...state,
            currentItemType: itemType,
          });
          onOpen();
        }}
      />
    </Box>
  );
};

const Body = ({ data, query }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, setState] = useState({
    currentItemType: "",
    loadout: {},
  });

  useEffect(() => {
    const loadout = {};

    Object.keys(query).forEach((itemKey) => {
      const itemName = query[itemKey];

      if (itemKey === "earpiece") {
        loadout[itemKey] = data.earpiece.find(
          (x) => x.normalizedName === itemName
        );
      } else if (itemKey === "headwear") {
        loadout[itemKey] = data.headwear.find(
          (x) => x.normalizedName === itemName
        );
      } else if (itemKey === "faceCover") {
        loadout[itemKey] = data.faceCover.find(
          (x) => x.normalizedName === itemName
        );
      } else if (itemKey === "armband") {
        loadout[itemKey] = data.armband.find(
          (x) => x.normalizedName === itemName
        );
      } else if (itemKey === "scabbard") {
        loadout[itemKey] = data.scabbard.find(
          (x) => x.normalizedName === itemName
        );
      } else if (itemKey === "bodyArmor") {
        loadout[itemKey] = data.bodyArmor.find(
          (x) => x.normalizedName === itemName
        );
      } else if (itemKey === "eyewear") {
        loadout[itemKey] = data.eyewear.find(
          (x) => x.normalizedName === itemName
        );
      } else if (itemKey === "holster") {
        loadout[itemKey] = data.guns.find((x) => x.normalizedName === itemName);
      } else if (itemKey === "onSling") {
        loadout[itemKey] = data.guns.find((x) => x.normalizedName === itemName);
      } else if (itemKey === "onBack") {
        loadout[itemKey] = data.guns.find((x) => x.normalizedName === itemName);
      } else if (itemKey === "title") {
        loadout.title = itemName;
      } else {
        // default case to handle all ammo types
        const ammoType = data.ammos.find((x) => x.normalizedName === itemName);

        loadout[itemKey] = ammoType || itemName;
      }
    });

    setState({ ...state, loadout });
  }, [query]);

  let items;

  if (state.currentItemType === "earpiece") {
    items = data.earpiece;
  } else if (state.currentItemType === "headwear") {
    items = data.headwear.filter((item) => {
      return (
        (item.name.includes(" cap") ||
          item.name.includes(" hat") ||
          item.name.includes("bandana") ||
          item.name.includes("beanie") ||
          item.name.includes("helmet") ||
          item.name.includes("mask") ||
          item.name.includes("Beret")) &&
        !item.name.includes(" hat ") &&
        !item.name.includes("Shattered")
      );
    });
  } else if (state.currentItemType === "faceCover") {
    items = data.faceCover.filter((item) => {
      return (
        item.name.includes("balaclava") ||
        item.name.includes("mask") ||
        item.name.includes("beard") ||
        item.name.includes(" hat ") ||
        item.name.includes("respirator") ||
        item.name.includes("magh")
      );
    });
  } else if (state.currentItemType === "armband") {
    items = data.armband;
  } else if (state.currentItemType === "scabbard") {
    items = data.scabbard;
  } else if (state.currentItemType === "bodyArmor") {
    items = data.bodyArmor;
  } else if (state.currentItemType === "eyewear") {
    items = data.eyewear.filter(
      (item) =>
        !item.name.includes("face shield") &&
        !item.name.toLowerCase().includes("visor")
    );
  } else if (state.currentItemType === "holster") {
    items = data.guns.filter((gun) => gun.name.includes("pistol"));
  } else if (state.currentItemType === "onSling") {
    items = data.guns.filter((gun) => !gun.name.includes("pistol"));
  } else if (state.currentItemType === "onBack") {
    items = data.guns.filter((gun) => !gun.name.includes("pistol"));
  } else if (
    state.currentItemType.includes("onSling") ||
    state.currentItemType.includes("onBack")
  ) {
    items = data.ammos.filter((item) => {
      return !item.name.includes("pack") && !item.name.includes("grenade");
    });
  } else if (state.currentItemType.includes("holster")) {
    items = data.ammos.filter((item) => {
      return !item.name.includes("pack") && !item.name.includes("grenade");
    });
  }

  let weight = 0;

  Object.keys(state.loadout).map((key) => {
    const itemWeight = state.loadout[key].weight;

    if (state.loadout[key].weight) {
      if (state.loadout[`${key}Q`]) {
        weight = weight + itemWeight * state.loadout[`${key}Q`];
      } else {
        weight = weight + itemWeight;
      }
    }
  });

  return (
    <VStack spacing="0">
      <Wrap shouldWrapChildren justify="center" pt="64px" spacing="0">
        <Box w={["100%", "500px"]}>
          <ItemLabel itemType="title" />
          <Input
            minW="300px"
            placeholder="[optional] title"
            color="tarkovYellow.100"
            textAlign="center"
            borderColor="white"
            _placeholder={{ color: "tarkovYellow.100" }}
            borderWidth="1px"
            borderRadius="0"
            size="md"
            textTransform="capitalize"
            defaultValue={state.loadout.title}
            onChange={(e) => {
              const newLoadout = { ...state.loadout };

              newLoadout.title = e.target.value;

              setState({ ...state, loadout: newLoadout });
              updateQueryString(router, newLoadout);
            }}
          />
        </Box>
        <Box
          w={["100%", "500px"]}
          mt={["24px", "24px", "24px", 0]}
          ml={[0, 0, 0, "24px"]}
        >
          <ItemLabel itemType="embedTitle" />
          <Input
            minW="300px"
            placeholder="[optional] twitch ID"
            color="tarkovYellow.100"
            textAlign="center"
            borderColor="white"
            _placeholder={{ color: "tarkovYellow.100" }}
            borderWidth="1px"
            borderRadius="0"
            size="md"
            textTransform="capitalize"
            defaultValue={state.loadout.embedUser}
            onChange={(e) => {
              const newLoadout = { ...state.loadout };

              newLoadout.embedUser = e.target.value;

              setState({ ...state, loadout: newLoadout });
              updateQueryString(router, newLoadout);
            }}
          />
          {!state.loadout.embedUser && (
            <Text
              color="tarkovYellow.100"
              fontSize="xs"
              mt="8px"
              textAlign="center"
            >
              If set, a Twitch embed will be displayed at the bottom
              <br />
              of this page. Visitors will count as viewers on Twitch.
            </Text>
          )}
        </Box>
      </Wrap>
      <HStack spacing="36px" justify="start" p="4px">
        <Wrap justify="center" spacing="0">
          <WrapItem>
            <Box
              py="40px"
              bgImage="url('/builder/scav.png')"
              bgPosition="center"
              bgRepeat="no-repeat"
            >
              <VStack spacing="36px">
                <HStack spacing={["4px", "48px"]}>
                  {renderItem({
                    itemType: "earpiece",
                    w: ["105px", "130px"],
                    h: ["105px", "130px"],
                    state,
                    setState,
                    onOpen,
                  })}
                  {renderItem({
                    itemType: "headwear",
                    w: ["105px", "130px"],
                    h: ["105px", "130px"],
                    state,
                    setState,
                    onOpen,
                  })}
                  {renderItem({
                    itemType: "faceCover",
                    w: ["105px", "130px"],
                    h: ["105px", "130px"],
                    state,
                    setState,
                    onOpen,
                  })}
                </HStack>
                <HStack spacing={["4px", "48px"]} align="top">
                  {renderItem({
                    itemType: "armband",
                    w: ["105px", "130px"],
                    h: "60px",
                    state,
                    setState,
                    onOpen,
                  })}
                  {renderItem({
                    itemType: "bodyArmor",
                    w: ["105px", "130px"],
                    h: ["105px", "130px"],
                    state,
                    setState,
                    onOpen,
                  })}
                  {renderItem({
                    itemType: "eyewear",
                    w: ["105px", "130px"],
                    h: ["105px", "130px"],
                    state,
                    setState,
                    onOpen,
                  })}
                </HStack>
                <HStack spacing={["4px", "48px"]}>
                  {renderItem({
                    itemType: "onSling",
                    w: ["250px", "310px"],
                    h: ["105px", "130px"],
                    state,
                    setState,
                    onOpen,
                  })}
                  {renderItem({
                    itemType: "holster",
                    w: ["105px", "130px"],
                    h: ["105px", "130px"],
                    state,
                    setState,
                    onOpen,
                  })}
                </HStack>
                <HStack spacing={["4px", "48px"]}>
                  {renderItem({
                    itemType: "onBack",
                    w: ["250px", "310px"],
                    h: ["105px", "130px"],
                    state,
                    setState,
                    onOpen,
                  })}
                  {renderItem({
                    itemType: "scabbard",
                    w: ["105px", "130px"],
                    h: ["105px", "130px"],
                    state,
                    setState,
                    onOpen,
                  })}
                </HStack>
              </VStack>

              <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalOverlay />
                <ModalContent bg="vulcan.1000" color="tarkovYellow.100">
                  <ModalHeader>
                    Please select the{" "}
                    {getModalTitleLabel(state.currentItemType)}
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <ModalTable
                      items={items}
                      setItem={(item) => {
                        const newState = { ...state };

                        newState.loadout[state.currentItemType] = item;

                        setState(newState);
                        updateQueryString(router, newState.loadout);
                        onClose();
                      }}
                    />
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme="orange"
                      color="black"
                      onClick={onClose}
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          </WrapItem>
          <WrapItem>
            <VStack spacing="36px" pt="8px" ml={["0px", "32px"]}>
              <Wrap
                spacing={["12px", "32px"]}
                p={["0px", "32px"]}
                justify="center"
              >
                <WrapItem>
                  {renderAmmoTypes("onSling", state, setState, onOpen, router)}
                </WrapItem>
                <WrapItem>
                  {renderAmmoTypes("onBack", state, setState, onOpen, router)}
                </WrapItem>
                <WrapItem pt={["24px", "0px"]}>
                  {renderAmmoTypes("holster", state, setState, onOpen, router)}
                </WrapItem>
              </Wrap>
              <HStack color="#a3c5a9" spacing="0">
                <Text pr="8px">Weight Estimation:</Text>
                <GiWeight />
                <Text pl="8px" pr="4px" fontWeight="bold" fontSize="xl">
                  {weight.toFixed(2)}
                </Text>
                <Text>KG</Text>
              </HStack>
              <Center>
                <VStack color="#a3c5a9">
                  <Text fontWeight="bold" fontSize="2xl">
                    Summary and Flea M. Prices *
                  </Text>
                  <Text fontWeight="bold" fontSize="xs">
                    * Prices based on last low price
                  </Text>
                  <Box pb="24px" px="8px">
                    <UnorderedList>
                      {Object.keys(state.loadout)
                        .filter((key) => !key.includes("Q"))
                        .map((key) => {
                          const item = state.loadout[key];
                          let price = item.lastLowPrice || 0;

                          if (state.loadout[`${key}Q`]) {
                            price = price * state.loadout[`${key}Q`];
                          }

                          return (
                            <ListItem>
                              {item.name} <b>( {price || "-"} ₽ )</b>
                            </ListItem>
                          );
                        })}
                    </UnorderedList>
                  </Box>
                  <Link
                    href="https://forms.gle/stgrZXYepmCgxPoKA"
                    isExternal={true}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      colorScheme="orange"
                      borderRadius="0"
                      color="black"
                      size="lg"
                    >
                      🛠️ Feedback or Ideas? 🛠️
                    </Button>
                  </Link>
                  <Link
                    href="https://discord.gg/H4v5sQR7We"
                    isExternal={true}
                    style={{ textDecoration: "none" }}
                    color="tarkovYellow.100"
                    fontSize="xs"
                  >
                    or contact me on Discord
                  </Link>
                </VStack>
              </Center>
            </VStack>
          </WrapItem>
        </Wrap>
      </HStack>
    </VStack>
  );
};

export default Body;
