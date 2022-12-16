import React, { useState, useEffect } from 'react'
import Header from './Header'
import { useParams } from 'react-router';
import axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Footer from './Footer';

export default function UpdateItems(props) {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");
    const navigate = useNavigate()
    
    const { id, idd } = useParams();
    let jid = JSON.parse(JSON.stringify(id))
    let jjid = JSON.parse(JSON.stringify(idd))
    const [data, setData] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [count, setCount] = useState(0)
    console.log(data)
    useEffect(() => {
        fetchCountry(jid, jjid);
    }, [jid, jjid])

    async function fetchCountry(jid, jjid) {
        let result = await axios.get('http://localhost:5232/api/sellers/' + jid + "/items/" + jjid)
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    async function updateCountry(e) {
        e.preventDefault()

        let details = {name, description, price, count}
        let json = JSON.stringify(details);

        await axios.put('http://localhost:5232/api/sellers/' + jid + "/items/" + jjid, json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                navigate("/Itemslist/" + jid)
            })
            .catch(error => {
                console.log(error.response.data);
            });

    }

    return (
        <div className="App">
            <Header />
            <Container>
                <Form onSubmit={updateCountry}>
                    <h2>Atnaujinti preke</h2>
                    <br />
                    <div className="col-sm-6 offset-sm-3">
                        <fieldset>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={data.name} className="form-control" required />
                            <br />
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={data.description} className="form-control" required />
                            <br />
                            <input type="number"  min="0" value={price} onChange={(e) => setPrice(e.target.value)} placeholder={data.price} className="form-control" required />
                            <br />
                            <input type="number"  min="0" value={count} onChange={(e) => setCount(e.target.value)} placeholder={data.count} className="form-control" required />
                            <br />
                            <br />
                            <Button variant="success" type="submit" id="submit" value="Submit">Change</Button>
                        </fieldset>
                    </div>
                </Form>
            </Container>
            <Footer />
        </div>
    )
}
