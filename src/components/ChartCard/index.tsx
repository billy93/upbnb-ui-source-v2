import { Skeleton, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Box, Card, Flex } from 'rebass'
// import { formatAmount } from '../../utils/formatInfoNumbers'
import { ChartEntry, PriceChartEntry } from '../../state/info/types'
import { formatAmount } from '../../utils/formatInfoNumbers'
import CandleChart from '../CandleChart'
// import CandleChart from '../CandleChart'


// enum ChartView {
//   LIQUIDITY,
//   VOLUME,
//   PRICE,
// }

interface ChartCardProps {
  variant: 'pool' | 'token'
  chartData: ChartEntry[]
  tokenPriceData?: PriceChartEntry[]
}

const ChartCard: React.FC<ChartCardProps> = ({ variant, chartData, tokenPriceData }) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>()
  const [hoverDate, setHoverDate] = useState<string | undefined>()
  // const {
  //   t,
  //   currentLanguage: { locale },
  // } = useTranslation()
  const currentDate = new Date().toLocaleString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })

  // const formattedTvlData = useMemo(() => {
  //   if (chartData) {
  //     return chartData.map((day) => {
  //       return {
  //         time: fromUnixTime(day.date),
  //         value: day.liquidityUSD,
  //       }
  //     })
  //   }
  //   return []
  // }, [chartData])
  // const formattedVolumeData = useMemo(() => {
  //   if (chartData) {
  //     return chartData.map((day) => {
  //       return {
  //         time: fromUnixTime(day.date),
  //         value: day.volumeUSD,
  //       }
  //     })
  //   }
  //   return []
  // }, [chartData])

  const getLatestValueDisplay = () => {
    let valueToDisplay = null
    if (hoverValue) {
      valueToDisplay = formatAmount(hoverValue)
    } else {
      valueToDisplay = formatAmount(0)
      // if(tokenData != null){
      //   valueToDisplay = formatAmount(tokenData.priceUSD)
      // }
    }

    return valueToDisplay ? (
      <Text fontSize='lg' textColor={'white'}>
        ${valueToDisplay}
      </Text>
    ) : (
      <Skeleton height="36px" width="128px" />
    )
  }

  return (
    <Card>
      <Flex flexDirection="column" px="24px" pt="24px">
        {getLatestValueDisplay()}
        <Text fontSize='lg'  textColor={'white'}>
          {hoverDate || currentDate}
        </Text>
      </Flex>

      <Box px="24px">
          <CandleChart data={tokenPriceData || []} setValue={setHoverValue} setLabel={setHoverDate} /> 
      </Box>
    </Card>
  )
}

export default ChartCard
