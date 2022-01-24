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
            position="absolute"
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
            position="relative"
            onMouseEnter={(e) => showButton(e)}
            onMouseLeave={(e) => hideButton(e)}
          >
            <Box>
              <Image
                src={data.gridImageLink}
                alt={data.name}
                objectFit="cover"
              />
            </Box>
            <Button
              display={display}
              onClick={() => {
                unselect(data);
              }}
            >
              <IoMdClose />
            </Button>
          </Box>
        )}
      </Center>
    </Box>
  );
};

export default Item;
