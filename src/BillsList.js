import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router';
import { Table, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'
export default function BillsList() {
    const navigate = useNavigate()
    const { id, id2 } = useParams();

    const [data, setData] = useState([]);
    const [car, setCar] = useState([]);
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");
    let userRoles = localStorage.getItem("roles");
    if(userRoles === null)
    {
        userRoles = "Svečias";
    }
    let countryid = JSON.parse(JSON.stringify(id))
    let carid = JSON.parse(JSON.stringify(id2))

    useEffect(() => {
        fecthItems(countryid, carid);
        fecthBills(countryid, carid);
    }, [countryid, carid])

    async function fecthBills(countryid, carid) {
        let result = await axios.get('http://localhost:5232/api/sellers/' + countryid + '/items/' + carid + '/bills')
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    async function fecthItems(countryid, carid) {
        let result = await axios.get('http://localhost:5232/api/sellers/' + countryid + '/items/' + carid)
        setCar(JSON.parse(JSON.stringify(result.data)));
    }

    if (car === undefined) {
        return <></>
    }

    async function deleteItem(carid, countryid, billid) {
        let url = 'http://localhost:5232/api/sellers/' + countryid + "/items/" + carid + "/bills/"+ billid;
        await axios.delete(url)
        .then(response => {
            navigate("/ItemsList/" + countryid)
        })
            .catch(error => {
                console.error('There was an error!', error);
                navigate("/ItemsList/" + countryid)
            });
            fecthBills(countryid, carid)
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
                                {
                                        userRoles.includes("Admin") ?
                                        <>
                                        <td>Admin teises</td>
                                        </>
                                        :
                                        <>
                                        </>
                                    }
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

                                        {
                                        userRoles.includes("Admin") ?
                                        <>
                                        <td><Button variant="danger" size="sm" onClick={() => deleteItem(countryid, carid, item.id)}>Pašalinti</Button></td>
                                        </>
                                        :
                                        <>
                                        </>
                                    }
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