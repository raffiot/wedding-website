import { useState } from "react";
import { Center, Heading, Divider, Box } from "@chakra-ui/react";
import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderArgs } from "@remix-run/node";
import Selector from "~/components/Selector";
import { requireLogin } from "~/utils/session.server";
import EasterHeading from "~/components/EasterHeading";
import ewan from "~/assets/ewan.jpeg";
import margaux from "~/assets/margaux.jpeg";

const OPTIONS = [
  {
    id: "c267c961-7da6-44fe-94e2-391c336a0876",
    label: "Accueil",
    to: "/accueil",
  },
  {
    id: "72a32962-c961-44a9-9143-527cfa9524e7",
    label: "Confirmation de présence",
    to: "/confirmation-de-presence",
  },
  {
    id: "6735f29c-933d-461c-b303-a7d195fef919",
    label: "Programme",
    to: "/programme",
  },
  {
    id: "c5b5b9e1-5b9e-4b5b-9e1b-9e5b9e1b5b9e",
    label: "Questions/Réponses",
    to: "/questions-reponses",
  },
  {
    id: "24f77f3a-fdee-4970-977b-04bb1390e781",
    label: "Photos",
    to: "/photos",
  },
];

export const loader = async ({ request }: LoaderArgs) => {
  await requireLogin(request);
  const url = new URL(request.url);
  return url.pathname;
};

export default function App() {
  const currentSelectedUrl = useLoaderData<typeof loader>();
  const [selectedOption, setSelectedOption] = useState(
    OPTIONS.find((option) => option.to === currentSelectedUrl)?.id ||
      OPTIONS[0].id,
  );

  return (
    <Center display="flex" flexDir="column">
      <Box
        display="flex"
        flexDir="row"
        px={8}
        py={16}
        flexWrap="wrap"
        justifyContent="center"
      >
        <EasterHeading
          title="Margaux"
          image={margaux}
          modalTitle="Margou Kikouu 💅"
        />
        <Heading size="2xl" px={3}>
          et
        </Heading>
        <EasterHeading
          title="Ewan"
          image={ewan}
          modalTitle="Ewan Jack Sparrow 🏴‍☠️"
        />
        <Heading size="2xl" px={3}>
          se marient
        </Heading>
      </Box>
      <Box marginTop={8} display="flex" width="100%" alignItems="center">
        <Divider size="l" mx={[2, 8]} />
        <Selector
          options={OPTIONS}
          selectedOption={selectedOption}
          onPress={setSelectedOption}
        />
        <Divider size="l" mx={[2, 8]} />
      </Box>
      <Center display="flex" flexDir="column" px={4} mb={16}>
        <Outlet />
      </Center>
    </Center>
  );
}
