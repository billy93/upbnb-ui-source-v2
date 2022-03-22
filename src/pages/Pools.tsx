import React from 'react'
import { Box, Heading, Image, Button, Text } from '@chakra-ui/react'
import LayoutTwo from './LayoutTwo'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

export default function Pools() {
  return (
    <>
        <LayoutTwo>
            <Box className='pools_main'>
              <Box className='pool_list_box'>
                <Box className='dashboard_chart_box dashboard_chart_box_last'>
                    <Box className='flex_chart_header flex_chart_header_last'>
                      <Heading as="h3">List of all pools</Heading>
                      <Box className='search_bar'>
                        <input type="text" placeholder="Type for search" />
                        <Button className="serch_btn"><Image src="img/search_ic.svg" alt="" /> </Button>
                      </Box>
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
                          <Tr>
                            <Td>11</Td>
                            <Td><Box className='poolcolm_data'><Image src="img/table_ic02.svg" alt="" />WBTC/ETH<span>0.3%</span></Box></Td>
                            <Td isNumeric></Td>
                            <Td isNumeric><Box className="volume_column" >$144.06m</Box></Td>
                            <Td isNumeric>$16.06m</Td>
                          </Tr>
                          <Tr>
                            <Td>12</Td>
                            <Td><Box className='poolcolm_data'><Image src="img/table_ic01.svg" alt="" />UNI/ETH<span>0.3%</span></Box></Td>
                            <Td isNumeric></Td>
                            <Td isNumeric><Box className="volume_column" >$361.06m</Box></Td>
                            <Td isNumeric>$54.06m</Td>
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
              </Box>
            </Box>
        </LayoutTwo>
    </>
  )
}
