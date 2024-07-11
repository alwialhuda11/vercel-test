import { Heading, useColorModeValue } from '@chakra-ui/react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import AnimatedBox from './AnimatedBox'

const TradingChart = () => {
  const data = [
    { name: 'Jan', BTC: 4000, ETH: 2400 },
    { name: 'Feb', BTC: 3000, ETH: 1398 },
    { name: 'Mar', BTC: 2000, ETH: 9800 },
    { name: 'Apr', BTC: 2780, ETH: 3908 },
    { name: 'May', BTC: 1890, ETH: 4800 },
    { name: 'Jun', BTC: 2390, ETH: 3800 },
  ]

  const bg = useColorModeValue('white', 'gray.700')

  return (
    <AnimatedBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      bg={bg}
      borderRadius="lg"
      p={6}
      boxShadow="md"
    >
      <Heading as="h2" size="xl" mb={6} color="brand.500">Trading Chart</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="BTC" stroke="#8884d8" />
          <Line type="monotone" dataKey="ETH" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </AnimatedBox>
  )
}

export default TradingChart