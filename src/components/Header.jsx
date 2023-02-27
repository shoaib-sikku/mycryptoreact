import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>

      <Navbar expand={'sm'} className="mb-3" sticky='top'>
        <Container fluid>
          <Link to={'/'}><h1 className='navbar-brand'>MyCrypto</h1></Link>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-sm`}
            aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                {/* offcanvas header */}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 align-items-center gap-3">
                <Link to={'/'}>Home</Link>
                <Link to={'/exchanges'}>Exchange</Link>
                <Link to={'/dashboard'} ><span className='main-btn'>Dashboard</span></Link>

              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
