import React from "react";
import {
  Box,
  VStack,
  Center,
  Flex,
  Text
} from "@chakra-ui/react";

const DesktopTable = ({
  componentState,
}) => {
  return (
    <>
      <Center>
        <VStack spacing={0} w="80%" mx="24px">
          {Object.keys(componentState.results).map((key, index) => {
            const currentTable = componentState.results[key];
            return (
              <>
                <br />
                <Text fontWeight="bold" pb={4} textAlign="center">{currentTable.title}</Text>
                <Box w={index > 1 ? "50%" : "100%"} rounded="md" padding={2} bg='#ccc'>
                  {currentTable.rows.map((tableRow, rowIndex) => {
                    return (
                      <Box
                        key={`row-${rowIndex}`}
                        w="100%"
                      >
                        <Flex bg={rowIndex % 2 === 0 ? "vulcan.900" : "vulcan.850"}>
                          {
                            tableRow.map((item, columnIndex) => {
                              return (
                                <Center
                                  color="black"
                                  flex={columnIndex < 2 ? "1" : "1"}
                                  fontWeight={columnIndex < 1 || rowIndex === 0 ? "semibold" : "normal"}
                                  background={item.backgroundColor || 'white'}
                                  textAlign="center" fontSize='sm'>
                                  {item.value}
                                </Center>
                              )
                            })
                          }
                        </Flex>
                      </Box>
                    );
                  })}
                </Box>
              </>
            )
          })}
        </VStack>
      </Center>
    </>
  );
};

const TableWrapper = ({ isMobile, componentState }) => (
  <DesktopTable
    componentState={componentState}
    isMobile={isMobile}
  />
)

export default TableWrapper;
