import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import { getGQLHeaders, infoClient } from '../utils/graphql'
import { gql, GraphQLClient } from 'graphql-request'
import { getUnixTime, startOfMinute, subDays, subWeeks } from 'date-fns'
import { orderBy } from 'lodash'
import requestWithTimeout from '../utils/requestWithTimeout'
import { getChangeForPeriod, getLpFeesAndApr, getPercentChange } from '../utils/infoDataHelpers'
import { isAddress } from '../utils'
import { formatAmount } from '../utils/formatInfoNumbers'

export default function Pools() {
  const ITEMS_PER_INFO_TABLE_PAGE = 10

  const POOLS_FOR_TOKEN = gql`
  query poolsForToken($address: Bytes!, $blacklist: [String!]) {
    asToken0: pairs(
      first: 15
      orderBy: trackedReserveBNB
      orderDirection: desc
      where: { totalTransactions_gt: 100, token0: $address, token1_not_in: $blacklist }
    ) {
      id
    }
    asToken1: pairs(
      first: 15
      orderBy: trackedReserveBNB
      orderDirection: desc
      where: { totalTransactions_gt: 100, token1: $address, token0_not_in: $blacklist }
    ) {
      id
    }
  }
  `

  const TOKEN_BLACKLIST = [
    // These ones are copied from v1 info
    '0x495c7f3a713870f68f8b418b355c085dfdc412c3',
    '0xc3761eb917cd790b30dad99f6cc5b4ff93c4f9ea',
    '0xe31debd7abff90b06bca21010dd860d8701fd901',
    '0xfc989fbb6b3024de5ca0144dc23c18a063942ac1',
    '0xe40fc6ff5f2895b44268fd2e1a421e07f567e007',
    '0xfd158609228b43aa380140b46fff3cdf9ad315de',
    '0xc00af6212fcf0e6fd3143e692ccd4191dc308bea',
    '0x205969b3ad459f7eba0dee07231a6357183d3fb6',
    '0x0bd67d358636fd7b0597724aa4f20beedbf3073a',
    '0xedf5d2a561e8a3cb5a846fbce24d2ccd88f50075',
    '0x702b0789a3d4dade1688a0c8b7d944e5ba80fc30',
    '0x041929a760d7049edaef0db246fa76ec975e90cc',
    '0xba098df8c6409669f5e6ec971ac02cd5982ac108',
    '0x1bbed115afe9e8d6e9255f18ef10d43ce6608d94',
    '0xe99512305bf42745fae78003428dcaf662afb35d',
    '0xbE609EAcbFca10F6E5504D39E3B113F808389056',
    '0x847daf9dfdc22d5c61c4a857ec8733ef5950e82e',
    '0xdbf8913dfe14536c0dae5dd06805afb2731f7e7b',
    // These ones are newly found
    '0xF1D50dB2C40b63D2c598e2A808d1871a40b1E653',
    '0x4269e4090ff9dfc99d8846eb0d42e67f01c3ac8b',
  ]

  const SORT_FIELD = {
    volumeUSD: 'volumeUSD',
    liquidityUSD: 'liquidityUSD',
    volumeUSDWeek: 'volumeUSDWeek',
    lpFees24h: 'lpFees24h',
    lpApr7d: 'lpApr7d',
  }

  interface PoolsForTokenResponse {
    asToken0: {
      id: string
    }[]
    asToken1: {
      id: string
    }[]
  }

  interface PoolData {
    address: string
  
    token0: {
      name: string
      symbol: string
      address: string
    }
  
    token1: {
      name: string
      symbol: string
      address: string
    }
  
    volumeUSD: number
    volumeUSDChange: number
    volumeUSDWeek: number
    volumeUSDChangeWeek: number
  
    totalFees24h: number
    totalFees7d: number
    lpFees24h: number
    lpFees7d: number
    lpApr7d: number
  
    liquidityUSD: number
    liquidityUSDChange: number
  
    token0Price: number
    token1Price: number
  
    liquidityToken0: number
    liquidityToken1: number
  }

  interface Block {
    number: number
    timestamp: string
  }

  interface PoolsQueryResponse {
    now: PoolFields[]
    oneDayAgo: PoolFields[]
    twoDaysAgo: PoolFields[]
    oneWeekAgo: PoolFields[]
    twoWeeksAgo: PoolFields[]
  }

  interface PoolFields {
    id: string
    reserve0: string
    reserve1: string
    reserveUSD: string
    volumeUSD: string
    token0Price: string
    token1Price: string
    token0: {
      id: string
      symbol: string
      name: string
    }
    token1: {
      id: string
      symbol: string
      name: string
    }
  }

  interface FormattedPoolFields
    extends Omit<PoolFields, 'volumeUSD' | 'reserveUSD' | 'reserve0' | 'reserve1' | 'token0Price' | 'token1Price'> {
    volumeUSD: number
    reserveUSD: number
    reserve0: number
    reserve1: number
    token0Price: number
    token1Price: number
  }

  const useBlocksFromTimestamps = (
    timestamps: number[],
    sortDirection: 'asc' | 'desc' = 'desc',
    skipCount = 1000,
  ): {
    blocks?: Block[]
    error: boolean
  } => {
    const [blocks, setBlocks] = useState<Block[]>()
    const [error, setError] = useState(false)
  
    const timestampsString = JSON.stringify(timestamps)
    const blocksString = blocks ? JSON.stringify(blocks) : undefined
  
    useEffect(() => {
      const fetchData = async () => {
        const timestampsArray = JSON.parse(timestampsString)
        const result = await getBlocksFromTimestamps(timestampsArray, sortDirection, skipCount)
        if (result.length === 0) {
          setError(true)
        } else {
          setBlocks(result)
        }
      }
      const blocksArray = blocksString ? JSON.parse(blocksString) : undefined
      if (!blocksArray && !error) {
        fetchData()
      }
    }, [blocksString, error, skipCount, sortDirection, timestampsString])
  
    return {
      blocks,
      error,
    }
  }

  const getBlocksFromTimestamps = async (
    timestamps: number[],
    sortDirection: 'asc' | 'desc' = 'desc',
    skipCount = 500,
  ): Promise<Block[]> => {
    if (timestamps?.length === 0) {
      return []
    }
  
    const getBlockSubqueries = (timestamps: number[]) =>
      timestamps.map((timestamp) => {
        return `t${timestamp}:blocks(first: 1, orderBy: timestamp, orderDirection: desc, where: { timestamp_gt: ${timestamp}, timestamp_lt: ${
          timestamp + 600
        } }) {
          number
        }`
    })

    const blocksQueryConstructor = (subqueries: string[]) => {
      return gql`query blocks {
        ${subqueries}
      }`
    }

    
    const multiQuery = async (
      queryConstructor: (subqueries: string[]) => string,
      subqueries: string[],
      endpoint: string,
      skipCount = 1000,
    ) => {
      let fetchedData = {}
      let allFound = false
      let skip = 0
      const client = new GraphQLClient(endpoint, { headers: getGQLHeaders(endpoint) })
      try {
        while (!allFound) {
          let end = subqueries.length
          if (skip + skipCount < subqueries.length) {
            end = skip + skipCount
          }
          const subqueriesSlice = subqueries.slice(skip, end)
          // eslint-disable-next-line no-await-in-loop
          const result: any = await requestWithTimeout(client, queryConstructor(subqueriesSlice))
          fetchedData = {
            ...fetchedData,
            ...result,
          }
          allFound = Object.keys(result).length < skipCount || skip + skipCount > subqueries.length
          skip += skipCount
        }
        return fetchedData
      } catch (error) {
        console.error('Failed to fetch info data', error)
        return null
      }
    }
    
    const BLOCKS_CLIENT = 'https://api.thegraph.com/subgraphs/name/pancakeswap/blocks'
    const fetchedData: any = await multiQuery(
      blocksQueryConstructor,
      getBlockSubqueries(timestamps),
      BLOCKS_CLIENT,
      skipCount,
    )
  
    const blocks: Block[] = []
    if (fetchedData) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(fetchedData)) {
        if (fetchedData[key].length > 0) {
          blocks.push({
            timestamp: key.split('t')[1],
            number: parseInt(fetchedData[key][0].number, 10),
          })
        }
      }
      // graphql-request does not guarantee same ordering of batched requests subqueries, hence manual sorting
      return orderBy(blocks, (block: { number: any }) => block.number, sortDirection)
    }
    return blocks
  }

  const getDeltaTimestamps = ()  => {
    const utcCurrentTime = getUnixTime(new Date()) * 1000
    const t24h = getUnixTime(startOfMinute(subDays(utcCurrentTime, 1)))
    const t48h = getUnixTime(startOfMinute(subDays(utcCurrentTime, 2)))
    const t7d = getUnixTime(startOfMinute(subWeeks(utcCurrentTime, 1)))
    const t14d = getUnixTime(startOfMinute(subWeeks(utcCurrentTime, 2)))
    return [t24h, t48h, t7d, t14d]
  }

  const POOL_AT_BLOCK = (block: number | null, pools: string[]) => {
    const blockString = block ? `block: {number: ${block}}` : ``
    const addressesString = `["${pools.join('","')}"]`
    return `pairs(
      where: { id_in: ${addressesString} }
      ${blockString}
      orderBy: trackedReserveBNB
      orderDirection: desc
    ) {
      id
      reserve0
      reserve1
      reserveUSD
      volumeUSD
      token0Price
      token1Price
      token0 {
        id
        symbol
        name
      }
      token1 {
        id
        symbol
        name
      }
    }`
  }

  const fetchPoolData = async (
    block24h: number,
    block48h: number,
    block7d: number,
    block14d: number,
    poolAddresses: string[],
  ) => {
    try {
      const query = gql`
        query pools {
          now: ${POOL_AT_BLOCK(null, poolAddresses)}
          oneDayAgo: ${POOL_AT_BLOCK(block24h, poolAddresses)}
          twoDaysAgo: ${POOL_AT_BLOCK(block48h, poolAddresses)}
          oneWeekAgo: ${POOL_AT_BLOCK(block7d, poolAddresses)}
          twoWeeksAgo: ${POOL_AT_BLOCK(block14d, poolAddresses)}
        }
      `
      const data = await infoClient.request<PoolsQueryResponse>(query)
      return { data, error: false }
    } catch (error) {
      console.error('Failed to fetch pool data', error)
      return { error: true }
    }
  }

  const parsePoolData = (pairs?: PoolFields[]) => {
    if (!pairs) {
      return {}
    }
    return pairs.reduce((accum: { [address: string]: FormattedPoolFields }, poolData) => {
      const { volumeUSD, reserveUSD, reserve0, reserve1, token0Price, token1Price } = poolData
      accum[poolData.id] = {
        ...poolData,
        volumeUSD: parseFloat(volumeUSD),
        reserveUSD: parseFloat(reserveUSD),
        reserve0: parseFloat(reserve0),
        reserve1: parseFloat(reserve1),
        token0Price: parseFloat(token0Price),
        token1Price: parseFloat(token1Price),
      }
      return accum
    }, {})
  }
  
  const usePoolDatas = (poolAddresses: string[]): PoolData[] => {
    const [fetchState, setFetchState] = useState<PoolData[]>([])
    const [t24h, t48h, t7d, t14d] = getDeltaTimestamps()
    const { blocks, error: blockError } = useBlocksFromTimestamps([t24h, t48h, t7d, t14d])
    const [block24h, block48h, block7d, block14d] = blocks ?? []
  
    useEffect(() => {
      const fetch = async () => {
        const { error, data } = await fetchPoolData(
          block24h.number,
          block48h.number,
          block7d.number,
          block14d.number,
          poolAddresses,
        )
        if (error) {
        } else {
          const formattedPoolData = parsePoolData(data?.now)
          const formattedPoolData24h = parsePoolData(data?.oneDayAgo)
          const formattedPoolData48h = parsePoolData(data?.twoDaysAgo)
          const formattedPoolData7d = parsePoolData(data?.oneWeekAgo)
          const formattedPoolData14d = parsePoolData(data?.twoWeeksAgo)
          
          let formatted = []
          // Calculate data and format
          for(let i=0;i<poolAddresses.length;i++){
            // Undefined data is possible if pool is brand new and didn't exist one day ago or week ago.
            let address = poolAddresses[i]
            const current: FormattedPoolFields | undefined = formattedPoolData[address]
            const oneDay: FormattedPoolFields | undefined = formattedPoolData24h[address]
            const twoDays: FormattedPoolFields | undefined = formattedPoolData48h[address]
            const week: FormattedPoolFields | undefined = formattedPoolData7d[address]
            const twoWeeks: FormattedPoolFields | undefined = formattedPoolData14d[address]
  
            const [volumeUSD, volumeUSDChange] = getChangeForPeriod(
              current?.volumeUSD,
              oneDay?.volumeUSD,
              twoDays?.volumeUSD,
            )
            const [volumeUSDWeek, volumeUSDChangeWeek] = getChangeForPeriod(
              current?.volumeUSD,
              week?.volumeUSD,
              twoWeeks?.volumeUSD,
            )
  
            const liquidityUSD = current ? current.reserveUSD : 0
  
            const liquidityUSDChange = getPercentChange(current?.reserveUSD, oneDay?.reserveUSD)
  
            const liquidityToken0 = current ? current.reserve0 : 0
            const liquidityToken1 = current ? current.reserve1 : 0
  
            const { totalFees24h, totalFees7d, lpFees24h, lpFees7d, lpApr7d } = getLpFeesAndApr(
              volumeUSD,
              volumeUSDWeek,
              liquidityUSD,
            )
  
            if (current) {
              formatted.push({
                address,
                token0: {
                  address: current.token0.id,
                  name: current.token0.name,
                  symbol: current.token0.symbol,
                },
                token1: {
                  address: current.token1.id,
                  name: current.token1.name,
                  symbol: current.token1.symbol,
                },
                token0Price: current.token0Price,
                token1Price: current.token1Price,
                volumeUSD,
                volumeUSDChange,
                volumeUSDWeek,
                volumeUSDChangeWeek,
                totalFees24h,
                totalFees7d,
                lpFees24h,
                lpFees7d,
                lpApr7d,
                liquidityUSD,
                liquidityUSDChange,
                liquidityToken0,
                liquidityToken1,
              })
            }
          }
          setFetchState(formatted)
        }
      }
  
      const allBlocksAvailable = block24h?.number && block48h?.number && block7d?.number && block14d?.number
      // console.log("All blocks available : ", allBlocksAvailable)
      if (poolAddresses.length > 0 && allBlocksAvailable && !blockError) {
        fetch()
      }
    }, [poolAddresses, block24h, block48h, block7d, block14d, blockError])
  // [poolAddresses, block24h, block48h, block7d, block14d, blockError]
    return fetchState
  }

  const fetchPoolsForToken = async (
    address: string,
  ): Promise<{
    error: boolean
    addresses?: string[]
  }> => {
    try {
      const data = await infoClient.request<PoolsForTokenResponse>(POOLS_FOR_TOKEN, {
        address,
        blacklist: TOKEN_BLACKLIST,
      })
      return {
        error: false,
        addresses: data.asToken0.concat(data.asToken1).map((p: { id: any }) => p.id),
      }
    } catch (error) {
      console.error(`Failed to fetch pools for token ${address}`, error)
      return {
        error: true,
      }
    }
  }

  const usePoolsForToken = (address: string): string[] | undefined => {
    const [poolsForToken, setPoolsForToken] = useState<string[]>([])
  
    useEffect(() => {
      const fetch = async () => {
        const { error: fetchError, addresses } = await fetchPoolsForToken(address)
        if (!fetchError && addresses) {
          setPoolsForToken(addresses)
        }
        if (fetchError) {
        }
      }
      fetch()      
    }, [])
  
    return poolsForToken
  }
  
  const address = "0x1759254eb142bcf0175347d5a0f3c19235538a9a"
  const poolsForToken = usePoolsForToken(address)
  const poolDatas = usePoolDatas(poolsForToken ?? [])

  // for sorting
  const [sortField, setSortField] = useState(SORT_FIELD.volumeUSD)
  const [sortDirection, setSortDirection] = useState<boolean>(true)

  // pagination
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  useEffect(() => {
    let extraPages = 1
    if (poolDatas.length % ITEMS_PER_INFO_TABLE_PAGE === 0) {
      extraPages = 0
    }
    setMaxPage(Math.floor(poolDatas.length / ITEMS_PER_INFO_TABLE_PAGE) + extraPages)
  }, [poolDatas])

  const sortedPools = useMemo(() => {
    return poolDatas
      ? poolDatas
          .sort((a, b) => {
            if (a && b) {
              return a[sortField as keyof PoolData] > b[sortField as keyof PoolData]
                ? (sortDirection ? -1 : 1) * 1
                : (sortDirection ? -1 : 1) * -1
            }
            return -1
          })
          .slice(ITEMS_PER_INFO_TABLE_PAGE * (page - 1), page * ITEMS_PER_INFO_TABLE_PAGE)
      : []
  }, [page, poolDatas, sortDirection, sortField])

  const handleSort = useCallback(
    (newField: string) => {
      setSortField(newField)
      setSortDirection(sortField !== newField ? true : !sortDirection)
    },
    [sortDirection, sortField],
  )
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
                            <Th isNumeric><Box className="tvl_head">TVL<Image src="img/down_arrow.svg" alt="" onClick={() => handleSort(SORT_FIELD.volumeUSD)} /></Box></Th>
                            <Th isNumeric><Box className="volume_head" >24Hr Volume</Box></Th>
                            <Th isNumeric>7d Volume</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                        {
                          sortedPools.length > 0 ? 
                            sortedPools.map((poolData, i) => {
                              return (<Tr>
                                <Td>{i+1}</Td>
                                <Td>
                                  <Box className='poolcolm_data'>
                                    <Image 
                                    width={"32px"}
                                    height={"32px"}
                                    src={`https://assets.trustwalletapp.com/blockchains/smartchain/assets/${isAddress(poolData.token0.address)}/logo.png`} 
                                    alt=""
                                    fallbackSrc='img/unknown.png'
                                    />
                                    <Image 
                                    width={"32px"}
                                    height={"32px"}
                                    src={`https://assets.trustwalletapp.com/blockchains/smartchain/assets/${isAddress(poolData.token1.address)}/logo.png`} 
                                    alt=""
                                    fallbackSrc='img/unknown.png'
                                    />
                                    {poolData.token0.symbol}/{poolData.token1.symbol}</Box>
                                  </Td>
                                <Td isNumeric>${formatAmount(poolData.liquidityUSD)}</Td>
                                <Td isNumeric><Box className="volume_column" >${formatAmount(poolData.volumeUSD)}</Box></Td>
                                <Td isNumeric>${formatAmount(poolData.volumeUSDWeek)}</Td>
                              </Tr>)
                            }) : <></>
                        }
                          
                        </Tbody>
                      </Table>
                    </Box>
                    <Box className='pagination_row'>
                      <Button onClick={() => {
                        setPage(page === 1 ? page : page - 1)
                      }}><Image src='img/pagination_prev.svg' alt=""/></Button>
                      <Text>Page <span>{page} of {maxPage}</span></Text>
                      <Button onClick={() => {
                        setPage(page === maxPage ? page : page + 1)
                      }}><Image src='img/pagination_next.svg' alt="" /></Button>
                    </Box>
                  </Box>
              </Box>
            </Box>
        </LayoutTwo>
    </>
  )
}
