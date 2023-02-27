import React from 'react'
import notFound from '../assets/404.jpg'
import { Link } from 'react-router-dom'
const PageNotFound = () => {
    const containerStyle = {
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
    }
    const btnStyle = {
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: '7px',
        padding: '2px 6px'
    }
    return (
        <>
            <div style={containerStyle}>
                <img src={notFound} alt="404" width={'500px'} />
                <Link to={'/'}>
                    <button style={btnStyle}>Go to Homepage</button>
                </Link>
            </div>
        </>
    )
}

export default PageNotFound
