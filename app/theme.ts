import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#fdfff5",
      },
    },
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
