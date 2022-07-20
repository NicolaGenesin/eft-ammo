import {
  Th,
  Table,
  TableCaption,
  Tbody,
  Thead,
  Td,
  Tr,
  Center,
} from "@chakra-ui/react";
import { getColor } from "../utils/getColor";

const translations = {
  en: {
    tableCaption: "Note this is just a comparison guideline on what you should use and not always exactly representative of it\'s true # of shots performance against armor.",
    header1: "Value",
    header2: "Effectiveness",
    header3: "Avg Shots Stopped By Armor Before Killing",
    header4: "Description",
    effectiveness1: "Pointless",
    effectiveness2: "It's Possible, But...",
    effectiveness3: "Magdump Only",
    effectiveness4: "Slightly Effective",
    effectiveness5: "Effective",
    effectiveness6: "Very Effective",
    effectiveness7: "Basically Ignores",
    avgShots1: "20+",
    avgShots2: "13 to 20",
    avgShots3: "9 to 13",
    avgShots4: "5 to 9",
    avgShots5: "3 to 5",
    avgShots6: "1 to 3",
    avgShots7: "<1",
    description1: "Can't penetrate in any reasonable amount of hits",
    description2: "Typically doesn't penetrate at all for a large number of hits, or starts with a very low chance and barely increases",
    description3: "Has a very low or no penetration chance intially and very slowly gains chance",
    description4: "Has a low penetration chance intially and slowly gains chance, or quickly damages armor until it penetrates",
    description5: "Starts with a low-medium penetration chance but quickly increases",
    description6: "Penetrates a large percent of the time intially, often quickly going to >90%",
    description7: "Initially penetrates >80% of the time",
  },
  es: {
    tableCaption: "Nota: Esto es solo una guía de comparación sobre lo que deberías usar y no representa exactamente la eficacia de los disparos contra las armaduras.",
    header1: "Valor",
    header2: "Efectividad",
    header3: "Media de disparos parados por la armadura antes de matar",
    header4: "Descripción",
    effectiveness1: "Inútil",
    effectiveness2: "Es posible, pero...",
    effectiveness3: "Cargador Entero",
    effectiveness4: "Moderadamente Efectiva",
    effectiveness5: "Efectiva",
    effectiveness6: "Muy Efectiva",
    effectiveness7: "Ignora Armadura",
    avgShots1: "20+",
    avgShots2: "13 a 20",
    avgShots3: "9 a 13",
    avgShots4: "5 a 9",
    avgShots5: "3 a 5",
    avgShots6: "1 a 3",
    avgShots7: "<1",
    description1: "No va a penetrar ésta armadura en un número razonable de disparos.",
    description2: "Habitualmente no va a penetrar la armadura durante un buen número de disparos, o tiene poca probabilidad.",
    description3: "Tiene muy poca posibilidad de penetración inicialmente pero se va incrementando poco a poco.",
    description4: "Tiene poca posibilidad de penetración inicial, pero gana rapidez o hace daño rápido a la armadura hasta penetrar.",
    description5: "Comienza con una penetración baja-media pero rápidamente se incrementa.",
    description6: "Una gran mayoría de veces penetra inicialmente, rápidamente se incrementa la penetración hasta más del 90%",
    description7: "Penetrará el 80% de las veces la armadura.",
  }
}

const Legenda = ({ isDesktop, language = 'en' }) => {
  return (
    <Table
      variant="unstyled"
      size="sm"
      bg="vulcan.900"
      color="tarkovYellow.100"
    >
      <TableCaption color="tarkovYellow.100">
        {translations[language].tableCaption}
      </TableCaption>
      <Thead>
        <Tr>
          <Th bg="vulcan.800" color="tarkovYellow.100">
            {translations[language].header1}
          </Th>
          <Th bg="vulcan.800" color="tarkovYellow.100">
            {translations[language].header2}
          </Th>
          <Th bg="vulcan.800" color="tarkovYellow.100">
            {translations[language].header3}
          </Th>
          {isDesktop && (
            <Th bg="vulcan.800" color="tarkovYellow.100">
              {translations[language].header4}
            </Th>
          )}
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td bg={getColor(0)} color="black" fontSize="md">
            <Center>0</Center>
          </Td>
          <Td>{translations[language].effectiveness1}</Td>
          <Td>{translations[language].avgShots1}</Td>
          {isDesktop && (
            <Td>{translations[language].description1}</Td>
          )}
        </Tr>
        <Tr>
          <Td bg={getColor(1)} color="black" fontSize="md">
            <Center>1</Center>
          </Td>
          <Td>{translations[language].effectiveness2}</Td>
          <Td>{translations[language].avgShots2}</Td>
          {isDesktop && (
            <Td>
              {translations[language].description2}
            </Td>
          )}
        </Tr>
        <Tr>
          <Td bg={getColor(2)} color="black" fontSize="md">
            <Center>2</Center>
          </Td>
          <Td>{translations[language].effectiveness3}</Td>
          <Td>{translations[language].avgShots3}</Td>
          {isDesktop && (
            <Td>
              {translations[language].description3}
            </Td>
          )}
        </Tr>
        <Tr>
          <Td bg={getColor(3)} color="black" fontSize="md">
            <Center>3</Center>
          </Td>
          <Td>{translations[language].effectiveness4}</Td>
          <Td>{translations[language].avgShots4}</Td>
          {isDesktop && (
            <Td>
              {translations[language].description4}
            </Td>
          )}
        </Tr>
        <Tr>
          <Td bg={getColor(4)} color="black" fontSize="md">
            <Center>4</Center>
          </Td>
          <Td>{translations[language].effectiveness5}</Td>
          <Td>{translations[language].avgShots5}</Td>
          {isDesktop && (
            <Td>
              {translations[language].description5}
            </Td>
          )}
        </Tr>
        <Tr>
          <Td bg={getColor(5)} color="black" fontSize="md">
            <Center>5</Center>
          </Td>
          <Td>{translations[language].effectiveness6}</Td>
          <Td>{translations[language].avgShots6}</Td>
          {isDesktop && (
            <Td>
              {translations[language].description6}
            </Td>
          )}
        </Tr>
        <Tr>
          <Td bg={getColor(6)} color="black" fontSize="md">
            <Center>6</Center>
          </Td>
          <Td>{translations[language].effectiveness7}</Td>
          <Td>{translations[language].avgShots7}</Td>
          {isDesktop && <Td>{translations[language].description7}</Td>}
        </Tr>
      </Tbody>
    </Table>
  );
};

export default Legenda;
