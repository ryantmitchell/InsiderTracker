import Navbar from "react-bootstrap/Navbar";
import './App.css'
import Container from "react-bootstrap/Container";

function App() {
  return (
    <>
        <Navbar fixed="top" bg="dark" data-bs-theme="dark">
            <Navbar.Brand>
                Insider Trading Tracker
            </Navbar.Brand>
        </Navbar>

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
