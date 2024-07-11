import { Heading, Text, VStack, HStack, Badge, Input, Button, useColorModeValue } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AnimatedBox from './AnimatedBox'
import { motion } from 'framer-motion'

const AirdropAnalysis = () => {
  const [airdrops, setAirdrops] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const bg = useColorModeValue('white', 'gray.700')

  useEffect(() => {
    fetchAirdrops()
  }, [])

  async function fetchAirdrops() {
    let { data, error } = await supabase
      .from('airdrops')
      .select('*')
    if (error) console.log('error', error)
    else setAirdrops(data)
  }

  const filteredAirdrops = airdrops.filter(airdrop =>
    airdrop.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AnimatedBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      bg={bg}
      borderRadius="lg"
      p={6}
      boxShadow="md"
    >
      <Heading as="h2" size="xl" mb={6} color="brand.500">Airdrop Analysis</Heading>
      <Input
        placeholder="Search airdrops..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />
      <VStack align="stretch" spacing={4}>
        {filteredAirdrops.map((airdrop, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <HStack justify="space-between" p={4} borderWidth={1} borderRadius="md">
              <VStack align="start">
                <Text fontWeight="bold">{airdrop.name}</Text>
                <Text>Date: {airdrop.date}</Text>
              </VStack>
              <Badge colorScheme={airdrop.rating === 'High' ? 'green' : airdrop.rating === 'Medium' ? 'yellow' : 'red'}>
                {airdrop.rating}
              </Badge>
            </HStack>
          </motion.div>
        ))}
      </VStack>
    </AnimatedBox>
  )
}

export default AirdropAnalysis