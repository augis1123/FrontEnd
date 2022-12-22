import React, { useState, useEffect, useMemo } from 'react'
import Header from './Header'
import { Container, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function AddSeller() {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");

    const { id, id2 } = useParams();

    const navigate = useNavigate()


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [count, setCount] = useState(0);
    let yesid = JSON.parse(JSON.stringify(id))
    console.log(yesid)
    async function addItem(e) {
        e.preventDefault();


        let details = { name,description, price, count }
        let json = JSON.stringify(details);

        await axios.post('http://localhost:5232/api/sellers/' + yesid + '/items' , json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                navigate("/ItemsList/" + yesid)
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
                    <h2>Prideti preke</h2>
                    <br />
                    <Form onSubmit={addItem}>
                        <fieldset>
                            <input type="text"  value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Pavadinimas prekes" required />
                            <br />
                            <input type="text"  value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Aprasymas" required />
                            <br />
                            <label htmlFor='kaina'>Kaina:</label>
                            <input type="number" id="kaina" min={0} value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" placeholder="Kaina" required />
                            <br />
                            <label htmlFor='Kiekis'>Kiekis:</label>
                            <input type="number" id="Kiekis" min={0}  value={count} onChange={(e) => setCount(e.target.value)} className="form-control" placeholder="Kiekis" required />
                            <br />
                            <button id="submit" value="submit" className="btn btn-success">Sukurti</button>
                            <Link to={"/ItemsList/"+yesid} ><Button variant='danger' className='my-1 m-1'>Grižti</Button></Link>
                        </fieldset>
                    </Form>

                </div>
            </Container>
            <Footer />
        </div>
    )
}