import React, { useState, useEffect } from 'react';
import Head from "next/head";
import { useBreakpointValue } from '@chakra-ui/react'
import { Accordion, AccordionItem, Flex, Center, Text, Box, Input, } from '@chakra-ui/react'
import getResults from '../utils/getResults';
import Legenda from '../components/Legenda';
import MobileRow from '../components/MobileRow';
import DesktopRow from '../components/DesktopRow';

const App = () => {
    const [componentState, setComponentState] = useState({
        currentSearch: '',
        results: {}
    });

    const isMobile = useBreakpointValue({ base: true, md: false })

    useEffect(() => {
        getResults()
            .then(response => response.json())
            .then(
                json => {
                    const results = {}

                    Object.keys(json).map(key => {
                        results[key] = json[key].map(
                            ammoSpecs => {
                                return {
                                    name: ammoSpecs[1],
                                    damage: ammoSpecs[3],
                                    penValue: ammoSpecs[4],
                                    armorDamage: ammoSpecs[5],
                                    fragChange: ammoSpecs[6],
                                    class1: ammoSpecs[7],
                                    class2: ammoSpecs[8],
                                    class3: ammoSpecs[9],
                                    class4: ammoSpecs[10],
                                    class5: ammoSpecs[11],
                                    class6: ammoSpecs[12],
                                    note: ammoSpecs[13],
                                    secondNote: ammoSpecs[14],
                                }
                            }
                        )
                    })

                    setComponentState({
                        results
                    })
                }
            )
    }, []);

    const keys = Object.keys(componentState.results)
    let keysFilteredByWeaponName = keys

    if (componentState.currentSearch && componentState.currentSearch.length) {
        keysFilteredByWeaponName = keys.filter(weaponName => weaponName.toLowerCase().includes(componentState.currentSearch.toLowerCase()))

        keys.forEach(weaponName => {
            const weapon = componentState.results[weaponName]

            weapon.forEach(ammo => {
                if (ammo.name.toLowerCase().includes(componentState.currentSearch.toLowerCase())) {
                    if (!keysFilteredByWeaponName.includes(weaponName)) {
                        keysFilteredByWeaponName.push(weaponName)
                    }
                }
            })
        })
    }

    return (
        <Box pt='24px'>
            <Head>
                <title>NoFoodAfterMidnight's EFT Ammo and Armor Charts</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Center>
                <Text
                    textAlign='center'
                    color='white'
                    fontWeight='bold'
                    fontSize={['xl', '4xl']}
                    my='24px'
                >
                    NoFoodAfterMidnight's Quick Reference Sheet
                </Text>
            </Center>

            <Center>
                <Flex pt='24px'>
                    <Legenda />
                </Flex>
            </Center>

            <Center py='64px'>
                <Input
                    w={['100%', '50%']}
                    mx='24px'
                    bg="#fff"
                    color="#333"
                    textAlign='center'
                    borderColor="#9a8866"
                    _focus={{ borderColor: "#9a8866" }}
                    placeholder="Search by Category or Ammo type"
                    _placeholder={{ color: "#333", textAlign: 'center' }}
                    onChange={(e) => {
                        setComponentState({
                            currentSearch: e.target.value,
                            results: componentState.results
                        })
                    }}
                />
            </Center>
            <Accordion defaultIndex={[0]} allowMultiple>
                {
                    keysFilteredByWeaponName.map(key => {
                        const allAmmosForCategory = componentState.results[key]

                        return (
                            <Box
                                color='white'
                                mx='24px'
                                mb='24px'
                                rounded='sm'
                                border="12px solid"
                                borderColor="#333"
                            >
                                {
                                    isMobile ?
                                        (
                                            <AccordionItem>
                                                <MobileRow category={key} allAmmosForCategory={allAmmosForCategory} />
                                            </AccordionItem>
                                        )
                                        :
                                        <DesktopRow category={key} allAmmosForCategory={allAmmosForCategory} />
                                }
                            </Box>
                        )
                    })
                }
            </Accordion>
            <style jsx global>{`
                html,
                body {
                    background-image: url("./pattern.jpeg") !important;

                    height: 100%;
                    width: 100%;
                  
                    background-position: center;
                    background-size: cover;
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
        </Box>
    )
}

export default App
