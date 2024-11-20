import Navbar from "react-bootstrap/Navbar";
import './App.css'
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Button} from "react-bootstrap";
import {useState} from "react";

function App() {
    const [searchedTicker, setSearchedTicker] = useState('');

    const search = async (event: React.FormEvent) => {
        console.log(searchedTicker);
        setSearchedTicker("");
    }

  return (
    <>
        <Navbar fixed="top" bg="dark" data-bs-theme="dark">
            <Navbar.Brand>
                Insider Trading Tracker
            </Navbar.Brand>
        </Navbar>

        <Container className="content-container">
            <Container className="form-container">
                <Form onSubmit={search}>
                    <Row className="align-items-center">
                        <Col xs={1}>
                            <img
                                src="../public/search.png"
                                alt="search icon"
                                style={{ width: '30px', height: '30px' }}
                            />
                        </Col>
                        <Col xs={2}>
                            <Form.Control placeholder="Ticker"
                                          onChange={(e) => {
                                              setSearchedTicker(e.target.value)}}
                                          value={searchedTicker}
                            />
                        </Col>
                        <Col xs={2}>
                            <Form.Control placeholder="Buy/Sell"
                                          onChange={(e) => {
                                              setSearchedTicker(e.target.value)}}
                                          value={searchedTicker}
                            />
                        </Col>
                        <Col xs={3}>
                            <Button type="submit" className="bg-dark border-black">Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Container>

            <Container className="d-flex justify-content-center align-items-center table-container">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Ticker</th>
                            <th scope="col">Buy/Sell</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">AMZN</th>
                        <td>Buy</td>
                        <td>1 morbillion</td>
                    </tr>
                    <tr>
                        <th scope="row">MSFT</th>
                        <td>Sell</td>
                        <td>three</td>
                    </tr>
                    <tr>
                        <th scope="row">BLAH</th>
                        <td>Sell</td>
                        <td>four</td>
                    </tr>
                    </tbody>
                </table>
            </Container>

    </>
  )
}

export default App
