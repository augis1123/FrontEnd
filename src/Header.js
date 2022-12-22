import React, { useState } from 'react'
import { Navbar, Nav, Container, NavDropdown, Modal, Button, Form, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import Logo from './logo.svg'
import axios from 'axios'

export default function Header() {

    const navigate = useNavigate()
    let username = localStorage.getItem('username')

    let userRoles = localStorage.getItem("roles");

    const [errorMessage, setErrorMessage] = useState("");
    const [validEmail, setValidEmail] = useState(false);

    function checkEmail() {
        let re = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

        if (re.test(email)) {
            setValidEmail(true);
        }
        else {
            setErrorMessage("Invalid email")
            setValidEmail(false)
        }
    }


    // Modal login
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUsername] = useState("")
    function decodeJwt(token) {
        var base64Payload = token.split(".")[1];
        var payloadBuffer = Buffer.from(base64Payload, "base64");
        return JSON.parse(payloadBuffer.toString());
      }

    async function signIn() {

        // checkEmail();
        // if (validEmail === false) {
        //     return false
        // }

        let details = { userName, password }
        let json = JSON.stringify(details)

        await axios.post('http://localhost:5232/api/Login', json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                let user = JSON.parse(JSON.stringify(response.data))
                //let kazkas = JSON.parse(Buffer.from(response.data.split('.')[1], 'base64').toString())
                let kazkas = decodeJwt(JSON.stringify(response.data));

                console.log("ghhghg")
                console.log(kazkas)
                console.log(kazkas[Object.keys(kazkas)[0]])
                console.log(kazkas[Object.keys(kazkas)[1]])
                console.log(kazkas[Object.keys(kazkas)[2]])
                console.log(kazkas[Object.keys(kazkas)[3]])
                console.log(kazkas[Object.keys(kazkas)[4]])
                console.log(kazkas[Object.keys(kazkas)[5]])
                console.log(kazkas[Object.keys(kazkas)[6]])
                console.log(kazkas[Object.keys(kazkas)[7]])
                console.log(kazkas[Object.keys(kazkas)[8]])
                //console.log(JSON.parse(JSON.stringify(response.data)));
                localStorage.setItem("access-token", user.token)
                localStorage.setItem("refresh-token", user.refreshToken)
                localStorage.setItem("username", kazkas[Object.keys(kazkas)[0]])
                localStorage.setItem("roles", kazkas[Object.keys(kazkas)[3]])
                localStorage.setItem("id", kazkas[Object.keys(kazkas)[2]])
                handleCloseLogin()
                navigate("/")
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(email);
                    console.log(json);
                    console.warn(error.response.data);
                    setErrorMessage(error.response.data);
                }
            })
    }

    // -------------------------- //

    /*** Modal register ***/



    async function signUp() {

        checkEmail();
        if (validEmail === false) {
            return false
        }

        let details = { userName, email, password}
        let json = JSON.stringify(details)

        await axios.post('http://localhost:5232/api/Register', json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                handleCloseRegister()
                signIn();
                navigate("/")
            })
            .catch(error => {
                console.log(json);
                setErrorMessage(error.response.data);
            })
    }

    // -------------------------- //


    function Logout() {
        localStorage.clear()
        navigate("/")
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand><Link to='/' className='logo'><img style={{ width: 80 }} className='filter-lightgray' src={Logo} alt="Logo" /></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link><Link to='/ChooseSellers' className='link'>Prekių sąrašas</Link></Nav.Link>
                            {
                                localStorage.getItem('access-token') ?
                                    <>
                                        <Nav className="">
                                        </Nav>
                                       


                                    </>
                                    :
                                    <>
                                    </>
                            }
                        </Nav>
                        {
                            localStorage.getItem('access-token') ?
                                <></>
                                :
                                <>
                                    <Nav className="mr-auto">
                                        <Nav.Link className='link' onClick={handleShowLogin}>Login</Nav.Link>
                                        <Nav.Link className='link' onClick={handleShowRegister}>Register</Nav.Link>
                                    </Nav>
                                </>
                        }

                        {
                            localStorage.getItem('access-token') ?
                                <>
                                    <Nav>
                                        <NavDropdown
                                            className="usernamecolor"
                                            title={<span className="usernamecolor">{username && username}</span>}
                                            menuVariant="dark"
                                        >
                                            {
                                                userRoles.includes("Sellerss") ?
                                                <>
                                                    <NavDropdown.Item><Link to="/OwnerCarList" className='link'>Mano prekės</Link></NavDropdown.Item>
                                                </>
                                                :
                                                <></>
                                            }

                                            {
                                                userRoles.includes("Buyer") ?
                                                <>
                                                    <NavDropdown.Item><Link to="/MyBets" className='link'>Mano parduotuvė</Link></NavDropdown.Item>
                                                </>
                                                :
                                                <></>
                                            }
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={Logout}>Log out</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </>
                                :
                                null
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <>
                <Modal show={showLogin} onHide={handleCloseLogin} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {errorMessage && <Alert variant="danger" style={{ textAlign: "center" }}> {errorMessage} </Alert>}
                        <Form>
                            <label htmlFor='userName'>Prisijungimo vardas:</label>
                            <input type="text" name='userName'  onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Prisijungimo vardas" required />
                            <br />
                            <label htmlFor='password'>Slaptažodis:</label>
                            <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" required />
                            <br />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={signIn}>
                            Login
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

            <>
                <Modal show={showRegister} onHide={handleCloseRegister} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {errorMessage && <Alert variant="danger" style={{ textAlign: "center" }}> {errorMessage} </Alert>}
                        <Form>
                            <fieldset>
                                <label htmlFor='username'>Prisijungimo vardas:</label>
                                <input type="text" id='username' value={userName} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Username" required />
                                <br />
                                <label htmlFor='email'>El paštas:</label>
                                <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" required />
                                <br />
                                <label htmlFor='password'>Slaptažodis:</label>
                                <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" required />
                                <br />
                                {/* <Form.Label as="legend" className='text-center'>
                                    Account type
                                </Form.Label>
                                <div key={'inline-radio'} className="mb-3 text-center">
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Buyer"
                                        name="buyer"
                                        id="buyer"
                                        value="Buyer"
                                        defaultChecked
                                        onChange={(e) => setType(e.target.value)}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Seller"
                                        name="buyer"
                                        id="seller"
                                        value="Seller"
                                        onChange={(e) => setType(e.target.value)}
                                    />
                                </div> */}
                            </fieldset>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={signUp}>
                            Register
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

        </div >
    )
}
