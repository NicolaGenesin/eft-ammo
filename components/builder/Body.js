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
} from "@chakra-ui/react";
import Item from "./Item";
import ItemLabel from "./ItemLabel";
import ModalTable from "./ModalTable";
import { GiWeight } from "react-icons/gi";
import { useRouter } from "next/router";

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
                <NumberInputField />
                <NumberInputStepper>
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
  } else if (
    state.currentItemType.includes("onSling") ||
    state.currentItemType.includes("onBack")
  ) {
    items = data.ammos;
  } else if (state.currentItemType.includes("holster")) {
    items = data.ammos;
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

  console.log("render", state.loadout);

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
      <HStack spacing="36px" justify="start">
        <Box
          py="64px"
          bgImage="url('/builder/scav.png')"
          bgPosition="center"
          bgRepeat="no-repeat"
        >
          <VStack spacing="36px">
            <HStack spacing="48px">
              {renderItem({
                itemType: "earpiece",
                w: "130px",
                h: "130px",
                state,
                setState,
                onOpen,
              })}
              {renderItem({
                itemType: "headwear",
                w: "130px",
                h: "130px",
                state,
                setState,
                onOpen,
              })}
              {renderItem({
                itemType: "facecover",
                w: "130px",
                h: "130px",
                state,
                setState,
                onOpen,
              })}
            </HStack>
            <HStack spacing="48px" align="top">
              {renderItem({
                itemType: "armband",
                w: "130px",
                h: "60px",
                state,
                setState,
                onOpen,
              })}
              {renderItem({
                itemType: "bodyArmor",
                w: "130px",
                h: "130px",
                state,
                setState,
                onOpen,
              })}
              {renderItem({
                itemType: "eyewear",
                w: "130px",
                h: "130px",
                state,
                setState,
                onOpen,
              })}
            </HStack>
            <HStack spacing="48px">
              {renderItem({
                itemType: "onSling",
                w: "310px",
                h: "130px",
                state,
                setState,
                onOpen,
              })}
              {renderItem({
                itemType: "holster",
                w: "130px",
                h: "130px",
                state,
                setState,
                onOpen,
              })}
            </HStack>
            <HStack spacing="48px">
              {renderItem({
                itemType: "onBack",
                w: "310px",
                h: "130px",
                state,
                setState,
                onOpen,
              })}
              {renderItem({
                itemType: "scabbard",
                w: "130px",
                h: "130px",
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
                Current Item Type: {state.currentItemType}
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
                <Button colorScheme="orange" color="black" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <VStack spacing="36px">
          <HStack spacing="24px">
            {renderAmmoTypes("onSling", state, setState, onOpen, router)}
            {renderAmmoTypes("onBack", state, setState, onOpen, router)}
            {renderAmmoTypes("holster", state, setState, onOpen, router)}
          </HStack>
          <HStack color="#a3c5a9" spacing="0">
            <Text pr="8px">Weight Estimation:</Text>
            <GiWeight />
            <Text pl="8px" pr="4px" fontWeight="bold" fontSize="xl">
              {weight.toFixed(2)}
            </Text>
            <Text>KG</Text>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default Body;
