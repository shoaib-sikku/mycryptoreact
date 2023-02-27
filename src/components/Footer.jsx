import { Avatar, Stack, VStack, Text, Box } from '@chakra-ui/react'
import React from 'react'
import me from '../assets/me.jpg'
const Footer = () => {
  return (
    <>
      <Box px={'16'} py={'16'} minH={'48'} style={{ backgroundColor: 'black' }}>
        <Stack direction={['column', 'row']} color={'white'}>
          <VStack w={'full'} align={['center', 'flex-start']} justifyContent={'center'}>
            <Text fontWeight={'bold'}>
              About Us
            </Text>
            <Text>
              We are the best crypto trading app in India, we provide our guidance at a very cheap price.
            </Text>
          </VStack>
          <VStack justifyContent={'center'}>
            <a href='https://mohdshoaib.netlify.app/'>
              <Avatar size={'xl'} src={me} />
            </a>
            <Text>Our Founder</Text>
          </VStack>
        </Stack>
      </Box>
    </>
  )
}

export default Footer
