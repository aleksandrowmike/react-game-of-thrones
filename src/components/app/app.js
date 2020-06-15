import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharacterPage, HousePage, BookPage, BooksItem} from '../pages';
import gotService from "../../services/gotService";
import {BrowserRouter as Router, Route } from "react-router-dom";
import styled from 'styled-components';
import img from './got.jpeg';

import "./app.css";

const AppBlock = styled.div`
    overflow-x: hidden;
    background: url(${props => props.img}) center center no-repeat;
    background-size: cover;
    font-size: 16px;
    height: 100vh;
`;

export default class App extends Component {
    gotService = new gotService();

    state = {
        viewRandomChar: true,
        error: false
    }

    onToggleRandomChar = () => {
        this.setState((state) => {
            return {
                viewRandomChar: !state.viewRandomChar
            }
        });
    }

    render() {
        const {viewRandomChar} = this.state;
        const randomChar = viewRandomChar ? <RandomChar /> : null;
        console.log(img);
        return (
            <Router>
                <AppBlock img={img}>
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 6, offset: 0}}>
                                {randomChar}
                                <Button
                                    className="toggle-random-char"
                                    color="primary"
                                    onClick={this.onToggleRandomChar}
                                > Скрыть Random Character </Button>
                            </Col>
                        </Row>
                        <Route path="/characters" component={CharacterPage}/>
                        <Route path="/houses" component={HousePage}/>
                        <Route path="/books" exact component={BookPage}/>
                        <Route path="/books/:id" render={
                            ({match}) => {
                                const {id} = match.params;
                                return <BooksItem bookId={id} />;
                            }
                        }/>
                    </Container>
                </AppBlock>
            </Router>
        );
    }
}
