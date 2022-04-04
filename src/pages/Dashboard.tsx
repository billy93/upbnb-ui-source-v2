import React from 'react'
import { Box, SimpleGrid, GridItem, Heading, Image, Button, Text } from '@chakra-ui/react'
import LayoutTwo from './LayoutTwo'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

export default function Dashboard() {
  return (
    <>
        <LayoutTwo>
          <Box className='dashboard_main_page'>
            <Box className='dashboard_cntnt_box'>
              <SimpleGrid columns={12} columnGap={4} rowGap={3} >
                <GridItem colSpan={[12, 12, 12, 6]}>
                  <Box className='dashboard_chart_box price_chart_main'>
                    <Image src='img/price_chart_img.png' alt='' />
                  </Box>
                </GridItem>
                <GridItem colSpan={[12, 12, 12, 6]}>
                  <Box className='dashboard_chart_box price_chart_main'>
                    <Image src='img/tvl_chrt_img.png' alt='' />
                  </Box>
                </GridItem>
                <GridItem colSpan={[12, 12, 12, 6]}>
                  <Box className='dashboard_chart_box'>
                    <Box className='flex_chart_header'>
                      <Heading as="h3">List of all contracts</Heading>
                    </Box>
                  </Box>
                </GridItem>
                <GridItem colSpan={[12, 12, 12, 6]}>
                  <Box className='dashboard_chart_box'>
                    <Box className='flex_chart_header'>
                      <Heading as="h3">Pending votes</Heading>
                    </Box>
                  </Box>
                </GridItem>
                <GridItem colSpan={[12, 12, 12, 12]}>
                  <Box className='dashboard_chart_box dashboard_chart_box_last'>
                    <Box className='flex_chart_header flex_chart_header_last'>
                      <Heading as="h3">List of all pools</Heading>
                    </Box>
                    <Box className='pools_tablemain'>
                      <Table variant='simple'>
                        <Thead>
                          <Tr>
                            <Th>#</Th>
                            <Th><Box className='pool_head'>Pool</Box></Th>
                            <Th isNumeric><Box className="tvl_head">TVL<Image src="img/down_arrow.svg" alt="" /></Box></Th>
                            <Th isNumeric><Box className="volume_head" >24Hr Volume</Box></Th>
                            <Th isNumeric>7d Volume</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>1</Td>
                            <Td><Box className='poolcolm_data'><Image src="img/table_ic01.svg" alt="" />UNI/ETH<span>0.3%</span></Box></Td>
                            <Td isNumeric>$361.06m</Td>
                            <Td isNumeric><Box className="volume_column" >$361.06m</Box></Td>
                            <Td isNumeric>$361.06m</Td>
                          </Tr>
                          <Tr>
                            <Td>2</Td>
                            <Td><Box className='poolcolm_data'><Image src="img/table_ic02.svg" alt="" />WBTC/ETH<span>0.3%</span></Box></Td>
                            <Td isNumeric>$144.06m</Td>
                            <Td isNumeric><Box className="volume_column" >$144.06m</Box></Td>
                            <Td isNumeric>$144.06m</Td>
                          </Tr>
                          <Tr>
                            <Td>3</Td>
                            <Td><Box className='poolcolm_data'><Image src="img/table_ic03.svg" alt="" />Tether USD (USDT)<span>0.5%</span></Box></Td>
                            <Td isNumeric>$15.06m</Td>
                            <Td isNumeric><Box className="volume_column" >$15.06m</Box></Td>
                            <Td isNumeric>$15.06m</Td>
                          </Tr>
                          <Tr>
                            <Th>4</Th>
                            <Th><Box className='poolcolm_data'><Image src="img/table_ic01.svg" alt="" />UNI/ETH<span>0.3%</span></Box></Th>
                            <Th isNumeric>$361.06m</Th>
                            <Th isNumeric><Box className="volume_column" >$361.06m</Box></Th>
                            <Th isNumeric>$361.06m</Th>
                          </Tr>
                          <Tr>
                            <Td>5</Td>
                            <Td><Box className='poolcolm_data'><Image src="img/table_ic02.svg" alt="" />WBTC/ETH<span>0.3%</span></Box></Td>
                            <Td isNumeric>$361.06m</Td>
                            <Td isNumeric><Box className="volume_column" >$144.06m</Box></Td>
                            <Td isNumeric>$361.06m</Td>
                          </Tr>
                          <Tr>
                            <Td>6</Td>
                            <Td><Box className='poolcolm_data'><Image src="img/table_ic03.svg" alt="" />Tether USD (USDT)<span>0.5%</span></Box></Td>
                            <Td isNumeric>$15.06m</Td>
                            <Td isNumeric><Box className="volume_column" >$15.06m</Box></Td>
                            <Td isNumeric>$15.06m</Td>
                          </Tr>
                          <Tr>
                            <Td>7</Td>
                            <Td><Box className='poolcolm_data'><Image src="img/table_ic01.svg" alt="" />UNI/ETH<span>0.3%</span></Box></Td>
                            <Td isNumeric>$361.06m</Td>
                            <Td isNumeric><Box className="volume_column" >$361.06m</Box></Td>
                            <Td isNumeric>$361.06m</Td>
                          </Tr>
                          <Tr>
                            <Th>8</Th>
                            <Th><Box className='poolcolm_data'><Image src="img/table_ic02.svg" alt="" />WBTC/ETH<span>0.3%</span></Box></Th>
                            <Th isNumeric>$16.06m</Th>
                            <Th isNumeric><Box className="volume_column" >$144.06m</Box></Th>
                            <Th isNumeric>$16.06m</Th>
                          </Tr>
                          <Tr>
                            <Td>9</Td>
                            <Td><Box className='poolcolm_data'><Image src="img/table_ic03.svg" alt="" />Tether USD (USDT)<span>0.5%</span></Box></Td>
                            <Td isNumeric>$481.06k</Td>
                            <Td isNumeric><Box className="volume_column" >$15.06m</Box></Td>
                            <Td isNumeric>$481.06k</Td>
                          </Tr>
                          <Tr>
                            <Th>10</Th>
                            <Th><Box className='poolcolm_data'><Image src="img/table_ic01.svg" alt="" />UNI/ETH<span>0.3%</span></Box></Th>
                            <Th isNumeric>$54.06m</Th>
                            <Th isNumeric><Box className="volume_column" >$361.06m</Box></Th>
                            <Th isNumeric>$54.06m</Th>
                          </Tr>
                        </Tbody>
                      </Table>
                    </Box>
                    <Box className='pagination_row'>
                      <Button><Image src='img/pagination_prev.svg' alt="" /></Button>
                      <Text>Page <span>1 of 20</span></Text>
                      <Button><Image src='img/pagination_next.svg' alt="" /></Button>
                    </Box>
                  </Box>
                </GridItem>
              </SimpleGrid>
            </Box>
          </Box>
        </LayoutTwo>
    </>
  )
}
