import { Box, Center } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const GunCanvas = dynamic(() => import("../components/gun-builder/GunCanvas"), {
  ssr: false,
});

const GunBuilder = ({ data }) => {
  return (
    <Center bg="vulcan.900">
      <GunCanvas />
    </Center>
  );
};

export default GunBuilder;
