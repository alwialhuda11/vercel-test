import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      50: '#E6F0FF',
      100: '#B8D5FF',
      200: '#8ABAFF',
      300: '#5C9FFF',
      400: '#2E84FF',
      500: '#0069FF',
      600: '#0054CC',
      700: '#003F99',
      800: '#002A66',
      900: '#001533',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      variants: {
        solid: (props) => ({
          bg: props.colorScheme === 'brand' ? 'brand.500' : undefined,
          _hover: {
            bg: props.colorScheme === 'brand' ? 'brand.600' : undefined,
          },
        }),
      },
    },
  },
})

export default theme