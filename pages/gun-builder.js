import Head from "next/head";
import { Text, Center, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Loading from "../components/Loading";

const GunBuilder = () => {
  const router = useRouter();

  useEffect(() => {
    const code = uuidv4().replace(/-/g, "");

    router.push(`${router.asPath}/${code}`);
  }, []);

  return (
    <Box>
      <Head>
        <title>EFT | Gun Builder</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="description" content="Escape from Tarkov Gun Builder 🙌" />
      </Head>
      <Loading />
    </Box>
  );
};

export default GunBuilder;
