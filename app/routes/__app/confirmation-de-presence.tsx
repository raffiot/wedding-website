import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Box,
  Textarea,
  Button,
  Center,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Spinner,
  FormHelperText,
} from "@chakra-ui/react";
import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import notion, { Availability } from "~/services/notion";
import { getUserSession, commitSession } from "~/session";

export const action: ActionFunction = async ({ request }) => {
  const formData: FormData = await request.formData();
  const session = await getUserSession(request);
  const isOnlyVinDHonneur = session.get("LoginType") === "vinDHonneur";
  try {
    // Submit form to notion
    await notion.writeRegistration({
      firstname: formData.get("firstname")!.toString(),
      lastname: formData.get("lastname")!.toString(),
      email: formData.get("email")!.toString(),
      phone: formData.get("phone")!.toString(),
      nbPersons: parseInt(formData.get("nbPersons")!.valueOf() as string),
      ...(isOnlyVinDHonneur
        ? { availabilities: [Availability.wine] }
        : {
            availabilities: [
              Availability.wedding,
              ...(formData.has(Availability.saturday)
                ? [Availability.saturday]
                : []),
              ...(formData.has(Availability.sunday)
                ? [Availability.sunday]
                : []),
            ],
          }),
      anecdote: formData.get("anecdote")?.toString(),
    });

    // Save that form has been submitted in cookies
    session.set("FormSubmitted", true);
    return json(
      {},
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      },
    );
  } catch (error) {
    return json(
      { error: "⚠️ Votre inscription a échoué, veuillez réessayer." },
      { status: 500 },
    );
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getUserSession(request);
  return json({
    isFormSubmitted: session.get("FormSubmitted"),
    loginType: session.get("LoginType"),
  });
};

export default function ConfirmationPresence() {
  const actionData = useActionData();
  const transition = useTransition();
  const { isFormSubmitted, loginType } = useLoaderData<typeof loader>();
  const isOnlyVinDHonneur = loginType === "vinDHonneur";

  if (transition.state === "loading" || transition.state === "submitting") {
    return (
      <Box marginTop={16}>
        <Center>
          <Spinner />
        </Center>
      </Box>
    );
  }

  if (isFormSubmitted) {
    return (
      <Box marginTop={16}>
        <Center>
          <Text>✅ Ton inscription a bien été prise en compte</Text>
        </Center>
      </Box>
    );
  }

  return (
    <Box marginTop={16}>
      {actionData?.error ? (
        <Text mb={8} align="center" color="red.600">
          {actionData.error}
        </Text>
      ) : null}
      <Form method="post">
        <FormControl isRequired>
          <FormLabel>Prénom</FormLabel>
          <Input placeholder="Raphaël" name="firstname" />
        </FormControl>
        <FormControl isRequired mt={2}>
          <FormLabel>Nom</FormLabel>
          <Input placeholder="Scordel" name="lastname" />
        </FormControl>
        <FormControl isRequired mt={2}>
          <FormLabel>Email</FormLabel>
          <Input placeholder="raphael@gmail.com" name="email" type="email" />
        </FormControl>
        <FormControl isRequired mt={2}>
          <FormLabel>Numéro de téléphone</FormLabel>
          <Input placeholder="0610432749" name="phone" type="tel" />
        </FormControl>
        {!isOnlyVinDHonneur ? (
          <FormControl as="fieldset" marginTop={12}>
            <FormLabel as="legend">Je serais présent:</FormLabel>
            <CheckboxGroup defaultValue={["Samedi", "Dimanche"]}>
              <HStack spacing="24px">
                <Checkbox value="Samedi" name={Availability.saturday}>
                  Samedi
                </Checkbox>
                <Checkbox value="Dimanche" name={Availability.sunday}>
                  Dimanche
                </Checkbox>
              </HStack>
            </CheckboxGroup>
            <FormHelperText>
              En cas de doute pour le Dimanche, cochez tout de même la case
            </FormHelperText>
          </FormControl>
        ) : null}
        <FormControl isRequired marginTop={12}>
          <FormLabel>Combien de personnes seront nous ?</FormLabel>
          <NumberInput defaultValue={1} min={1} max={10} name="nbPersons">
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl marginTop={12}>
          <FormLabel>Anecdote marrante avec Margaux et Ewan</FormLabel>
          <Textarea
            name="anecdote"
            height="10rem"
            placeholder="Une fois j'ai vu Margaux et Ewan en train de faire un concours de gobage de flan, c'était très drôle"
          />
        </FormControl>
        <Center marginTop={12}>
          <Button type="submit">Envoyer</Button>
        </Center>
      </Form>
    </Box>
  );
}
