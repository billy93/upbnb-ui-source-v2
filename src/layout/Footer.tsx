import React from 'react'
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react'

export default function Footer() {
  return (
    <>
      <Box as='footer' className='footer'>
        <Heading as="h4">Social Media</Heading>
        <Box className='social_lin_prnt'>
          <Button as="a" href='#' data-aos="fade-up" data-aos-delay="400"><Image src='img/social_ic01.svg' alt='' /></Button>
          <Button as="a" href='#' data-aos="fade-up" data-aos-delay="500"><Image src='img/social_ic02.svg' alt='' /></Button>
          <Button as="a" href='#' data-aos="fade-up" data-aos-delay="600"><Image src='img/social_ic03.svg' alt='' /></Button>
          <Button as="a" href='#' data-aos="fade-up" data-aos-delay="700"><Image src='img/social_ic04.svg' alt='' /></Button>
        </Box>
        <Text>2022, All Rights Reserved.</Text>
      </Box>
    </>
  )
}
