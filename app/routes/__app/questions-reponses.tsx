import { Box, Center, Link, Text } from "@chakra-ui/react";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import TextModal from "~/components/TextModal";
import { getUserSession } from "~/session";
import imagePlan from "~/assets/plan.png";

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
            enfants adolescents et/ou en bas âge.
          </Text>
        </Box>
        <Box pt={2}>
          <Text as="b">Comment venir jusqu’au château ?</Text>
          <Text>
            Le Château de Césarges est un lieu isolé, vous devez impérativement
            être véhiculé pour venir et repartir. La gare la plus proche se
            trouve à 6 km (Bourgoin Jallieu) .
          </Text>
          <TextModal
            title="Plan d'accès"
            image={imagePlan}
            modalTitle="Plan d'accès au Château de Césarges"
          />
        </Box>
        <Box pt={2}>
          <Text as="b">Y a t-il de la place pour se garer ?</Text>
          <Text>
            Oui, lors de votre arrivée vous aurez un parking sur la gauche avec
            100 places de voitures. Environ 200 personnes sont attendues, c’est
            pourquoi nous vous invitons à faire du covoiturage dans la mesure du
            possible.
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
          <Text>
            Il n’y a pas de thème imposé, venez comme vous en avez envie !
          </Text>
        </Box>
        <Box pt={2}>
          <Text as="b">Je souhaite proposer une activité, comment faire ?</Text>
          <Text>
            Nous vous invitons à prendre contact avec Gabrielle MANIN (tél : 06
            29 42 51 52)
          </Text>
        </Box>
        <Box pt={2}>
          <Text as="b">
            J’aimerai faire un discours lors du mariage, à qui dois-je
            m’adresser ?
          </Text>
          <Text>
            Afin de pouvoir respecter les temps et l'organisation du mariage,
            nous vous demandons de bien vouloir vous rapprocher de Manon SINDEL
            (tél : 07 67 03 27 17). Merci de bien vouloir faire la démarche au
            préalable afin d’éviter une réorganisation au dernier moment.
          </Text>
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
                nous vous proposons ci-dessous deux hébergements à proximité et
                avec qui le château à l’habitude de travailler. Si un des
                hébergements proposés (ou un autre de votre choix) vous
                convient, merci de le contacter directement pour réserver votre
                logement.
              </Text>
              <Box mt={2}>
                <Text as="i">
                  Hôtel KYRIAD BOURGOIN JALLIEU (à 12 minutes en voiture){" "}
                </Text>
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
                <Text as="i">
                  Chambres d’hôtes CASTEL SEREIN (à 5 minutes en voiture) :
                </Text>
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
        ) : (
          <>
            <Box pt={2}>
              <Text as="b">Combien de temps dure le mariage ?</Text>
              <Text>
                Vous êtes conviés à partir du Samedi 24 Juin 2023 à 15h00, et ce
                jusqu’à la fin du vin d’honneur qui s’achèvera à 20h00.
              </Text>
            </Box>
          </>
        )}
        <Box pt={2}>
          <Text as="b">Comment contacter les futurs mariés ? </Text>
          <Text>
            Margaux UTRILLA--KRISKOFF : margaux.u@hotmail.fr / 06 04 53 43 15
          </Text>
          <Text>Ewan HALBERT : ewan.halbert@gmail.com / 06 58 11 17 42</Text>
        </Box>
      </Box>
    </Box>
  );
}
