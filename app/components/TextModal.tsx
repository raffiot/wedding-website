import {
  Link,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

type TextModalProps = {
  title: string;
  modalTitle: string;
  image: string;
};

export default function TextModal({
  title,
  image,
  modalTitle,
}: TextModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Link color="teal.500" onClick={onOpen}>
        {title}
      </Link>
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
