import {
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

type EasterHeadingProps = {
  title: string;
  modalTitle: string;
  image: string;
};

export default function EasterHeading({
  title,
  image,
  modalTitle,
}: EasterHeadingProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Heading size="2xl" onClick={onOpen}>
        {title}
      </Heading>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={4}>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={image} borderRadius={16} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
