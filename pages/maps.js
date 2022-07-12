import Head from "next/head";
import {
    Box,
    Center,
    Text,
    useBreakpointValue,
    Image,
    SimpleGrid,
    VStack
} from "@chakra-ui/react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const Timers = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box>
            <Head>
                <title>EFT | Maps</title>
                <link rel="icon" href="/favicon.ico" />

                <meta
                    name="description"
                    content="Escape from Tarkov Maps 🙌"
                />
            </Head>
            <Box
                style={{
                    position: "fixed",
                }}
            >
                {!isMobile && (
                    <Text fontSize="7xl" fontWeight="bold" opacity="0.15" ml="24px">
                        Maps
                    </Text>
                )}
            </Box>
            <Center py={16} color='red'>
                <VStack spacing={8} mx={12}>
                    <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.6)" wrapStyle={{ width: '30%' }}>
                        <VStack>
                            <Image src='/assets/maps/customs.webp' />
                            <Text fontWeight='bold' color='tarkovYellow.100'>Customs - by reemr.se</Text>
                        </VStack>
                    </Zoom>
                    <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.6)" wrapStyle={{ width: '30%' }}>
                        <VStack>
                            <Image src='/assets/maps/customs-2d.webp' />
                            <Text fontWeight='bold' color='tarkovYellow.100'>Customs 2D - by TacticalOtter</Text>
                        </VStack>
                    </Zoom>
                    <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.6)" wrapStyle={{ width: '30%' }}>
                        <VStack>
                            <Image src='/assets/maps/customs-monki.jpeg' />
                            <Text fontWeight='bold' color='tarkovYellow.100'>Customs 2D - by monkimonkimonk</Text>
                        </VStack>
                    </Zoom>
                    <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.6)" wrapStyle={{ width: '30%' }}>
                        <VStack>
                            <Image src='/assets/maps/customs-dorms.webp' />
                            <Text fontWeight='bold' color='tarkovYellow.100'>Customs - Dorms</Text>
                        </VStack>
                    </Zoom>
                    <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.6)" wrapStyle={{ width: '30%' }}>
                        <VStack>
                            <Image src='/assets/maps/factory.webp' />
                            <Text fontWeight='bold' color='tarkovYellow.100'>Factory</Text>
                        </VStack>
                    </Zoom>
                    <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.6)" wrapStyle={{ width: '30%' }}>
                        <VStack>
                            <Image src='/assets/maps/interchange.jpeg' />
                            <Text fontWeight='bold' color='tarkovYellow.100'>Interchange</Text>
                        </VStack>
                    </Zoom>
                    <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.6)" wrapStyle={{ width: '30%' }}>
                        <VStack>
                            <Image src='/assets/maps/interchange-stashes.jpeg' />
                            <Text fontWeight='bold' color='tarkovYellow.100'>Interchange Stashes</Text>
                        </VStack>
                    </Zoom>
                    <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.6)" wrapStyle={{ width: '30%' }}>
                        <VStack>
                            <Image src='/assets/maps/labs.webp' />
                            <Text fontWeight='bold' color='tarkovYellow.100'>Labs</Text>
                        </VStack>
                    </Zoom>
                    <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.6)" wrapStyle={{ width: '30%' }}>
                        <VStack>
                            <Image src='/assets/maps/lighthouse.jpeg' />
                            <Text fontWeight='bold' color='tarkovYellow.100'>Lighthouse</Text>
                        </VStack>
                    </Zoom>
                    <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.6)" wrapStyle={{ width: '30%' }}>
                        <VStack>
                            <Image src='/assets/maps/lighthouse-2d.webp' />
                            <Text fontWeight='bold' color='tarkovYellow.100'>Lighthouse 2D - by Kokarn & Jindouz</Text>
                        </VStack>
                    </Zoom>
                    <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.6)" wrapStyle={{ width: '30%' }}>
                        <VStack>
                            <Image src='/assets/maps/lighthouse-landscape.jpeg' />
                            <Text fontWeight='bold' color='tarkovYellow.100'>Lighthouse landscape - by Jindouz</Text>
                        </VStack>
                    </Zoom>
                    <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.6)" wrapStyle={{ width: '30%' }}>
                        <VStack>
                            <Image src='/assets/maps/reserve.jpeg' />
                            <Text fontWeight='bold' color='tarkovYellow.100'>Reserve - by reemr.se</Text>
                        </VStack>
                    </Zoom>
                    <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.6)" wrapStyle={{ width: '30%' }}>
                        <VStack>
                            <Image src='/assets/maps/underground.webp' />
                            <Text fontWeight='bold' color='tarkovYellow.100'>Underground - by reemr.se</Text>
                        </VStack>
                    </Zoom>
                    <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.6)" wrapStyle={{ width: '30%' }}>
                        <VStack>
                            <Image src='/assets/maps/shoreline.webp' />
                            <Text fontWeight='bold' color='tarkovYellow.100'>Shoreline</Text>
                        </VStack>
                    </Zoom>
                    <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.6)" wrapStyle={{ width: '30%' }}>
                        <VStack>
                            <Image src='/assets/maps/shoreline-resort.jpeg' />
                            <Text fontWeight='bold' color='tarkovYellow.100'>Shoreline - Resort</Text>
                        </VStack>
                    </Zoom>
                    <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.6)" wrapStyle={{ width: '30%' }}>
                        <VStack>
                            <Image src='/assets/maps/woods.jpeg' />
                            <Text fontWeight='bold' color='tarkovYellow.100'>Woods - by Jindouz</Text>
                        </VStack>
                    </Zoom>
                </VStack>
            </Center>
        </Box>
    );
};

export default Timers;
