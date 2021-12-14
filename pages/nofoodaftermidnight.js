import React, { useState, useEffect } from 'react';
import Head from "next/head";
import { useBreakpointValue } from '@chakra-ui/react'
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Tooltip, Divider, Flex, Center, Text, Image, Box, Input, VStack, Spacer, HStack } from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import getResults from '../utils/getResults';
import getColor from '../utils/getColor';
import headers from '../utils/headers';
import Legenda from '../components/legenda';

const MobileView = ({ category, allAmmosForCategory }) => {
    return (
        <Box bg='#333'>
            <AccordionButton >
                <Center h='64px'>
                    <Text
                        w='100%'
                        fontWeight='bold'
                        fontSize='2xl'
                        px='8px'
                        style={{
                            whiteSpace: 'nowrap'
                        }}>
                        {category}
                    </Text>
                </Center>
                <Spacer />
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pt={4} px={0}>
                <Flex color='white' direction='column'>
                    {
                        allAmmosForCategory.map(ammo => {
                            return (
                                <Box bg='#3C3C3C' mb='12px' p='8px'>
                                    <HStack>
                                        <Center>
                                            <Image
                                                boxSize='48px'
                                                objectFit='cover'
                                                src={`./images/${category}@${ammo.name}.png`}
                                                alt={ammo.name}
                                                fallbackSrc={`./images/fallback.png`}
                                            />
                                        </Center>
                                        <Center>
                                            <Text
                                                fontSize='sm'
                                                fontWeight='semibold'
                                                ml="8px">
                                                {ammo.name.toUpperCase()}
                                            </Text>
                                        </Center>
                                    </HStack>
                                    <HStack mt='8px' fontSize='xs' justify='space-around'>
                                        <VStack spacing='0'>
                                            <Center bg='#232314' p='2px'>
                                                DMG
                                            </Center>
                                            <Center bg='#4E4E4C' w='100%'>
                                                {ammo.damage}
                                            </Center>
                                        </VStack>
                                        <VStack spacing='0'>
                                            <Center bg='#232314' p='2px'>
                                                PEN VALUE
                                            </Center>
                                            <Center bg='#4E4E4C' w='100%'>
                                                {ammo.penValue}
                                            </Center>
                                        </VStack>
                                        <VStack spacing='0'>
                                            <Center bg='#232314' p='2px'>
                                                ARMOR DMG
                                            </Center>
                                            <Center bg='#4E4E4C' w='100%'>
                                                {ammo.armorDamage}
                                            </Center>
                                        </VStack>
                                        <VStack spacing='0'>
                                            <Center bg='#232314' p='2px'>
                                                FRAG %
                                            </Center>
                                            <Center bg='#4E4E4C' w='100%'>
                                                {ammo.fragChange}
                                            </Center>
                                        </VStack>
                                    </HStack>
                                    <HStack mt='8px' fontSize='xs' justify='space-around'>
                                        <VStack spacing='0' w='100%'>
                                            <Center bg='#232314' w='100%' p='1px'>
                                                C1
                                            </Center>
                                            <Center bg={getColor(ammo.class1)} color='black' w='100%'>
                                                {ammo.class1}
                                            </Center>
                                        </VStack>
                                        <VStack spacing='0' w='100%'>
                                            <Center bg='#232314' w='100%' p='1px'>
                                                C2
                                            </Center>
                                            <Center bg={getColor(ammo.class2)} color='black' w='100%'>
                                                {ammo.class2}
                                            </Center>
                                        </VStack>
                                        <VStack spacing='0' w='100%'>
                                            <Center bg='#232314' w='100%' p='1px'>
                                                C3
                                            </Center>
                                            <Center bg={getColor(ammo.class3)} color='black' w='100%'>
                                                {ammo.class3}
                                            </Center>
                                        </VStack>
                                        <VStack spacing='0' w='100%'>
                                            <Center bg='#232314' w='100%' p='1px'>
                                                C4
                                            </Center>
                                            <Center bg={getColor(ammo.class4)} color='black' w='100%'>
                                                {ammo.class4}
                                            </Center>
                                        </VStack>
                                        <VStack spacing='0' w='100%'>
                                            <Center bg='#232314' w='100%' p='1px'>
                                                C5
                                            </Center>
                                            <Center bg={getColor(ammo.class5)} color='black' w='100%'>
                                                {ammo.class5}
                                            </Center>
                                        </VStack>
                                        <VStack spacing='0' w='100%'>
                                            <Center bg='#232314' w='100%' p='1px'>
                                                C6
                                            </Center>
                                            <Center bg={getColor(ammo.class6)} color='black' w='100%'>
                                                {ammo.class6}
                                            </Center>
                                        </VStack>
                                    </HStack>
                                </Box>
                            )
                        })
                    }
                </Flex>
            </AccordionPanel>
        </Box>
    )
}

const DesktopView = ({ category, allAmmosForCategory }) => {
    return (
        <>
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
                        {category}
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
                allAmmosForCategory.map(ammo => {
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
                                            src={`./images/${category}@${ammo.name}.png`}
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
        </>
    )
}

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
                                                <MobileView category={key} allAmmosForCategory={allAmmosForCategory} />
                                            </AccordionItem>
                                        )
                                        :
                                        <DesktopView category={key} allAmmosForCategory={allAmmosForCategory} />
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
