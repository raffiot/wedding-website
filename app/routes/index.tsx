import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { commitSession, getUserSession } from "~/session";
import { login } from "~/utils/session.server";

export const action: ActionFunction = async ({ request }) => {
  const session = await getUserSession(request);
  const form = await request.formData();
  const password = form.get("password");
  if (!password) {
    return json({
      error: "Entrez un mot de passe",
    });
  }

  const { success, loginType } = await login({ password: password.toString() });
  if (!success) {
    return json({
      error: "Mot de passe invalid",
    });
  }

  session.set("LoginType", loginType);
  return redirect("/accueil", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getUserSession(request);
  const loginType = session.get("LoginType");
  return json({ loggedIn: Boolean(loginType) });
};

export default function Home() {
  const { loggedIn } = useLoaderData<typeof loader>();
  return (
    <Box h="100vh" w="100%" display="flex">
      {loggedIn ? (
        <Button p="8" margin="auto">
          <Link to="/accueil">Bienvenue au plus beau mariage du monde !</Link>
        </Button>
      ) : (
        <Box
          margin="auto"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p="8"
          borderWidth="1px"
          borderRadius="lg"
        >
          <Form method="post">
            <FormControl isRequired>
              <FormLabel>Mot de Passe</FormLabel>
              <Input name="password" type="password" />
            </FormControl>
            <Button type="submit" marginTop="8">
              Je me connecte !
            </Button>
          </Form>
        </Box>
      )}
    </Box>
  );
}
