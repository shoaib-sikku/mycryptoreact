import React, { useEffect, useState } from 'react'
import { server } from '../index'
import axios from 'axios'
import ScaleLoader from "react-spinners/ScaleLoader";
import ErrorComponent from './ErrorComponent';
import { Container, Stack } from 'react-bootstrap'


const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        let { data } = await axios.get(`${server}/api/v3/exchanges`);
        setLoader(false);
        setExchanges(data);
      } catch (error) {
        setLoader(false)
        setError(true)
      }

    }
    getData();
  }, []);

  if (error) return <ErrorComponent msg={'Error While Fetching Data'} />;

  return (
    <>
      <Container className='py-4'>
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
            <div class='grid-container'>
              {exchanges.map((e) => (
                <ExchangeCard
                  key={e.id}
                  name={e.name}
                  img={e.image}
                  rank={e.trust_score_rank}
                  url={e.url}
                />
              ))}
            </div>
        }

      </Container>
    </>
  )
}

const ExchangeCard = ({ name, url, img, rank }) => (
  <a href={url} target={'blank'}>
    <Stack className='coin-card'>
      <img
        src={img}
        height='40px'
        width='45px'
        alt='exchange'
      />
      <h1 style={{ fontSize: '2rem' }}>{rank}</h1>
      <p>{name}</p>
    </Stack>
  </a>
)

export default Exchanges
