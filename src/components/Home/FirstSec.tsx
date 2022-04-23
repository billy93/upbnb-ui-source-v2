import React from 'react'
import { Box, SimpleGrid, GridItem, Heading, Text, Button, Image } from '@chakra-ui/react'
import { Element } from 'react-scroll';
// import { motion, useMotionValue, useTransform } from "framer-motion";
import Lottie from 'react-lottie'
import t1 from '../../assets/lottie/upBNB.json'

export default function FirstSec() {
    // const x = useMotionValue(200);
    // const y = useMotionValue(200);

    // const rotateX = useTransform(y, [0, 400], [15, -15]);
    // const rotateY = useTransform(x, [0, 400], [-15, 15]);

    // function handleMouse(event:any) {
    //     const rect = event.currentTarget.getBoundingClientRect();

    //     x.set(event.clientX - rect.left);
    //     y.set(event.clientY - rect.top);
    // }
    const top = {
        loop: true,
        autoplay: true,
        animationData: t1,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };
  return (
    <>
    <Element name='Introduction'>
        <Box className='upcro_launch_main'>
                <Box className='width_full'>
                    <SimpleGrid columns={12} columnGap={3} rowGap={2} >
                        <GridItem colSpan={[12, 12, 12, 6]}>
                            <Box className='launch_text_box'>
                                <Box className='launch_text_box_inn' data-aos="fade-up" data-aos-delay="1000" data-aos-duration="800">
                                    <Heading as="h3">upBNB</Heading>
                                    <Text>
                                        The first ERC-31337 token on Binance Smart Chain.<br/><br/>Paired against BNB; upBNB is the cornerstone vault of the Root Finance upToken ecosystem on BSC.
                                    </Text>
                                    <Box className='launch_btns'>
                                        <Button as="a" href='https://pancakeswap.finance/swap?outputCurrency=0x1759254EB142bcF0175347D5A0f3c19235538a9A'>BUY NOW</Button>
                                        <Button as="a" href='/dashboard' className='entr_a'>ENTER APP</Button>
                                        <Button as="a" href='https://poocoin.app/tokens/0x1759254eb142bcf0175347d5a0f3c19235538a9a'>CHART</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </GridItem>
                        <GridItem colSpan={[12, 12, 12, 6]}>
                            <Box className='launch_text_box' data-aos="zoom-in" data-aos-delay="500">
                                {/* <motion.div onMouseMove={handleMouse}
                                    style={{
                                        display: "flex",
                                        placeItems: "center",
                                        placeContent: "center",
                                        width: "100%",
                                        perspective: 400
                                    }}>
                                    <motion.div 
                                    style={{
                                        width: "100%",
                                        rotateX: rotateX,
                                        rotateY: rotateY
                                    }}> */}
                                    
                                        <Box className='radial_gradiant_box'>
                                            {/* <Image src='img/upbnb_first_sec.png' className='upcro_first_img' /> */}
                                            <Box className='upcro_first_img'>
                                            <Lottie options={top} width={450} height={450}></Lottie>
                                            {/* <Image src='img/bnnr_img.png' /> */}
                                            </Box>
                                        </Box>
                                    {/* </motion.div>
                                </motion.div> */}
                                    
                                    
                                    {/* <Image src='img/upcro_first_img.png' className='upcro_first_img' /> */}
                            </Box>
                        </GridItem>
                    </SimpleGrid>
                </Box>
            </Box>
    </Element>
    </>
  )
}
