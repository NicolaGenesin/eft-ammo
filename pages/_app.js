import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import '@fontsource/Montserrat/400.css'
import '@fontsource/Montserrat/700.css'


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
