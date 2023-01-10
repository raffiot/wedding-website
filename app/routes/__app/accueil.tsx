import { AspectRatio, Box, Image, Text } from "@chakra-ui/react";
import imageAccueil from "~/assets/accueil-image-1.jpg";

export default function Acceuil() {
  return (
    <>
      <Box width="50%" marginTop={16}>
        <Text align="center">
          Nous sommes ravis de vous convier à notre union que nous célébrerons
          le samedi 24 Juin 2023 au château de Césarges à Maubec.
        </Text>
        <Text align="center" pt="4">
          Nous partagerons sur ce site toutes les informations utiles à propos
          du mariage, du programme aux suggestions d'hôtels, afin que vous
          puissiez profiter au maximum. Si vous avez des questions
          supplémentaires, merci de nous contacter directement.
        </Text>
        <Text align="center" pt="4">
          Nous savons que vous serez tous sur votre 31, mais n'oubliez pas pour
          autant de vous mettre à l'aise pour vous amuser et danser jusqu'au
          bout de la nuit ! Nous offrons en récompense un copieux dîner et une
          soirée de folie sur le dancefloor.
        </Text>
        <Text align="center" pt="4">
          A très vite,
        </Text>
        <Text align="center" pt="4">
          Margaux et Ewan
        </Text>
        <AspectRatio marginTop={16} ratio={4 / 3}>
          <Image src={imageAccueil} objectFit="cover" borderRadius={16} />
        </AspectRatio>
      </Box>
    </>
  );
}
