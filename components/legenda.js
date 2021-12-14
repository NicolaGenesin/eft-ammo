import { Th, Table, TableCaption, Tbody, Thead, Td, Tr, Center } from '@chakra-ui/react'
import getColor from '../utils/getColor';

const Legenda = () => {
    return (
        <Table variant='unstyled' size='sm' bg='#585856' color="white">
            <TableCaption color="white">Note this is just a comparison guideline on what you should use and not always exactly representative of it's true # of shots performance against armor</TableCaption>
            <Thead>
                <Tr>
                    <Th bg='#232323' color="white">Value</Th>
                    <Th bg='#232323' color="white">Effectiveness</Th>
                    <Th bg='#232323' color="white">Estimated Average Shots Stopped By Armor Before Killing</Th>
                    <Th bg='#232323' color="white">Description</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td bg={getColor(0)} color="black" fontSize='md'><Center>0</Center></Td>
                    <Td>Pointless</Td>
                    <Td>20+</Td>
                    <Td>Can't penetrate in any reasonable amount of hits</Td>
                </Tr>
                <Tr>
                    <Td bg={getColor(1)} color="black" fontSize='md'><Center>1</Center></Td>
                    <Td>It's Possible, But...</Td>
                    <Td>13 to 20</Td>
                    <Td>Typically doesn't penetrate at all for a large number of hits, or starts with a very low chance and barely increases</Td>
                </Tr>
                <Tr>
                    <Td bg={getColor(2)} color="black" fontSize='md'><Center>2</Center></Td>
                    <Td>Magdump Only</Td>
                    <Td>9 to 13</Td>
                    <Td>Has a very low or no penetration chance intially and very slowly gains chance</Td>
                </Tr>
                <Tr>
                    <Td bg={getColor(3)} color="black" fontSize='md'><Center>3</Center></Td>
                    <Td>Slightly Effective</Td>
                    <Td>5 to 9</Td>
                    <Td>Has a low penetration chance intially and slowly gains chance, or quickly damages armor until it penetrates</Td>
                </Tr>
                <Tr>
                    <Td bg={getColor(4)} color="black" fontSize='md'><Center>4</Center></Td>
                    <Td>Effective</Td>
                    <Td>3 to 5</Td>
                    <Td>Starts with a low-medium penetration chance but quickly increases</Td>
                </Tr>
                <Tr>
                    <Td bg={getColor(5)} color="black" fontSize='md'><Center>5</Center></Td>
                    <Td>Very Effective</Td>
                    <Td>1 to 3</Td>
                    <Td>Penetrates a large percent of the time intially, often quickly going to {'>'}90%</Td>
                </Tr>
                <Tr>
                    <Td bg={getColor(6)} color="black" fontSize='md'><Center>6</Center></Td>
                    <Td>Basically Ignores</Td>
                    <Td>{'<'}1</Td>
                    <Td>Initially penetrates {'>'}80% of the time</Td>
                </Tr>
            </Tbody>
        </Table>
    )
}

export default Legenda
