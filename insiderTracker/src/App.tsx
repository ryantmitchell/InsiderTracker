import Navbar from "react-bootstrap/Navbar";
import './App.css';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

function App() {
    const [filters, setFilters] = useState({
        searchedTicker: '',
        bsFilter: '',
    });
    const [sortBy, setSortBy] = useState('Date');
    const [transactions, setTransactions] = useState([]);
    const [transactionsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const search = async (event: React.FormEvent) => {
        event.preventDefault();
        fetchTransactions();
    };

    const clearFilters = () => {
        setFilters({
            searchedTicker: '',
            bsFilter: '',
        });
        fetchTransactions();
        setCurrentPage(1);
    }

    const fetchTransactions = async () => {
        const { searchedTicker, bsFilter } = filters;
        try {
            const endpoint = searchedTicker || bsFilter ? "/transactionSearch" : "/transactions";
            const response = await axios.get(`http://localhost:8080${endpoint}`, {
                params: { ...filters, sortBy },
            });
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            search(event);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [sortBy]);

    const handleSortChange = (value) => {
        setSortBy(value);
    };

    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(transactions.length / transactionsPerPage);

    const dollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const groupByWeek = (transactions) => {
        const grouped = {};

        transactions.forEach((t) => {
            const transactionDate = new Date(t.transaction_date);

            // Calculate the start of the week (Sunday)
            const weekStart = new Date(transactionDate);
            weekStart.setHours(0, 0, 0, 0); // Reset time to midnight
            weekStart.setDate(transactionDate.getDate() - transactionDate.getDay());

            const key = weekStart.toISOString().split('T')[0]; // Format as YYYY-MM-DD

            // Initialize if key doesn't exist
            if (!grouped[key]) {
                grouped[key] = { date: key, Buy: 0, Sell: 0 };
            }

            // Aggregate Buy/Sell counts
            const transactionType = t.transaction_type.toLowerCase(); // Normalize casing
            if (transactionType === 'buy') {
                grouped[key].Buy += parseInt(t.shares, 10) || 0;
            } else if (transactionType === 'sell') {
                grouped[key].Sell += parseInt(t.shares, 10) || 0;
            }
        });

        return Object.values(grouped);
    };

    const weeklyData = groupByWeek(transactions);

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
                            <Col xs={2}>
                                <Form.Control
                                    placeholder="Ticker"
                                    onChange={(e) => handleFilterChange('searchedTicker', e.target.value)}
                                    value={filters.searchedTicker}
                                />
                            </Col>
                            <Col xs={2}>
                                <Form.Select
                                    onChange={(e) => handleFilterChange('bsFilter', e.target.value)}
                                    value={filters.bsFilter}
                                >
                                    <option value="">Buy and Sell</option>
                                    <option value="Buy">Buy</option>
                                    <option value="Sell">Sell</option>
                                </Form.Select>
                            </Col>
                            <Col xs={1}>
                                <Button type="submit" className="bg-dark border-black">Submit</Button>
                            </Col>
                            <Col><Button type="submit" onClick={clearFilters} className="bg-danger border-black">Clear Filter</Button></Col>
                            <Col xs={2}>
                                <Form.Select
                                    onChange={(e) => handleSortChange(e.target.value)}
                                    value={sortBy}
                                >
                                    <option value="Date">Date</option>
                                    <option value="Ticker">Ticker</option>
                                    <option value="Value">Value</option>
                                    <option value="Shares">Shares</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Form>

                </Container>
            </Container>

            <Container className="d-flex justify-content-center align-items-center my-4">
                <BarChart
                    width={800}
                    height={400}
                    data={weeklyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Buy" fill="#00ff00" />
                    <Bar dataKey="Sell" fill="#ff0000" />
                </BarChart>
            </Container>

            <Container className="d-flex justify-content-center align-items-center table-container">
                <Table className="table table-bordered">
                    <thead className="table-dark">
                    <tr>
                        <th style={{ width: 150 }} scope="col">Ticker</th>
                        <th scope="col">Owner</th>
                        <th style={{ width: 75 }} scope="col">Buy/Sell</th>
                        <th scope="col"># Of Shares</th>
                        <th scope="col">Total Value</th>
                        <th scope="col">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentTransactions.map((transaction, index) => (
                        <tr key={index}
                            className={transaction.transaction_type === 'BUY' ? 'table-success' : 'table-danger'}>
                            <td>{transaction.ticker_symbol.toUpperCase()}</td>
                            <td>{transaction.owner.replace(/\b\w/g, char => char.toUpperCase()).replace(/\B\w/g, char => char.toLowerCase())}</td>
                            <td>{transaction.transaction_type}</td>
                            <td>{parseInt(transaction.shares)}</td>
                            <td>{dollar.format(transaction.total_value)}</td>
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

export default App;
