import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import img1 from '../assets/gradient.png'
import img2 from '../assets/crypto-iphone.png'
const Home = () => {
  return (
    <>
      <Container fluid>
        <Row style={{ minHeight: '90vh' }}>
          <Col md={7} className='heading-container'>
            <h1 className="big-heading">
              <span className="stroke" style={{ opacity: 1, transform: 'none' }}>Track Crypto</span>
              <br />
              <span className="big-heading-blue">Real Time.</span>
            </h1>
            <p class="para">Track crypto through a public api in real time. Visit the dashboard to do so!</p>
            <div className='btn-div d-flex mt-3'>
              <Link to={'/dashboard'}><div className='main-btn'>Dashboard</div></Link>
              <div></div>
            </div>
          </Col>
          <Col md={5}>
            <div className='img-box'>
              <img
                src={img1}
                alt="gradient"
              />
              <img
                src={img2}
                alt="phone"
                className="home-animation"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
