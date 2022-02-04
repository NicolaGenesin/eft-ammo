import Head from "next/head";
import { Text, Center, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const GunBuilder = ({ data }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/gun-builder/${data.code}?clone=${data.cloneFromCode}`);
  }, [data.code]);

  return (
    <Box>
      <Head>
        <title>EFT | Gun Builder</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="description" content="Escape from Tarkov Gun Builder 🙌" />
      </Head>
      <Center h="100vh" bg="vulcan.800">
        <Text fontSize="2xl" fontWeight="bold" color="tarkovYellow.100">
          Loading...
        </Text>
      </Center>
    </Box>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const code = uuidv4().replace(/-/g, "");
  const cloneFromCode = context.params.uuid;

  return {
    props: {
      data: { code, cloneFromCode },
    },
  };
}

export default GunBuilder;
