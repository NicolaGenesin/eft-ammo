import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import '@fontsource/Montserrat/400.css'
import '@fontsource/Montserrat/700.css'
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
