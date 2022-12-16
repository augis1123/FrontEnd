import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Table, Container , Button} from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

export default function ChooseSellers() {
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");
    let userRoles = localStorage.getItem("roles");
    const [countrys, setCountrys] = useState([]);
    let userId = localStorage.getItem("id");
    console.log(userId)
    const navigate = useNavigate()
    useEffect(() => {
        fetchCountrys();
    }, [])

    async function fetchCountrys() {
        let result = await axios.get('http://localhost:5232/api/sellers')
        setCountrys(JSON.parse(JSON.stringify(result.data)));
        console.log(countrys[1])
    }

    async function deleteSeller(carid) {
        let url = 'http://localhost:5232/api/sellers/' + carid;
        await axios.delete(url)
        .then(response => {
            navigate("/ChooseSellers")
        })
            .catch(error => {
                console.error('There was an error!', error);
                navigate("/ChooseSellers")
            });
            fetchCountrys()
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <Header />
            <Container>
                <br />
                <h2 >Pasirinkitę pardavėją</h2>
                <div className='float-end'>
                        {
                            userRoles.includes("Seller") ?
                                <>
                                    <Link to={"/AddSeller/"} ><Button variant='success' size='sm' className='my-1'>Prideti parduotuve</Button></Link>

                                </>
                                :
                                <>
                                </>
                        }
                        
                    </div>
                <div className="col-sm-6 offset-sm-3">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Pardavėjai</th>

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
                                countrys.map((item) =>
                                    <tr>
                                        <td><Link to={"/ItemsList/"+item.id} className='link'>{item.name}</Link></td>

                        {
                            userRoles.includes("Seller") ?
                                <>
                                {
                                    userId === item.userId ?
                                    <>
                                    <td><Link to={"/UpdateSeller/" + item.id} ><Button variant='success' size='sm' className='my-1'>Atnaujinti</Button></Link></td>
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
                                        userId === item.userId ?
                                        <>
                                        <td><Button variant="danger" size="sm" onClick={() => deleteSeller(item.id)}>Delete</Button></td>
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