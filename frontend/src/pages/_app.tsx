import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../context/auth-context'
import theme from '../theme'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp
