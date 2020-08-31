import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Http from "../../js/http/http";
import {API_URL, LOCALHOST} from "../../js/constants/url_constants";
import Table from "react-bootstrap/Table";
import NumberFormat from 'react-number-format';

export default class StocksCalculator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            response: []
        };

        this.monthlyInvestment = React.createRef();
        this.startDate = React.createRef();
        this.endDate = React.createRef();
        this.stock = React.createRef();
        this.initialBalance = React.createRef();
    }


    render() {

        const handleSubmit = () => {
            let monthlyInvestment = this.monthlyInvestment.current.value;
            let stock = this.stock.current.value;
            let startDate = this.startDate.current.value;
            let endDate = this.endDate.current.value;
            let initialBalance = this.initialBalance.current.value;
            Http.getData(`http://${API_URL}:8080/api/v1/investment/calculate?stockType=${stock}&startDate=${startDate}&endDate=${endDate}&monthlyInvestment=${monthlyInvestment}&initialInvestment=${initialBalance}`)
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        response: data
                    });
                    console.log(data); // JSON data parsed by `data.json()` call
                    console.log(this.state.response); // JSON data parsed by `data.json()` call

                });

        }

        return (
            <>
                <Container>
                    <Row>

                    </Row>
                    <Row className="p-3 mt-3">
                        <Col>
                            <Card style={{width: '18rem'}}>
                                <Card.Body>
                                    <Card.Title>Stock Calculator</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">How To Use</Card.Subtitle>
                                    <Card.Text>
                                        This stock calculator will use a stocks previous performance to show you how
                                        much you would have gained / lost if you had invested in that stock in the past.
                                        Fill in the Inputs below and a table of valuable data will be presented to you.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Form>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">Monthly
                                            Investment</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        ref={this.monthlyInvestment}
                                        defaultValue="500"
                                        aria-label="Monthly Investment"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">Start Date</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        ref={this.startDate}
                                        defaultValue="2018-01-01"
                                        aria-label="Start Date"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">End Date</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        ref={this.endDate}
                                        defaultValue="2020-01-01"
                                        aria-label="End Date"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">Stock</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        ref={this.stock}
                                        defaultValue="AAPL"
                                        aria-label="Stock"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">Initial Balance</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        ref={this.initialBalance}
                                        defaultValue="0"
                                        aria-label="Initial Balance"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="outline-success" onClick={handleSubmit}>Calculate Returns</Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col>

                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Stock Increase</th>
                                    <th>Total Invested</th>
                                    <th>Balance</th>
                                    <th>Profit</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.response.map(( data, index ) => {
                                    return (
                                        <tr key={index}>
                                            <td>{data.date}</td>
                                            <td>{data.stockIncrease}%</td>
                                            <td><NumberFormat value={data.totalInvested} displayType={'text'} thousandSeparator={true} prefix={'£'} /></td>
                                            <td><NumberFormat value={data.balance} displayType={'text'} thousandSeparator={true} prefix={'£'} /></td>
                                            <td><NumberFormat value={data.profit} displayType={'text'} thousandSeparator={true} prefix={'£'} /></td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}