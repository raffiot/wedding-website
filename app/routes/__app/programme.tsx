import { AspectRatio, Box, Link, Text, Image } from "@chakra-ui/react";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserSession } from "~/session";
import imageChateau from "~/assets/chateau.png";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getUserSession(request);
  return json({
    loginType: session.get("LoginType"),
  });
};

export default function Programme() {
  const { loginType } = useLoaderData<typeof loader>();
  const isMariage = loginType === "mariage";

  return (
    <>
      <Box width="50%" marginTop={16}>
        <AspectRatio ratio={4 / 3}>
          <Image src={imageChateau} objectFit="cover" borderRadius={16} />
        </AspectRatio>
        <Box paddingTop={6}>
          <Text>Lieu pour la journée :</Text>
          <Text p={6} align="center">
            <Link
              href="https://goo.gl/maps/SQC7H4cHJuDJxV1k8"
              isExternal
              color="teal.500"
            >
              Chateau de Cesarges, 770 Chemin de Césarges, Maubec 38300, Isère,
              Rhône Alpes
            </Link>
          </Text>
        </Box>
        <Box marginTop={6} display="flex" alignItems="center" flexDir="column">
          <Text>15h00: Accueil</Text>
          <Text pt={2}>15h30 - 16h30: Cérémonie Laïque</Text>
          <Text pt={2}>17h00 - 17h30: Photos de groupes</Text>
          <Text pt={2}>18h00 - 20h00: Vin d’honneur</Text>
          {isMariage ? (
            <Text pt={2}>20h - Toute la nuit : Repas et soirée dansante</Text>
          ) : null}
        </Box>
      </Box>
    </>
  );
}
