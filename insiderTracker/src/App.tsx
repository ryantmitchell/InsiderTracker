import Navbar from "react-bootstrap/Navbar";
import './App.css'
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [searchedTicker, setSearchedTicker] = useState('');
    const [fetchedData, setFetchedData] = useState([]);
    const [bsFilter, setBsFilter] = useState('');
    const [showClear, setShowClear] = useState(false);

    const search = async (event: React.FormEvent) => {
        console.log(searchedTicker);
        setShowClear(true);
    }

    const clearFilter = () => {
        setSearchedTicker("");
        setBsFilter("");
        setShowClear(false);
    }

    const fetchAPI = async () => {
        const response = await axios.get("http://localhost:8080/api")
        setFetchedData(response.data.fruits);
    }

    useEffect(() => {
        fetchAPI();
    }, []);

  return (
    <>
        <Navbar fixed="top" bg="dark" data-bs-theme="dark">
            <Navbar.Brand>
                Insider Trading Tracker
            </Navbar.Brand>
        </Navbar>

        <Container className="content-container">
            <Container className="form-container">
                <Form>
                    <Row className="align-items-center">
                        <Col xs={1}>
                            <img
                                src="/search.png"
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
                            <Form.Select
                                onChange={(e) => setBsFilter(e.target.value)}
                                value={bsFilter}
                            >
                                <option value="">Buy and Sell</option>
                                <option value="Buy">Buy</option>
                                <option value="Sell">Sell</option>
                            </Form.Select>
                        </Col>
                        <Col xs={5}>
                            <Button onClick={search} className="bg-dark border-black">Submit</Button>
                        </Col>
                        <Col xs={2}>
                            {showClear && (
                                <Button onClick={clearFilter} className="bg-danger border-black">
                                    Clear Search
                                </Button>
                                )}
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
                        {fetchedData.map((row, index) => (
                            <tr key={index}>
                                <td>{row[0]}</td>
                                <td>{row[1]}</td>
                                <td>{row[2]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>

    </>
  )
}

export default App
