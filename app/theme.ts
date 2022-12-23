import { extendTheme } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  components: {
    Divider: {
      sizes: {
        l: {
          borderWidth: "5px",
          borderStyle: "solid",
          borderRadius: 10,
        },
      },
    },
  },
});

export default theme;
