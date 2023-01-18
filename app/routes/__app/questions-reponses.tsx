import { Box, Center, Link, Text } from "@chakra-ui/react";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserSession } from "~/session";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getUserSession(request);
  return json({
    loginType: session.get("LoginType"),
  });
};

export default function QuestionsReponses() {
  const { loginType } = useLoaderData<typeof loader>();
  const isMariage = loginType === "mariage";
  return (
    <Box width="50%" marginTop={16}>
      <Box paddingTop={6}>
        <Box>
          <Text as="b">Qui est concerné par l’invitation ?</Text>
          <Text>
            Vous êtes conviés avec votre conjoint/compagnon ainsi que vos
            enfants.
          </Text>
        </Box>
        <Box pt={2}>
          <Text>Y a t-il de la place pour se garer ?</Text>
          <Text>
            Oui, lors de votre arrivée vous aurez un parking sur la gauche avec
            100 places de voitures.
          </Text>
        </Box>
        <Box pt={2}>
          <Text as="b">Y a t-il une liste de mariage ?</Text>
          <Text>
            Nous avons fait le choix de ne pas faire de liste de mariage, nous
            préférons profiter d’un beau voyage après le mariage ! Nous mettrons
            à votre disposition une boite pour ceux qui le souhaitent. Vous
            aurez également la possibilité de déposer des cadeaux choisis par
            vos soins à côté de cette boite.
          </Text>
        </Box>
        <Box pt={2}>
          <Text as="b">Y a-t-il un thème ?</Text>
          <Text>Pas de thème imposé, venez comme vous êtes !</Text>
        </Box>
        {isMariage ? (
          <>
            <Box pt={2}>
              <Text as="b">Combien de temps dure le mariage ?</Text>
              <Text>
                Vous êtes conviés à partir du Samedi 24 Juin 2023 à 15h (sauf
                dispositions contraires indiquées dans le fairepart) au château
                pour commencer avec la cérémonie laïque jusqu’au dimanche. Un
                Brunch est prévu le dimanche midi, nous pouvons disposer du
                château jusqu’à 15h pour profiter ensemble de la journée du
                dimanche.
              </Text>
            </Box>
            <Box pt={2}>
              <Text as="b">Comment faire pour se loger ?</Text>
              <Text>
                Le château dispose de quelques chambres réservées aux membres de
                nos familles habitant loin et ayant reçu l’information. Pour
                ceux qui souhaitent profiter du brunch du dimanche avec nous,
                nous vous proposons ci-dessous les adresses et contacts
                d'hébergement à proximité avec qui le château à l’habitude de
                travailler. Si un des hébergements proposés ou un autre de votre
                choix vous convient, merci de les contacter directement pour
                réserver votre logement.
              </Text>
              <Box mt={2}>
                <Text as="i">Hôtel à 12 minutes en voiture :</Text>
                <Center display="flex" flexDir="column" mt={2}>
                  <Text align="center">Interlocuteur : Mme NIETO Béatrice</Text>
                  <Link
                    href="https://goo.gl/maps/3Nzr5WP2spX79kXv7"
                    isExternal
                    color="teal.500"
                  >
                    15 Rue Edouard Branly, 38300 Bourgoin-Jallieu, France
                  </Link>
                </Center>
              </Box>
              <Box mt={2}>
                <Text as="i">Chambres d’hôtes à 5 minutes en voiture :</Text>
                <Center display="flex" flexDir="column" mt={2}>
                  <Text align="center">CASTEL SEREIN – Chambres d’hôtes</Text>
                  <Link
                    href="https://goo.gl/maps/wdcNizh3NTMXPhcb6"
                    isExternal
                    color="teal.500"
                  >
                    551 Chemin du Paternos, 38300 MAUBEC
                  </Link>
                </Center>
              </Box>
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  );
}
