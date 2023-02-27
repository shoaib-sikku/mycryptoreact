import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap'

const ErrorComponent = ({ msg }) => {
  toast.error(msg, {
    position: "bottom-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  return (
    <>
      <Container className='d-flex justify-content-center mt-5 ' style={{ height: '90vh' }}>
        <h1>Ops!Error occured because something is wrong</h1>
        <ToastContainer
          position="bottom-center"
          autoClose={10000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Container>

    </>
  )
}

export default ErrorComponent
