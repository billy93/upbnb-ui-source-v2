import { Box, Button, ButtonGroup, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, useMediaQuery } from "@chakra-ui/react"
import React from "react"

export default function Pumpanomics() {
    const initialFocusRef = React.useRef()

    const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
    return (
      <Popover
        // initialFocusRef={initialFocusRef}
        trigger="hover"
        placement='bottom'
        closeOnBlur={false}        
      >
        <PopoverTrigger>
          <b>Pumpanomics</b>
        </PopoverTrigger>
        
        <PopoverContent color='white' bg='#F3BA2F.800' borderColor='#F3BA2F.800'    
            width={isLargerThan1280 ? 700 : 350} 
            height={isLargerThan1280 ? 481 : 240}>
          {/* <PopoverHeader pt={4} fontWeight='bold' border='0'>
            Manage Your Channels
          </PopoverHeader> */}
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody position={"relative"}>
            <img src="/img/pumpanomics.jpg"/>
          </PopoverBody>
          {/* <PopoverFooter
            border='0'
            d='flex'
            alignItems='center'
            justifyContent='space-between'
            pb={4}
          >
            <Box fontSize='sm'>Step 2 of 4</Box>           
          </PopoverFooter> */}
        </PopoverContent>
      </Popover>
    )
  }