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
  colors: {
    vulcan: {
      500: "#adb5bd",
      600: "#6c757d",
      700: "#495057",
      800: "#343a40",
      900: "#212529",
      1000: "#15171a",
    },
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
