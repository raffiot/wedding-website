import { useState } from "react";
import { Center, Heading, Divider, Box } from "@chakra-ui/react";
import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderArgs } from "@remix-run/node";
import Selector from "~/components/Selector";
import { requireLogin } from "~/utils/session.server";

const OPTIONS = [
  {
    id: "c267c961-7da6-44fe-94e2-391c336a0876",
    label: "Accueil",
    to: "/accueil",
  },
  {
    id: "72a32962-c961-44a9-9143-527cfa9524e7",
    label: "Enregistrement",
    to: "/enregistrement",
  },
  {
    id: "24f77f3a-fdee-4970-977b-04bb1390e781",
    label: "Photos",
    to: "/photos",
  },
  {
    id: "6735f29c-933d-461c-b303-a7d195fef919",
    label: "Programme & FAQ",
    to: "/programme-et-faq",
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
    <Center display="flex" flexDir="column" padding={16}>
      <Heading>Margaux et Ewan se marient</Heading>
      <Box marginTop={16} display="flex" width="100%" alignItems="center">
        <Divider size="l" />
        <Selector
          options={OPTIONS}
          selectedOption={selectedOption}
          onPress={setSelectedOption}
        />
        <Divider size="l" />
      </Box>
      <Center display="flex" flexDir="column">
        <Outlet />
      </Center>
    </Center>
  );
}
