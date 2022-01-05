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
} from "@chakra-ui/react";
import DesktopRow from "./DesktopRow";

const CompareModal = ({ selectedAmmos, onClose }) => {
  return (
    <>
      <Modal isOpen={true} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent bg="vulcan.900" color="white">
          <ModalHeader>Compare</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DesktopRow
              category=""
              allAmmosForCategory={selectedAmmos}
              minimalView={true}
              currentSearch=""
              selectedAmmos={[]}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CompareModal;
