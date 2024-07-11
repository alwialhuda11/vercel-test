import { Heading, VStack, HStack, Text, Input, Button, Badge, useColorModeValue } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useSession } from "next-auth/react"
import AnimatedBox from './AnimatedBox'
import { motion } from 'framer-motion'

const CommunityForum = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const { data: session } = useSession()
  const bg = useColorModeValue('white', 'gray.700')

  useEffect(() => {
    fetchMessages()
  }, [])

  async function fetchMessages() {
    let { data, error } = await supabase
      .from('messages')
      .select('*, user:users(name, karma)')
      .order('created_at', { ascending: false })
    if (error) console.log('error', error)
    else setMessages(data)
  }

  const handleSubmit = async () => {
    if (newMessage.trim() && session) {
      const { data, error } = await supabase
        .from('messages')
        .insert({ user_id: session.user.id, content: newMessage })
      if (error) console.log('error', error)
      else {
        fetchMessages()
        setNewMessage('')
      }
    }
  }

  return (
    <AnimatedBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      bg={bg}
      borderRadius="lg"
      p={6}
      boxShadow="md"
    >
      <Heading as="h2" size="xl" mb={6} color="brand.500">Community Forum</Heading>
      <VStack align="stretch" spacing={4} mb={6}>
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <HStack p={2} bg="gray.100" borderRadius="md">
              <VStack align="start">
                <HStack>
                  <Text fontWeight="bold">{msg.user.name}</Text>
                  <Badge colorScheme="green">Karma: {msg.user.karma}</Badge>
                </HStack>
                <Text>{msg.content}</Text>
              </VStack>
            </HStack>
          </motion.div>
        ))}
      </VStack>
      {session ? (
        <HStack>
          <Input 
            placeholder="Type your message..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button onClick={handleSubmit} colorScheme="brand">Send</Button>
        </HStack>
      ) : (
        <Text>Please sign in to participate in the forum.</Text>
      )}
    </AnimatedBox>
  )
}

export default CommunityForum