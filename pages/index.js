import { VStack, Heading, Text, SimpleGrid, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import AirdropAnalysis from '../components/AirdropAnalysis'
import TradingChart from '../components/TradingChart'
import CommunityForum from '../components/CommunityForum'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'

export default function Home() {
  const toast = useToast()

  useEffect(() => {
    const subscription = supabase
      .from('airdrops')
      .on('INSERT', payload => {
        toast({
          title: "New Airdrop!",
          description: `${payload.new.name} has been added.`,
          status: "info",
          duration: 9000,
          isClosable: true,
        })
      })
      .subscribe()

    return () => supabase.removeSubscription(subscription)
  }, [])

  return (
    <VStack spacing={12} align="stretch">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={4} align="center">
          <Heading as="h1" size="2xl" color="brand.500">Crypto & Airdrop Hub</Heading>
          <Text fontSize="xl" textAlign="center">Your one-stop platform for airdrop analysis, trading insights, and community building</Text>
        </VStack>
      </motion.div>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <AirdropAnalysis />
        <TradingChart />
      </SimpleGrid>

      <CommunityForum />
    </VStack>
  )
}