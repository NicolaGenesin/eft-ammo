import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Accordion,
  AccordionItem,
} from "@chakra-ui/react";
import DesktopRow from "./DesktopRow";

const CompareModal = ({ selectedAmmos, onClose }) => {
  return (
    <>
      <Modal isOpen={true} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent bg="vulcan.900" color="tarkovYellow.100">
          <ModalHeader>Selected Ammunitions:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Accordion defaultIndex={0}>
              <AccordionItem border="none">
                <DesktopRow
                  category=""
                  allAmmosForCategory={selectedAmmos}
                  minimalView={true}
                  currentSearch=""
                  selectedAmmos={[]}
                />
              </AccordionItem>
            </Accordion>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CompareModal;
