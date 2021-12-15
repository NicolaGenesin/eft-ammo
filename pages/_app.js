import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import '@fontsource/Montserrat'
import { SmallFooterWithSocial } from "../components/SmallFooterWithSocial";


const theme = extendTheme({
    fonts: {
        heading: 'Montserrat',
        body: 'Montserrat',
    },
});

const App = ({ Component, pageProps }) => (
    <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <SmallFooterWithSocial />
    </ChakraProvider>
);

export default App;
