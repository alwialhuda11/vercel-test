import { Box, Flex, Spacer, Button, useColorModeValue } from '@chakra-ui/react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
  const { data: session } = useSession()
  const bg = useColorModeValue('white', 'gray.800')

  return (
    <Box bg={bg} px={4} boxShadow="sm">
      <Flex h={16} alignItems="center">
        <Link href="/" passHref>
          <Button as="a" variant="ghost">Home</Button>
        </Link>
        <Spacer />
        {session ? (
          <Button onClick={() => signOut()} colorScheme="brand">Sign Out</Button>
        ) : (
          <Button onClick={() => signIn()} colorScheme="brand">Sign In</Button>
        )}
      </Flex>
    </Box>
  )
}

export default Navbar