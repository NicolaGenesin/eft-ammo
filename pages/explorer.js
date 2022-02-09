import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

const builds = [{}, {}, {}];

const Explorer = () => {
  return (
    <Box p="24px">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Build Name</Th>
            <Th>By</Th>
            <Th>Price (Now)</Th>
            <Th>Social Score</Th>
            <Th>Created</Th>
          </Tr>
        </Thead>
        <Tbody>
          {builds.map((build) => {
            return (
              <Tr>
                <Td>Best Build</Td>
                <Td>Filodreamz</Td>
                <Td>250000 ₽</Td>
                <Td>0</Td>
                <Td>12/12/2022</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Explorer;
