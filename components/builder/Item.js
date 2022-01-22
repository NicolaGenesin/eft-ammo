import { Box, Center, Image } from "@chakra-ui/react";

const Item = ({ itemType, state, w, h }) => {
  const square = w === h;

  return (
    <Box>
      <Center w={w} h={h} bg="#131313" opacity="0.85">
        {!state && (
          <Box
            position="absolute"
            opacity="0.5"
            w={w}
            h={h}
            bgImage={`url('/builder/item-placeholder${
              square ? "" : "-wide"
            }.jpg')`}
            bgRepeat="repeat"
          />
        )}
        {state && state.gridImageLink && (
          <Image
            style={{ zIndex: "1" }}
            position="relative"
            src={state.gridImageLink}
            // alt="todo" todo
            objectFit="cover"
          />
        )}
      </Center>
    </Box>
  );
};

export default Item;
