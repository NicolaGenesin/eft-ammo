import React, { useState } from "react";
import { Box, Button, Center, Image } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";

const Item = ({ data, w, h, select, unselect }) => {
  const square = w === h;
  const [display, setDisplay] = useState("none");

  const showButton = (e) => {
    e.preventDefault();
    setDisplay("flex");
  };
  const hideButton = (e) => {
    e.preventDefault();
    setDisplay("none");
  };

  return (
    <Box>
      <Center w={w} h={h} bg="#131313" opacity="0.85">
        {!data ? (
          <Box
            onClick={() => {
              select();
            }}
            cursor="pointer"
            opacity="0.5"
            w={w}
            h={h}
            bgImage={`url('/builder/item-placeholder${
              square ? "" : "-wide"
            }.jpg')`}
            bgRepeat="repeat"
            borderColor="white"
            borderWidth="1px"
          />
        ) : (
          <Box
            onMouseEnter={(e) => showButton(e)}
            onMouseLeave={(e) => hideButton(e)}
            position="relative"
            w={w}
            h={h}
            borderColor="white"
            borderWidth="1px"
          >
            <Image
              maxH={h}
              p="1px"
              m="auto"
              top="0"
              left="0"
              bottom="0"
              right="0"
              position="absolute"
              src={data.gridImageLink}
              alt={data.name}
              objectFit="cover"
            />

            <Center w={w} h={h}>
              <Button
                h="48px"
                w="48px"
                p="0"
                position="relative"
                colorScheme="red"
                rounded="full"
                color="tarkovYellow.100"
                display={display}
                onClick={() => {
                  unselect(data);
                }}
              >
                <IoMdClose size={24} />
              </Button>
            </Center>
          </Box>
        )}
      </Center>
    </Box>
  );
};

export default Item;
