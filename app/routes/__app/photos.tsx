import { Box, Image, Text, Center, Button } from "@chakra-ui/react";

export default function Acceuil() {
  return (
    <Box marginTop={16}>
      <Button>
        <a
          href="https://drive.google.com/drive/folders/1vBkYCzYydqnx3Ad2CMUTW7-ai5JXUtol?usp=share_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          J'accède au drive des photos
        </a>
      </Button>
    </Box>
  );

  // return (
  //   <Box marginTop={16}>
  //     <Text align="center">
  //       Il n'y a aucune photo disponibles pour l'instant 🥲
  //     </Text>
  //   </Box>
  // );
}
