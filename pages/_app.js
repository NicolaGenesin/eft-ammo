import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: 'Montserrat',
        body: 'Montserrat',
    },
});

const App = ({ Component, pageProps }) => (
    <ChakraProvider theme={theme}>
        <Component {...pageProps} />
    </ChakraProvider>
);

export default App;
