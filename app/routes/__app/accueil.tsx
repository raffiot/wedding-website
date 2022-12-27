import { Box, Image, Text, Center } from "@chakra-ui/react";

export default function Acceuil() {
  return (
    <>
      <Image
        src="https://storage.googleapis.com/margaux-et-ewan-se-marient-assets/image-accueil.jpg"
        marginTop={16}
        boxSize="600px"
        objectFit="cover"
        borderRadius={16}
      />
      <Box width="50%" marginTop={16}>
        <Text align="center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          porta dui et risus pharetra semper. Morbi velit lorem, dapibus vel
          volutpat in, bibendum quis nunc. Aliquam ornare enim vitae risus
          mattis consectetur. Proin mollis nibh at sem dapibus pretium.
          Phasellus mollis gravida blandit. Proin ac congue massa, eget pretium
          dui. Integer lacinia sem quis tempor rutrum. Suspendisse imperdiet
          erat vel imperdiet aliquet. Cras dapibus ac ante nec pulvinar.
        </Text>
        <Text align="center">
          Fusce pulvinar vel ante id suscipit. Mauris tincidunt ut magna non
          feugiat. Sed et dui sed lacus finibus lacinia. Ut sit amet velit id
          orci gravida maximus sit amet eget mi. Integer id consectetur augue.
          In non placerat risus. Integer at sodales lectus, vitae vestibulum
          nisl. In vel massa eleifend, suscipit libero ac, fringilla tellus.
          Curabitur eu sodales dui. Aenean dapibus in ex et imperdiet. Sed
          congue lobortis tempus. Etiam sit amet suscipit leo. Curabitur sed
          ante ac lorem tempus porta. Sed sed vestibulum nulla. Duis et mauris
          massa. Fusce in tempor massa.
        </Text>
      </Box>
    </>
  );
}
