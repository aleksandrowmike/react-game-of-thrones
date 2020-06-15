import React, {Component} from 'react';
import styled from "styled-components";
import { ListGroup, ListGroupItem } from "reactstrap";
import {ItemDetailsGenderTerm, ItemDetailsGender} from "../itemDetails/itemDetails";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

import './randomChar.css';

import GotService from "../../services/gotService";

const RandomCharBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`;
const RandomCharTitle = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`;

export default class RandomChar extends Component {

    constructor(props) {
        super(props);
        this.updateChar();
    }

    gotService = new GotService();

    state = {
        char: {},
        loading: true,
        error: false
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
        })
    }

    updateChar() {
        const id = Math.floor(Math.random()*140+25); // 25-140
        // const id = 121241241;
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });
    }

    render() {
        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner />: null;
        const content = !(loading || error) ? <View char={char} /> : null;

        return (
            <RandomCharBlock className="rounded">
                {errorMessage}
                {spinner}
                {content}
            </RandomCharBlock>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <RandomCharTitle>Random Character: {name}</RandomCharTitle>
            <ListGroup flush>
                <ListGroupItem className="d-flex justify-content-between">
                    <ItemDetailsGenderTerm>Gender </ItemDetailsGenderTerm>
                    <ItemDetailsGender>{gender ? gender : 'Пусто :('}</ItemDetailsGender>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <ItemDetailsGenderTerm>Born </ItemDetailsGenderTerm>
                    <ItemDetailsGender>{born ? born : 'Пусто :('}</ItemDetailsGender>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <ItemDetailsGenderTerm>Died </ItemDetailsGenderTerm>
                    <ItemDetailsGender>{died ? died : 'Пусто :('}</ItemDetailsGender>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <ItemDetailsGenderTerm>Culture </ItemDetailsGenderTerm>
                    <ItemDetailsGender>{culture ? culture : 'Пусто :('}</ItemDetailsGender>
                </ListGroupItem>
            </ListGroup>
        </>
    );
}
