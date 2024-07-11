import { Box } from '@chakra-ui/react'
import Navbar from './Navbar'

const Layout = ({ children }) => (
  <Box>
    <Navbar />
    <Box as="main" p={8}>
      {children}
    </Box>
  </Box>
)

export default Layout