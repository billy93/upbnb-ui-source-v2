import React from 'react'
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react'
import { Element } from 'react-scroll';

export default function TechnologySec() {
  return (
    <>
    <Element name='Technology'>
      <Box className="technology_main">
        <Box className='tech_bg_box'>
          <Heading as="h6" data-aos="fade" data-aos-delay="200">TECHNOLOGY</Heading>
          <Heading as="h3" data-aos="fade" data-aos-delay="300">UpToken Tech</Heading>
          <Text data-aos="fade" data-aos-delay="400">
            Using our <b>ERC31337 technology</b>, we first create a price floor by building our token within certain parameters. We are then able to extract all value from beneath the price floor that would otherwise be trapped. Once the value below a price floor has served its purpose to guarantee the price, it's essentially stuck value, we are able to recover it and put it to use. We incorparate various mechanics to increase the price floor over time, including high taxes after vault buy backs and token burns.
            </Text>
          <Box className='techno_img_prnt' data-aos="zoom-in" data-aos-delay="500">
            <Image src="img/techno_img.png" alt='' className='techno_img' />
          </Box>
          <Box className='darkbg_btn_bx'>
            <Button as="a" href='#'>ENTER APP</Button>
          </Box>
        </Box>
      </Box>
    </Element>
    </>
  )
}
