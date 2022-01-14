import React, { useState } from "react";
import Chart from "../components/Chart";
import { Button, Center, Wrap, WrapItem } from "@chakra-ui/react";

const ChartWrapper = ({ results }) => {
  const [state, setState] = useState({
    classDefeated: undefined,
  });

  return (
    <>
      <Chart results={results} classDefeated={state.classDefeated} />
      <Center mt="16px">
        <Wrap justify="center">
          {[...Array(7)]
            .map((_, i) => 0 + i)
            .map((index) => {
              return (
                <WrapItem key={`wrap-item-${index}`}>
                  <Button
                    size={"sm"}
                    colorScheme={index === 0 ? "red" : "orange"}
                    onClick={() => {
                      setState({
                        ...state,
                        classDefeated: index,
                      });
                    }}
                  >
                    {index === 0 ? "Reset" : `Defeats CLASS ${index}`}
                  </Button>
                </WrapItem>
              );
            })}
        </Wrap>
      </Center>
    </>
  );
};

export default ChartWrapper;
