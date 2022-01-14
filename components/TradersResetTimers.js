import React, { useState } from "react";
import {
  Box,
  Text,
  Wrap,
  WrapItem,
  VStack,
  HStack,
  Center,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import Countdown from "react-countdown";

const Renderer = (props) => {
  if (props.completed) {
    return <span>Restock right now</span>;
  }

  return (
    <>
      <Text textAlign={"center"}>
        Restock in
        <br />
        {props.formatted.hours}:{props.formatted.minutes}:
        {props.formatted.seconds}
      </Text>
    </>
  );
};

const TradersResetTimers = ({ trader }) => {
  const { status, data } = useQuery(`server-status`, () =>
    fetch("https://tarkov-tools.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: dataQuery,
    }).then((response) => response.json())
  );

  const dataQuery = JSON.stringify({
    query: `{
        traderResetTimes {
            name
            resetTimestamp
        }
    }`,
  });

  if (status !== "success" || !data.data.traderResetTimes) {
    return null;
  }

  if (status === "success" && data.data.traderResetTimes.length === 0) {
    return "No data";
  }

  return (
    <Center py="24px">
      <Wrap
        bg="vulcan.900"
        p="16px"
        justify="center"
        align="center"
        spacing="30px"
      >
        {data.data &&
          data.data.traderResetTimes.map((resetTime) => {
            return (
              <WrapItem color="tarkovYellow.100">
                <VStack>
                  <picture>
                    {/* <source
                        srcSet={encodeURIComponent(imageURL)}
                        type="image/webp"
                    /> */}
                    <img
                      style={{
                        objectFit: "cover",
                      }}
                      width={"64px"}
                      height={"64px"}
                      src={encodeURIComponent(
                        `/traders/${resetTime.name}.jpeg`
                      )}
                      alt={resetTime.name}
                      loading="lazy"
                    />
                  </picture>
                  <Text textTransform={"capitalize"} fontWeight={"bold"}>
                    {resetTime.name}
                  </Text>
                  <Countdown
                    date={resetTime.resetTimestamp}
                    renderer={Renderer}
                  />
                </VStack>
              </WrapItem>
            );
          })}
      </Wrap>
    </Center>
  );
};

export default TradersResetTimers;
