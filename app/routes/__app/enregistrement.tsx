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
} from "@chakra-ui/react";
import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import notion, { Availability } from "~/services/notion";
import { getSession, commitSession } from "~/session";

export const action: ActionFunction = async ({ request }) => {
  const formData: FormData = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));
  try {
    // Submit form to notion
    await notion.writeRegistration({
      firstname: formData.get("firstname")!.toString(),
      lastname: formData.get("lastname")!.toString(),
      email: formData.get("email")!.toString(),
      nbPersons: parseInt(formData.get("nbPersons")!.valueOf() as string),
      availabilities: [
        ...(formData.has(Availability.saturday) ? [Availability.saturday] : []),
        ...(formData.has(Availability.sunday) ? [Availability.sunday] : []),
      ],
      anecdote: formData.get("anecdote")?.toString(),
    });

    // Save that form has been submitted in cookies
    session.set("FormSubmitted", true);
    await commitSession(session);
    return json(
      {},
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      },
    );
  } catch (error) {
    throw new Error("Une erreur est survenue lors de l'envoi du formulaire");
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return json({ isFormSubmitted: session.get("FormSubmitted") });
};

export default function Acceuil() {
  const transition = useTransition();
  const { isFormSubmitted } = useLoaderData<typeof loader>();

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
      <Form method="post">
        <FormControl isRequired>
          <FormLabel>Prénom</FormLabel>
          <Input placeholder="Margaux" name="firstname" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Nom</FormLabel>
          <Input placeholder="Utrilla" name="lastname" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder="margaux.utrilla@gmail.com" name="email" />
        </FormControl>
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
        </FormControl>
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
