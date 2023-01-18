import {
  AspectRatio,
  Box,
  Image,
  Text,
  Center,
  useColorMode,
  Heading,
} from "@chakra-ui/react";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import imageAccueil from "~/assets/accueil-image-1.jpg";
import ewanRaf1 from "~/assets/ewan-raf-1.jpg";
import ewanRaf2 from "~/assets/ewan-raf-2.jpg";
import { getUserSession } from "~/session";
import { useCallback, useState } from "react";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getUserSession(request);
  return json({
    loginType: session.get("LoginType"),
  });
};

export default function Acceuil() {
  const [isEasterEgg, setIsEasterEgg] = useState(false);
  const { toggleColorMode } = useColorMode();
  const { loginType } = useLoaderData<typeof loader>();
  const isMariage = loginType === "mariage";

  const handleEasterEgg = useCallback(() => {
    toggleColorMode();
    setIsEasterEgg(true);
    setTimeout(() => {
      setIsEasterEgg(false);
    }, 3000);
  }, [isEasterEgg, toggleColorMode]);

  console.log("isEasterEgg", isEasterEgg);

  if (isEasterEgg) {
    return (
      <>
        <Box width="50%" marginTop={16}>
          <Heading size="2xl" style={{ textAlign: "center" }}>
            Le vrai mariage de Ewan ❤️
          </Heading>
          <Text align="center" mt={16}>
            Si vous trouvez cette page c'est que vous êtes convié au vertiable
            mariage du 24 Juin 2023 qui verra s'unir Ewan et Raphaël dans
            l'amour et le bonheur pour des siècles et des siecles.
          </Text>
          <Text align="center" pt={4}>
            Surtout mettez vous à l'aise, l'ambiance promet d'être festive.
          </Text>
          <Text align="center" pt="4">
            A très vite,
          </Text>
          <Text align="center" pt="4">
            Ewan et son veritable amour
          </Text>
          <Center
            marginTop={16}
            display="flex"
            flexDir="row"
            justifyContent="space-evenly"
          >
            <Image src={ewanRaf1} borderRadius={16} width="45%" />
            <Image src={ewanRaf2} borderRadius={16} width="45%" />
          </Center>
        </Box>
      </>
    );
  }

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
          autant de vous mettre à l'aise pour vous amuser{" "}
          {isMariage
            ? `et danser jusqu'au
          bout de la nuit ! Nous offrons en récompense un copieux dîner et une soirée de folie
          sur le dancefloor.`
            : "!"}
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
        <Center mt={12}>
          <Box
            as="button"
            display="flex"
            flexDir="column"
            color="gray.400"
            onClick={handleEasterEgg}
            alignItems="center"
          >
            <ArrowUpIcon />
            <Text>Retour au début</Text>
          </Box>
        </Center>
      </Box>
    </>
  );
}
