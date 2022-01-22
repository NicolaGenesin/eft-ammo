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
      <Table variant="simple">
        <Tbody>
          {filteredItems.map((item, index) => {
            return (
              <Tr key={`tr-${index}`} onClick={() => setItem(item)}>
                <Td>
                  <Image src={item.gridImageLink} />
                </Td>
                <Td>{item.name}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ModalTable;
