import {
  Box,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tfoot,
  Td,
  Th,
  Tr,
  Image,
  Center,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

const ModalTable = ({ items, setItem }) => {
  const [state, setstate] = useState({ currentSearch: undefined });

  let filteredItems = [...items];

  if (state.currentSearch) {
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(state.currentSearch.toLowerCase())
    );
  }

  return (
    <Box>
      <Center w="100%">
        <Input
          color="tarkovYellow.100"
          textAlign="center"
          borderColor="#dbc59c"
          borderRadius="0"
          _focus={{ borderColor: "#dbc59c" }}
          placeholder="Search by name"
          _placeholder={{ color: "tarkovYellow.100", textAlign: "center" }}
          onChange={(e) => {
            setstate({
              ...state,
              currentSearch: e.target.value,
            });
          }}
        />
      </Center>
      <Table variant="unstyled" mt="24px">
        <Tbody>
          {filteredItems.map((item, index) => {
            return (
              <Tr
                key={`tr-${index}`}
                onClick={() => setItem(item)}
                transitionProperty="shadow"
                transitionDuration="1"
                transitionTimingFunction="ease-in-out"
                _hover={{ shadow: "lg", bg: "vulcan.900" }}
              >
                <Td w="100px" pl="8px" pr="0" py="8px">
                  <Box h="64px" w="64px">
                    <Image
                      boxSize="64px"
                      src={item.gridImageLink}
                      objectFit="contain"
                    />
                  </Box>
                </Td>
                <Td p="0">{item.name}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ModalTable;
