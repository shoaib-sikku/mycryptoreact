import React, { useEffect, useState } from 'react';
import { server } from '../index';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ScaleLoader from "react-spinners/ScaleLoader";
import ErrorComponent from './ErrorComponent';
import { Container, Stack, Button } from 'react-bootstrap';

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [country, setCountry] = useState('inr');

  useEffect(() => {
    const getData = async () => {
      try {
        let { data } = await axios.get(`${server}/api/v3/coins/markets?vs_currency=${country}&page=${page}`);
        setCoins(data);
        setLoader(false);

      } catch (error) {
        setLoader(false);
        setError(true);
      }

    }
    getData();
  }, [country, page]);

  const changePage = (p) => {
    setPage(p);
  }

  let arr = new Array(124).fill(1);

  if (error) return <ErrorComponent msg={'Error While Fetching Data'} />;

  return (
    <>
      <Container>
        {
          loader ? <ScaleLoader
            color={'rgb(58, 128, 233)'}
            loading={loader}
            cssOverride={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> :
            <>
              <Stack direction='horizontal' className='mb-4' gap={'2'}>
                <input type="radio" name='group' id='1' value='inr' onChange={(e) => setCountry(e.target.value)} checked />
                <label htmlFor="1">INR</label>
                <input type="radio" name='group' id='2' value='usd' onChange={(e) => setCountry(e.target.value)} />
                <label htmlFor="2">USD</label>
                <input type="radio" name='group' id='3' value='eur' onChange={(e) => setCountry(e.target.value)} />
                <label htmlFor="3">EUR</label>
              </Stack>
              <div className='grid-container'>
                {coins.map((e) => (
                  <CoinCard
                    cursym={country === 'inr' ? '₹' : country === 'usd' ? '$' : '€'}
                    key={e.id}
                    name={e.id}
                    price={e.current_price}
                    symbol={e.symbol}
                    img={e.image}
                  />
                ))}
              </div>
              <Stack direction='horizontal' className='p-1 my-4' style={{ overflowX: 'auto' }}>
                {arr.map((item, index) => (
                  <Button
                    className='mx-1'
                    key={index}
                    onClick={() => changePage(index + 1)}
                    disabled={page === index + 1}
                  >
                    {index + 1}
                  </Button>
                ))}
              </Stack>
            </>
        }

      </Container>
    </>
  )
}

const CoinCard = ({ name, symbol, img, price, cursym }) => (
  <Link to={`/coins/${name}`}>
    <Stack className='coin-card'>
      <img
        src={img}
        height='50px'
        width='50px'
        alt={'exchange'}
      />
      <h2>{symbol}</h2>
      <p>{name}</p>
      <p>{cursym}{price}</p>

    </Stack>
  </Link>
)
export default Dashboard
