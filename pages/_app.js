import * as React from "react";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Footer } from "../components/Footer";
import Sidebar from "../components/Sidebar";

const queryClient = new QueryClient();

const theme = extendTheme({
  fonts: {
    heading: "Bender Regular",
    body: "Bender Regular",
  },
  colors: {
    vulcan: {
      800: "#383932",
      850: "#2a2a29",
      900: "#1f1f1e",
      950: "#191c1c",
      1000: "#131313",
      1050: "#101010",
    },
    tarkovYellow: {
      50: "#877f70",
      100: "#dbc59c",
      // 100: "#dbc59c", real yellow used
    },
    vanishedWhite: {
      100: "#4d5154",
      // 100: "#dbc59c", real yellow used
    },
  },
});

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Box>
          <Sidebar children={<Component {...pageProps} />} />
          <Footer />
        </Box>
        <style jsx global>{`
          html,
          body {
            height: 100% !important;
            width: 100% !important;
            background-image: url(/builder/background.jpg) !important;
            background-repeat: no-repeat !important;
            background-attachment: fixed !important;
            background-size: cover !important;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
