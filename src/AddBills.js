import React, { useState, useEffect, useMemo } from 'react'
import Header from './Header'
import { Container, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function AddBills() {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");

    const { id, id2 } = useParams();
    const navigate = useNavigate()


    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [buyerName, setBuyerName] = useState("");
    const [buyerSecondName, setBuyerSecondName] = useState("");

    let countryid = JSON.parse(JSON.stringify(id))
    let carid = JSON.parse(JSON.stringify(id2))


    async function addBet(e) {
        e.preventDefault();

        let details = { city, address, buyerName, buyerSecondName }
        let json = JSON.stringify(details);

        await axios.post('http://localhost:5232/api/sellers/' + countryid + '/items/' + carid + '/bills' , json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                navigate("/BillsList/"+ countryid + '/' + carid)
            })
            .catch(error => {
                //setErrorMessage(error.response.data);
                console.log(error)
            });
    }

    return (
        <div className="App">
            <Header />
            <Container>
                <br />
                <div className="col-sm-6 offset-sm-3">
                    <h2>Prideti saskaita</h2>
                    <br />
                    <Form onSubmit={addBet}>
                        <fieldset>
                            <input type="text"  value={city} onChange={(e) => setCity(e.target.value)} className="form-control" placeholder="Miestas" required />
                            <br />
                            <input type="text"  value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="Adresas" required />
                            <br />
                            <input type="text"  value={buyerName} onChange={(e) => setBuyerName(e.target.value)} className="form-control" placeholder="Vardas" required />
                            <br />
                            <input type="text"  value={buyerSecondName} onChange={(e) => setBuyerSecondName(e.target.value)} className="form-control" placeholder="Pavarde" required />
                            <br />
                            <button id="submit" value="submit" className="btn btn-success">Sukurti</button>
                            <Link to={"/BillsList/" + countryid + '/' + carid} ><Button variant='danger' className='my-1 m-1'>Grižti</Button></Link>
                        </fieldset>
                    </Form>

                </div>
            </Container>
            <Footer />
        </div>
    )
}