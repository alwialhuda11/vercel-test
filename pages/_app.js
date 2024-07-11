import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from "next-auth/react"
import theme from '../styles/theme'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp