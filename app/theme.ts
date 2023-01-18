import { StyleFunctionProps, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode("#fdfff5", "black.900")(props),
      },
    }),
  },
  fonts: {
    heading: `'Dancing Script', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  components: {
    Divider: {
      sizes: {
        l: {
          borderWidth: "5px",
          borderStyle: "solid",
          borderRadius: 10,
          borderColor: "gray.400",
        },
      },
    },
  },
});

export default theme;
