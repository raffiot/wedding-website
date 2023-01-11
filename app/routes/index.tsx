import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { commitSession, getUserSession } from "~/session";
import { login } from "~/utils/session.server";
import imageBackground from "~/assets/background-login.jpg";

export const action: ActionFunction = async ({ request }) => {
  const session = await getUserSession(request);
  const form = await request.formData();
  const password = form.get("password");
  if (!password) {
    return json(
      {
        error: "Entrez un mot de passe",
      },
      { status: 422 },
    );
  }

  const { success, loginType } = await login({ password: password.toString() });
  if (!success) {
    return json(
      {
        error: "Mot de passe invalid",
      },
      { status: 422 },
    );
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
  const actionData = useActionData();

  return (
    <Box
      h="100vh"
      w="100%"
      display="flex"
      backgroundImage={imageBackground}
      backgroundPosition="auto"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      opacity={0.8}
    >
      {loggedIn ? (
        <Button p="8" margin="auto" boxShadow="dark-lg">
          <Link to="/accueil">Cliquer pour accéder au site</Link>
        </Button>
      ) : (
        <Box
          margin="auto"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p="12"
          borderRadius="lg"
          boxShadow="dark-lg"
          bg="white"
        >
          <Form method="post">
            <FormControl isRequired isInvalid={actionData?.error}>
              <FormLabel>Mot de Passe</FormLabel>
              <Input name="password" type="password" />

              {actionData?.error ? (
                <FormErrorMessage>{actionData.error}</FormErrorMessage>
              ) : null}
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
