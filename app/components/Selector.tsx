import { Stack, Box, Text } from "@chakra-ui/react";
import { Link } from "@remix-run/react";

type SelectorOption = {
  id: string;
  label: string;
  to: string;
};

type SelectorProps = {
  options: SelectorOption[];
  selectedOption: string;
  onPress: (option: string) => void;
};
export default function Selector({
  options,
  selectedOption,
  onPress,
}: SelectorProps) {
  return (
    <Stack spacing={[3, 6]} direction="row">
      {options.map(({ id, label, to }) => {
        if (id === selectedOption) {
          return (
            <Box
              as="button"
              borderBottom="solid"
              borderColor="gray.400"
              key={id}
              fontSize="md"
              color="gray.500"
              onClick={() => onPress(id)}
            >
              <Link to={to}>
                <Text fontSize={[10, 16]}>{label}</Text>
              </Link>
            </Box>
          );
        }
        return (
          <Box as="button" key={id} fontSize="md" onClick={() => onPress(id)}>
            <Link to={to}>
              <Text fontSize={[10, 16]}>{label}</Text>
            </Link>
          </Box>
        );
      })}
    </Stack>
  );
}
