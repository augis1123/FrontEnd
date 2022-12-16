import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router';
import { Table, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function BillsList() {

    const { id, id2 } = useParams();
    const [data, setData] = useState([]);
    const [car, setCar] = useState([]);
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");
    console.log( localStorage.getItem("access-token"));
    let userRoles = localStorage.getItem("roles");
    if(userRoles === null)
    {
        userRoles = "Svečias";
    }
    console.log(data)
    let countryid = JSON.parse(JSON.stringify(id))
    let carid = JSON.parse(JSON.stringify(id2))

    useEffect(() => {
        fetchCar(countryid, carid);
        fetchBets(countryid, carid);
    }, [countryid, carid])

    async function fetchBets(countryid, carid) {
        let result = await axios.get('http://localhost:5232/api/sellers/' + countryid + '/items/' + carid + '/bills')
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    async function fetchCar(countryid, carid) {
        let result = await axios.get('http://localhost:5232/api/sellers/' + countryid + '/items/' + carid)
        setCar(JSON.parse(JSON.stringify(result.data)));
    }

    if (car === undefined) {
        return <></>
    }

    return (
        <div>
            <Header />
            <Container>
                <br />
                <h2 style={{ textAlign: "center" }}>Saskaitu Sarašas</h2>
                <br />
                <div className="col-sm-6 offset-sm-3">
                    <div className='float-end'>
                        {
                            userRoles.includes("User") ?
                                <>
                                    <Link to={"/AddBills/" + countryid + '/' + carid} ><Button variant='success' size='sm' className='my-1'>Prideti saskaita</Button></Link>

                                </>
                                :
                                <>
                                </>
                        }
                        <Link to={"/ItemsList/" + countryid} ><Button variant='danger' size='sm' className='my-1 m-1'>Atgal i prekes</Button></Link>
                    </div>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Vardas</th>
                                <th>Pavarde</th>
                                <th>Miestas</th>
                                <th>Adresas</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item) =>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.buyerName}</td>
                                        <td>{item.buyerSecondName}</td>
                                        <td>{item.city}</td>
                                        <td>{item.address}</td>
                                        <td>{item.dateTime}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </Container>
            <Footer />
        </div>
    )
}