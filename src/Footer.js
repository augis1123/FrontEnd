import React from 'react'
import { Container } from 'react-bootstrap'
import './footer.css'

export default function Footer() {

    return (
        <div className='footer text-center mt-auto'>
            <Container>
                <footer>
                    {new Date().getFullYear()} Augustas Druceika
                </footer>
            </Container>
        </div>
    )
}