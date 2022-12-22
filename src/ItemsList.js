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
    const [sellers, setsellers] = useState([]);
    let userId = localStorage.getItem("id");
    const navigate = useNavigate()


    let sellersId = JSON.parse(JSON.stringify(id))
    console.log(sellersId)
    let userRoles = localStorage.getItem("roles");
    console.log("yeeeet: ",id)
    console.log("noooooo: ", sellersId)
    if(userRoles === null)
    {
        userRoles = "Svečias";
    }

    useEffect(() => {
        fetchsellers(sellersId);
        fetchitemss(sellersId);
    }, [sellersId])

    console.log(sellers.userId)
    console.log(data)
    async function fetchitemss(sellersId) {
        let result = await axios.get('http://localhost:5232/api/sellers/' + sellersId + '/items')
        console.log(sellersId)
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    async function fetchsellers(sellersId) {
        let result = await axios.get('http://localhost:5232/api/sellers/' + sellersId)
        //console.log(sellersId)
        setsellers(JSON.parse(JSON.stringify(result.data)));
    }

    async function deleteItem(itemsid, sellersId) {
        let url = 'http://localhost:5232/api/sellers/' + sellersId + "/items/" + itemsid;
        await axios.delete(url)
        .then(response => {
            navigate("/ItemsList/" + sellersId)
        })
            .catch(error => {
                console.error('There was an error!', error);
                navigate("/ItemsList/" + sellersId)
            });
            fetchitemss(sellersId)
    }

    return (
        <div className="">
            <Header />
            <Container>
                <br />
                <h2 style={{ textAlign: "center" }}>{sellers.name} prekės</h2>
                <br />
                <div className="col-sm-6 offset-sm-3">
                    <div className='float-end'>
                        {
                            userRoles.includes("Seller") && userId === sellers.userId ?
                                <>
                                    <Link to={"/AddItem/" + sellersId} ><Button variant='success' size='sm' className='my-1'>Pridėti prekę</Button></Link>
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
                                    userId === sellers.userId ?
                                    <>
                                    <td><Link to={"/UpdateItems/" + sellersId + "/" + item.id} ><Button variant='success' size='sm' className='my-1'>Atnaujinti</Button></Link></td>
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
                                        userId === sellers.userId?
                                        <>
                                        <td><Button variant="danger" size="sm" onClick={() => deleteItem(item.id, sellersId)}>Pašalinti</Button></td>
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
