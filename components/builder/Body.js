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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Item from "./Item";
import ItemLabel from "./ItemLabel";
import ModalTable from "./ModalTable";
import { useRouter } from "next/router";

const updateQueryString = (router, loadout) => {
  const query = {};
  const items = [
    "earpiece",
    "headwear",
    "armband",
    "bodyArmor",
    "eyewear",
    "onSling",
    "holster",
    "onBack",
    "scabbard",
  ];

  items.forEach((item) => {
    if (loadout[item]) {
      query[item] = loadout[item].normalizedName;
    }
  });

  if (loadout.title) {
    query.title = loadout.title;
  }

  router.push(
    {
      pathname: "/builder",
      query,
    },
    undefined,
    { shallow: true }
  );
};

const Body = ({ data, query }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, setState] = useState({
    currentItemType: undefined,
    loadout: {},
  });

  useEffect(() => {
    const loadout = {};

    Object.keys(query).forEach((itemKey) => {
      const itemName = query[itemKey];

      console.log(itemKey, itemName);

      if (itemKey === "earpiece") {
        loadout[itemKey] = data.headphones.find(
          (x) => x.normalizedName === itemName
        );
      } else if (itemKey === "headwear") {
        loadout[itemKey] = data.helmet.find(
          (x) => x.normalizedName === itemName
        );
      } else if (itemKey === "bodyArmor") {
        loadout[itemKey] = data.armor.find(
          (x) => x.normalizedName === itemName
        );
      } else if (itemKey === "holster") {
        loadout[itemKey] = data.gun.find((x) => x.normalizedName === itemName);
      } else if (itemKey === "onSling") {
        loadout[itemKey] = data.gun.find((x) => x.normalizedName === itemName);
      } else if (itemKey === "onBack") {
        loadout[itemKey] = data.gun.find((x) => x.normalizedName === itemName);
      } else if (itemKey === "eyewear") {
        loadout[itemKey] = data.glasses.find(
          (x) => x.normalizedName === itemName
        );
      } else if (itemKey === "title") {
        loadout.title = itemName;
      }
    });

    setState({ ...state, loadout });
  }, [query]);

  let items;

  if (state.currentItemType === "earpiece") {
    items = data.headphones;
  } else if (state.currentItemType === "headwear") {
    items = data.helmet;
  } else if (state.currentItemType === "bodyArmor") {
    items = data.armor;
  } else if (state.currentItemType === "holster") {
    items = data.gun;
  } else if (state.currentItemType === "onSling") {
    items = data.gun;
  } else if (state.currentItemType === "onBack") {
    items = data.gun;
  } else if (state.currentItemType === "eyewear") {
    items = data.glasses;
  }

  return (
    <VStack>
      <Box w="484px" pt="64px">
        <ItemLabel itemType="title" />
        <Input
          placeholder="Title (Optional)"
          color="tarkovYellow.100"
          textAlign="center"
          borderColor="tarkovYellow.100"
          borderWidth="2px"
          borderRadius="0"
          size="md"
          fontWeight="bold"
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
        py="64px"
        bgImage="url('/builder/scav.png')"
        bgPosition="center"
        bgRepeat="no-repeat"
      >
        <VStack spacing="36px">
          <HStack spacing="48px">
            <Box
              h="130px"
              w="130px"
              onClick={() => {
                setState({
                  ...state,
                  currentItemType: "earpiece",
                });
                onOpen();
              }}
            >
              <ItemLabel itemType="earpiece" />
              <Item
                itemType="earpiece"
                state={state.loadout.earpiece}
                h="130px"
                w="130px"
              />
            </Box>
            <Box
              h="130px"
              w="130px"
              onClick={() => {
                setState({
                  ...state,
                  currentItemType: "headwear",
                });
                onOpen();
              }}
            >
              <ItemLabel itemType="headwear" />
              <Item
                itemType="headwear"
                state={state.loadout.headwear}
                h="130px"
                w="130px"
              />
            </Box>
            <Box
              h="130px"
              w="130px"
              onClick={() => {
                setState({
                  ...state,
                  currentItemType: "facecover",
                });
                onOpen();
              }}
            >
              <ItemLabel itemType="facecover" />
              <Item
                itemType="facecover"
                state={state.loadout.facecover}
                h="130px"
                w="130px"
              />
            </Box>
          </HStack>
          <HStack spacing="48px" align="top">
            <Box
              h="60px"
              w="130px"
              onClick={() => {
                setState({
                  ...state,
                  currentItemType: "armband",
                });
                onOpen();
              }}
            >
              <ItemLabel itemType="armband" />
              <Item
                itemType="armband"
                state={state.loadout.armband}
                h="75px"
                w="130px"
              />
            </Box>
            <Box
              h="130px"
              w="130px"
              onClick={() => {
                setState({
                  ...state,
                  currentItemType: "bodyArmor",
                });
                onOpen();
              }}
            >
              <ItemLabel itemType="bodyArmor" />
              <Item
                itemType="bodyArmor"
                state={state.loadout.bodyArmor}
                h="130px"
                w="130px"
              />
            </Box>
            <Box
              h="130px"
              w="130px"
              onClick={() => {
                setState({
                  ...state,
                  currentItemType: "eyewear",
                });
                onOpen();
              }}
            >
              <ItemLabel itemType="eyewear" />
              <Item
                itemType="eyewear"
                state={state.loadout.eyewear}
                h="130px"
                w="130px"
              />
            </Box>
          </HStack>
          <HStack spacing="48px">
            <Box
              h="130px"
              w="310px"
              onClick={() => {
                setState({
                  ...state,
                  currentItemType: "onSling",
                });
                onOpen();
              }}
            >
              <ItemLabel itemType="onSling" />
              <Item
                itemType="onSling"
                state={state.loadout.onSling}
                h="130px"
                w="310px"
              />
            </Box>
            <Box
              h="130px"
              w="130px"
              onClick={() => {
                setState({
                  ...state,
                  currentItemType: "holster",
                });
                onOpen();
              }}
            >
              <ItemLabel itemType="holster" />
              <Item
                itemType="holster"
                state={state.loadout.holster}
                h="130px"
                w="130px"
              />
            </Box>
          </HStack>
          <HStack spacing="48px">
            <Box
              h="130px"
              w="310px"
              onClick={() => {
                setState({
                  ...state,
                  currentItemType: "onBack",
                });
                onOpen();
              }}
            >
              <ItemLabel itemType="onBack" />
              <Item
                itemType="onBack"
                state={state.loadout.onBack}
                h="130px"
                w="310px"
              />
            </Box>
            <Box
              h="130px"
              w="130px"
              onClick={() => {
                setState({
                  ...state,
                  currentItemType: "scabbard",
                });
                onOpen();
              }}
            >
              <ItemLabel itemType="scabbard" />
              <Item
                itemType="scabbard"
                state={state.loadout.scabbard}
                h="130px"
                w="130px"
              />
            </Box>
          </HStack>
        </VStack>

        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
          <ModalOverlay />
          <ModalContent bg="vulcan.1000" color="tarkovYellow.100">
            <ModalHeader>
              Current Item Type: {state.currentItemType}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ModalTable
                items={items}
                setItem={(item) => {
                  const newState = { ...state };

                  console.log("new Item", state.currentItemType);

                  newState.loadout[state.currentItemType] = item;

                  setState(newState);
                  updateQueryString(router, newState.loadout);
                  onClose();
                }}
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="orange" color="black" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </VStack>
  );
};

export default Body;
