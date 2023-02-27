import React, { useEffect, useState } from 'react'
import { server } from '../index'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {
  Container, HStack, Radio, RadioGroup, VStack, Text, Image, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Badge, Box, Progress
} from '@chakra-ui/react'
import Chartjs from './Chartjs'
import ScaleLoader from "react-spinners/ScaleLoader";
import ErrorComponent from './ErrorComponent'



const CoinDetail = () => {
  const params = useParams();
  const [coinDetail, setCoinDetail] = useState([]);
  const [chartArray, setChartArray] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr');
  const [days, setDays] = useState('24h');

  const currencySymbol = currency === 'inr' ? '₹' : currency === 'usd' ? '$' : '€';
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChart = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoader(true);
        break;
      case "7d":
        setDays("7d");
        setLoader(true);
        break;
      case "14d":
        setDays("14d");
        setLoader(true);
        break;
      case "30d":
        setDays("30d");
        setLoader(true);
        break;
      case "60d":
        setDays("60d");
        setLoader(true);
        break;
      case "200d":
        setDays("200d");
        setLoader(true);
        break;
      case "1y":
        setDays("365d");
        setLoader(true);
        break;
      case "max":
        setDays("max");
        setLoader(true);
        break;

      default:
        setDays("24h");
        setLoader(true);
        break;
    }
  };

  useEffect(() => {
    try {
      const getData = async () => {
        const { data } = await axios.get(`${server}/api/v3/coins/${params.id}`);
        const { data: ChartData } = await axios.get(`${server}/api/v3/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setCoinDetail(data);
        setChartArray(ChartData.prices);
        setLoader(false)
      }
      getData()
    }
    catch (error) {
      setError(error)
      setLoader(false)
    }
  }, [days, currency, params.id])

  if (error) return <ErrorComponent msg={'Error While Fetching Data'} />;
  return (
    <>
      <Container maxW='container.xl'>
        {
          loader ?
            <ScaleLoader
              color={'rgb(58, 128, 233)'}
              Loader={loader}
              cssOverride={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              size={150}
              aria-label="Loader Spinner"
              data-testid="loader"
            /> :
            <>
              <Chartjs arr={chartArray} currency={currency} days={days} />
              <HStack p={'4'} overflowX={'auto'}>
                {
                  btns.map((i) => (
                    <button
                      key={i}
                      onClick={() => switchChart(i)}
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        padding: '4px 6px',
                        borderRadius: '5px'
                      }}
                    >
                      {i}
                    </button>
                  ))
                }
              </HStack>
              <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
                <HStack wrap={'wrap'} >
                  <Radio value='inr'>INR</Radio>
                  <Radio value='usd'>USD</Radio>
                  <Radio value='eur'>EUR</Radio>
                </HStack>
              </RadioGroup>
              <VStack align={'flex-start'}>
                <Text opacity={'0.6'} alignSelf={'center'} fontSize={"sm"}>
                  Last Update On{' '}{Date(coinDetail.market_data.last_updated).split('G')[0]}
                </Text>
                <Image src={coinDetail.image.large} w={'16'} h={'16'} />
                <Stat>
                  <StatLabel>{coinDetail.name}</StatLabel>
                  <StatNumber>
                    {currencySymbol}
                    {coinDetail.market_data.current_price[currency]}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow
                      type={
                        coinDetail.market_data.price_change_percentage_24h > 0
                          ? "increase"
                          : "decrease"
                      }
                    />
                    {coinDetail.market_data.price_change_percentage_24h}%
                  </StatHelpText>
                </Stat>
                <Badge
                  fontSize={"2xl"}
                  bgColor={"blackAlpha.800"}
                  color={"white"}
                >{`#${coinDetail.market_cap_rank}`}</Badge>

                <CustomBar
                  high={`${currencySymbol}${coinDetail.market_data.high_24h[currency]}`}
                  low={`${currencySymbol}${coinDetail.market_data.low_24h[currency]}`}
                />

                <Box w={"full"} p="4">
                  <Item title={"Max Supply"} value={coinDetail.market_data.max_supply} />
                  <Item
                    title={"Circulating Supply"}
                    value={coinDetail.market_data.circulating_supply}
                  />
                  <Item
                    title={"Market Cap"}
                    value={`${currencySymbol}${coinDetail.market_data.market_cap[currency]}`}
                  />
                  <Item
                    title={"All Time Low"}
                    value={`${currencySymbol}${coinDetail.market_data.atl[currency]}`}
                  />
                  <Item
                    title={"All Time High"}
                    value={`${currencySymbol}${coinDetail.market_data.ath[currency]}`}
                  />
                </Box>
              </VStack>
            </>
        }
      </Container>
    </>
  )
}

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
);

export default CoinDetail
