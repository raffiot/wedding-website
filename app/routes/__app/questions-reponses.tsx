import { Box, Text } from "@chakra-ui/react";
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
    <Box marginTop={16}>
      <Box paddingTop={6}>
        <Box>
          <Text>Y a t-il de la place pour se garer ?</Text>
          <Text>Reponse</Text>
        </Box>
        <Box>
          <Text pt={2}>Y a t-il une liste de mariage ?</Text>
          <Text>Reponse</Text>
        </Box>
        <Box pt={2}>
          <Text>Y a t-il un thème ?</Text>
          <Text>Reponse</Text>
        </Box>
        {isMariage ? (
          <>
            <Box pt={2}>
              <Text>Comment faire pour se loger ?</Text>
              <Text>Reponse</Text>
            </Box>
            <Box pt={2}>
              <Text>Puis-je rester le dimanche ?</Text>
              <Text>Reponse</Text>
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  );
}
