import Navbar from "react-bootstrap/Navbar";
import './App.css'
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [searchedTicker, setSearchedTicker] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [bsFilter, setBsFilter] = useState('');
    const [showClear, setShowClear] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsPerPage] = useState(10);

    const search = async (event: React.FormEvent) => {
        if (searchedTicker === '' && bsFilter === '') {
            clearFilter();
        } else {
            const response = await axios.get("http://localhost:8080/transactionSearch", {
                params: {
                    searchedTicker: searchedTicker,
                    bsFilter: bsFilter
                }
            })
            setTransactions(response.data);
            setShowClear(true);
            setCurrentPage(1);
        }
    }

    const clearFilter = () => {
        fetchAPI();
        setSearchedTicker("");
        setBsFilter("");
        setShowClear(false);
        setCurrentPage(1);
    }

    const fetchAPI = async () => {
        const response = await axios.get("http://localhost:8080/transactions")
        setTransactions(response.data);
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            search(event);
        }
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(transactions.length / transactionsPerPage);

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
                                  style={{width: '30px', height: '30px'}}
                              />
                          </Col>
                          <Col xs={2}>
                              <Form.Control placeholder="Ticker"
                                            onChange={(e) => {
                                                setSearchedTicker(e.target.value)
                                            }}
                                            value={searchedTicker}
                                            onKeyDown={handleKeyDown}
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
              <Table className="table table-striped table-bordered">
                  <thead className="table-dark">
                  <tr>
                      <th style={{width: 100}} scope="col">Ticker</th>
                      <th scope="col">Owner</th>
                      <th style={{width: 100}} scope="col">Buy/Sell</th>
                      <th scope="col"># Of Shares</th>
                      <th scope="col">Total Value</th>
                      <th scope="col">Date</th>
                  </tr>
                  </thead>
                  <tbody>
                  {currentTransactions.map((transaction, index) => (
                      <tr key={index}>
                          <td>{transaction.ticker_symbol}</td>
                          <td>{transaction.owner}</td>
                          <td>{transaction.transaction_type}</td>
                          <td>{parseInt(transaction.shares)}</td>
                          <td>{transaction.total_value}</td>
                          <td>{transaction.transaction_date}</td>
                      </tr>
                  ))}
                  </tbody>
              </Table>
          </Container>

          <Container className="d-flex justify-content-center align-items-center">
              <Button
                  className="bg-dark border-black"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
              >
                  Previous
              </Button>
              <span> Page {currentPage} of {totalPages} </span>
              <Button
                  className="bg-dark border-black"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
              >
                  Next
              </Button>
          </Container>

      </>
  )
}

export default App
