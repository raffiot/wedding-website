import {
  Box,
  Image,
  Text,
  Center,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
} from "@chakra-ui/react";

export default function Programme_FAQ() {
  return (
    <>
      <Box width="50%" marginTop={16}>
        <Box paddingTop={6}>
          <Text>14h - 15h:</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros
            dui, dapibus a massa eget, sodales luctus quam.
          </Text>
        </Box>
        <Box marginTop={6}>
          <Text>15h - 16h:</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eros
            dui, dapibus a massa eget, sodales luctus quam.
          </Text>
        </Box>
      </Box>
      <Image
        src="https://storage.googleapis.com/margaux-et-ewan-se-marient-assets/carte.png"
        marginTop={16}
        boxSize="400px"
        objectFit="cover"
        borderRadius={16}
      />
    </>
  );
}
