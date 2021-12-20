import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/montserrat";
import { SmallFooterWithSocial } from "../components/SmallFooterWithSocial";
import Feedback from "../components/Feedback";

const theme = extendTheme({
  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
  },
});

const App = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <Component {...pageProps} />
    <SmallFooterWithSocial />
    <Feedback />
  </ChakraProvider>
);

export default App;
