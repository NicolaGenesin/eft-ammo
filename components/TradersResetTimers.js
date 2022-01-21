import React, { useState } from "react";
import {
  Box,
  Text,
  Wrap,
  WrapItem,
  VStack,
  HStack,
  Center,
  Link,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import Countdown from "react-countdown";

const Renderer = (props) => {
  if (props.completed) {
    return (
      <Text textAlign="center" fontSize="sm">
        Restock
        <br />
        right now
      </Text>
    );
  }

  return (
    <>
      <Text textAlign="center" fontSize="sm">
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
      <VStack bg="vulcan.900" pb="8px" pt="16px" px="16px" mx="24px">
        <Wrap justify="center" align="center" spacing="30px">
          {data.data &&
            data.data.traderResetTimes.map((resetTime, index) => {
              return (
                <WrapItem color="tarkovYellow.100" key={`timer-${index}`}>
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
                        width={"56px"}
                        height={"56px"}
                        src={encodeURIComponent(
                          `/traders/${resetTime.name}.jpeg`
                        )}
                        alt={resetTime.name}
                        loading="lazy"
                      />
                    </picture>
                    <Text
                      textTransform="capitalize"
                      fontSize="sm"
                      fontWeight="bold"
                    >
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
        <Text w="100%" color="tarkovYellow.100" fontSize="xs" textAlign="right">
          Note: Currently in Beta. Data provided by tarkov-tools.com{" "}
          <Link textDecorationLine="underline" href="https://tarkov-tools.com">
            tarkov-tools
          </Link>
        </Text>
      </VStack>
    </Center>
  );
};

export default TradersResetTimers;
