import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router';
import { Table, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'

export default function ItemsList() {
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [country, setCountry] = useState([]);
    let userId = localStorage.getItem("id");
    const navigate = useNavigate()


    let countryid = JSON.parse(JSON.stringify(id))
    console.log(countryid)
    let userRoles = localStorage.getItem("roles");
    console.log("yeeeet: ",id)
    console.log("noooooo: ", countryid)
    if(userRoles === null)
    {
        userRoles = "Svečias";
    }

    useEffect(() => {
        fetchCountry(countryid);
        fetchCars(countryid);
    }, [countryid])

    console.log(country.userId)
    console.log(data)
    async function fetchCars(countryid) {
        let result = await axios.get('http://localhost:5232/api/sellers/' + countryid + '/items')
        console.log(countryid)
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    async function fetchCountry(countryid) {
        let result = await axios.get('http://localhost:5232/api/sellers/' + countryid)
        //console.log(countryid)
        setCountry(JSON.parse(JSON.stringify(result.data)));
    }

    async function deleteItem(carid, countryid) {
        let url = 'http://localhost:5232/api/sellers/' + countryid + "/items/" + carid;
        await axios.delete(url)
        .then(response => {
            navigate("/ItemsList/" + countryid)
        })
            .catch(error => {
                console.error('There was an error!', error);
                navigate("/ItemsList/" + countryid)
            });
            fetchCars(countryid)
    }

    return (
        <div className="">
            <Header />
            <Container>
                <br />
                <h2 style={{ textAlign: "center" }}>{country.name} prekės</h2>
                <br />
                <div className="col-sm-6 offset-sm-3">
                    <div className='float-end'>
                        {
                            userRoles.includes("Seller") && userId === country.userId ?
                                <>
                                    <Link to={"/AddItem/" + countryid} ><Button variant='success' size='sm' className='my-1'>Pridėti prekę</Button></Link>
                                </>
                                :
                                <>
                                </>
                        }
                        <Link to={"/ChooseSellers"} ><Button variant='danger' size='sm' className='my-1 m-1'>Grižti į pirkėjus</Button></Link>
                    </div>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th key="name">Pavadinimas</th>
                                <th key="description">Aprašymas</th>
                                <th key="price">Kaina</th>
                                <th key="count">Kiekis</th>
                                <th key="actions">Veiksmas</th>
                                {
                            userRoles.includes("Seller") ?
                                <>
                                    <th>Pardaveju funkcija</th>
                                    <th>Pardaveju funkcija</th>
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
                                        <td style={{ verticalAlign: "middle" }} key="{1*item.id}">{item.name}</td>
                                        <td style={{ verticalAlign: "middle" }} key="{2*item.id}">{item.description}</td>
                                        <td style={{ verticalAlign: "middle" }} key="{3*item.id}">{item.price}</td>
                                        <td style={{ verticalAlign: "middle" }} key="{4*item.id}">{item.count}</td>
                                        <td style={{ verticalAlign: "middle" }} key="{7*item.id}">
                                            <div className='text-center'>
                                                { userRoles.includes("Seller") || userRoles.includes("User") || userRoles.includes("Admin")  ?
                                                <>
                                                <Link to={"/BillsList/" + item.sellersId + '/' + item.id}><Button variant="success" size="sm">Sąskaitos</Button></Link>
                                                </>
                                                :
                                                <>
                                                </>
                                                }</div></td>
                                                      {
                            userRoles.includes("Seller") ?
                                <>
                                {
                                    userId === country.userId ?
                                    <>
                                    <td><Link to={"/UpdateItems/" + countryid + "/" + item.id} ><Button variant='success' size='sm' className='my-1'>Atnaujinti</Button></Link></td>
                                    </>
                                    :
                                    <>
                                    <td>Ne jusu parduotuve</td>
                                    </>
                                }

                                </>
                                :
                                <>
                                </>
                        }
                       
                       {
                            userRoles.includes("Seller") ?
                                <>
                                    {
                                        userId === country.userId?
                                        <>
                                        <td><Button variant="danger" size="sm" onClick={() => deleteItem(item.id, countryid)}>Delete</Button></td>
                                        </>
                                        :
                                        <>
                                        <td>Ne jusu parduotuve</td>
                                        </>
                                    }
                                    
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
