import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { SmallFooterWithSocial } from "../components/SmallFooterWithSocial";
import Feedback from "../components/Feedback";

const queryClient = new QueryClient();

const theme = extendTheme({
  fonts: {
    heading: "Bender Regular",
    body: "Bender Regular",
  },
  colors: {
    vulcan: {
      800: "#383932",
      900: "#1f1f1e",
    },
    tarkovYellow: {
      100: "#dbc59c",
      // 100: "#dbc59c", real yellow used
    },
  },
});

const App = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <SmallFooterWithSocial />
      <Feedback />
    </QueryClientProvider>
  </ChakraProvider>
);

export default App;
