import React, { useState, useEffect } from 'react';
import Head from "next/head";
import { Tooltip, Divider, Flex, Center, Text, Image, Box, Input } from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import getResults from '../utils/getResults';
import getColor from '../utils/getColor';
import headers from '../utils/headers';
import Legenda from '../components/legenda';

const App = () => {
    const [componentState, setComponentState] = useState({
        currentSearch: '',
        results: {}
    });

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
                    color='white'
                    fontWeight='bold'
                    fontSize='4xl'
                    my='24px'
                >
                    NoFoodAfterMidnight's Quick Reference Sheet
                </Text>
            </Center>

            <Center>
                <Flex pt='24px' w='50%'>
                    <Legenda />
                </Flex>
            </Center>

            <Center py='64px'>
                <Input
                    w='50%'
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
            {
                keysFilteredByWeaponName.map(key => {
                    const allAmmosForKey = componentState.results[key]

                    return (
                        <Box
                            color='white'
                            mx='24px'
                            mb='24px'
                            rounded='sm'
                            border="12px solid"
                            borderColor="#333"
                        >
                            <Flex>
                                <Center bg='#333' h='64px'>
                                    <Text
                                        fontWeight='bold'
                                        minW='300px'
                                        fontSize='2xl'
                                        px='8px'
                                        style={{
                                            whiteSpace: 'nowrap'
                                        }}>
                                        {key}
                                    </Text>
                                </Center>
                                {
                                    headers.map(header => {
                                        return (
                                            <Center
                                                flex={header.toLowerCase().includes('class') ? '0.5' : '1'}
                                                bg='#272712'>
                                                <Text
                                                    fontWeight='semibold'
                                                    fontSize='xs'
                                                >
                                                    {header.toUpperCase()}
                                                </Text>
                                            </Center>
                                        )
                                    })
                                }
                            </Flex>
                            {
                                allAmmosForKey.map(ammo => {
                                    let toolTipLabel = undefined

                                    if (ammo.note) {
                                        toolTipLabel = ammo.note
                                    } else if (ammo.secondNote) {
                                        toolTipLabel = ammo.secondNote
                                    } else if (ammo.note && ammo.secondNote) {
                                        toolTipLabel = `${ammo.note} ${ammo.secondNote}`
                                    }

                                    return (
                                        <>
                                            <Flex
                                                fontSize='xs'
                                                fontWeight='normal'
                                                bg='#585856'
                                            >
                                                <Flex minW="300px" bg='#454545' py='2px'>
                                                    <Center>
                                                        <Image
                                                            ml='8px'
                                                            boxSize='48px'
                                                            objectFit='cover'
                                                            src={`./images/${key}@${ammo.name}.png`}
                                                            alt={ammo.name}
                                                            fallbackSrc={`./images/fallback.png`}
                                                        />
                                                    </Center>
                                                    <Center>
                                                        <Text
                                                            fontSize='xs'
                                                            fontWeight='semibold'
                                                            ml="8px">
                                                            {ammo.name.toUpperCase()}
                                                        </Text>
                                                        {toolTipLabel &&
                                                            <Tooltip bg='#272712' label={toolTipLabel}>
                                                                <InfoOutlineIcon ml='8px' />
                                                            </Tooltip>
                                                        }
                                                    </Center>
                                                </Flex>
                                                <Center flex='1' >
                                                    <Text fontSize='md' color='white'>{ammo.damage}</Text>
                                                </Center>
                                                <Center flex='1' >
                                                    <Text fontSize='md' color='white'>{ammo.penValue}</Text>
                                                </Center>
                                                <Center flex='1' >
                                                    <Text fontSize='md' color='white'>{ammo.armorDamage}</Text>
                                                </Center>
                                                <Center flex='1'>
                                                    <Text fontSize='md' color='white'>{ammo.fragChange}</Text>
                                                </Center>
                                                <Center flex='0.5' bg={getColor(ammo.class1)}>
                                                    <Text fontSize='md' color='black'>{ammo.class1}</Text>
                                                </Center>
                                                <Center flex='0.5' bg={getColor(ammo.class2)}>
                                                    <Text fontSize='md' color='black'>{ammo.class2}</Text>
                                                </Center>
                                                <Center flex='0.5' bg={getColor(ammo.class3)}>
                                                    <Text fontSize='md' color='black'>{ammo.class3}</Text>
                                                </Center>
                                                <Center flex='0.5' bg={getColor(ammo.class4)}>
                                                    <Text fontSize='md' color='black'>{ammo.class4}</Text>
                                                </Center>
                                                <Center flex='0.5' bg={getColor(ammo.class5)}>
                                                    <Text fontSize='md' color='black'>{ammo.class5}</Text>
                                                </Center>
                                                <Center flex='0.5' bg={getColor(ammo.class6)}>
                                                    <Text fontSize='md' color='black'>{ammo.class6}</Text>
                                                </Center>
                                            </Flex>
                                            <Divider bg='red.500' />
                                        </>
                                    )
                                })
                            }
                        </Box>
                    )
                })
            }
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
