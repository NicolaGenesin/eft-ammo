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
            opacity="0.5"
            w={w}
            h={h}
            bgImage={`url('/builder/item-placeholder${
              square ? "" : "-wide"
            }.jpg')`}
            bgRepeat="repeat"
          />
        ) : (
          <Box
            onMouseEnter={(e) => showButton(e)}
            onMouseLeave={(e) => hideButton(e)}
            position="relative"
            w={w}
            h={h}
          >
            <Image
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
                position="relative"
                bg="tomato"
                color="tarkovYellow.100"
                borderRadius="0"
                display={display}
                onClick={() => {
                  unselect(data);
                }}
              >
                <IoMdClose />
              </Button>
            </Center>
          </Box>
        )}
      </Center>
    </Box>
  );
};

export default Item;
