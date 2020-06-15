import React, {Component} from 'react';
import styled from "styled-components";
import { ListGroup, ListGroupItem } from "reactstrap";

import './itemDetails.css';


const ItemDetailsBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`;

const ItemDetailsTitle = styled.h4`
     margin-bottom: 20px;
     text-align: center;
`;

export const ItemDetailsGenderTerm = styled.span`
       font-weight: bold;
`;
export const ItemDetailsGender = styled.span``;

export const Field = ({item, field, label}) => {
    return (
        <ListGroupItem className="d-flex justify-content-between">
            <ItemDetailsGenderTerm>{label}</ItemDetailsGenderTerm>
            <ItemDetailsGender>{item[field] ? item[field] : 'пусто :(' }</ItemDetailsGender>
        </ListGroupItem>
    );
}

export default class ItemDetails extends Component {
    state = {
        item: null
    }
    componentDidMount() {
        this.updateItem();
    }
    componentDidUpdate(prevProps) {
        if(this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }
    updateItem() {
        const {itemId, getData} = this.props;
        if(!itemId) {
            return;
        }
        getData(itemId)
            .then(item => {
                this.setState({
                    item: item
                });
            });
    }
    render() {
        if(!this.state.item) {
            return <span className="select-error">Пожалуйста выберете персонажа</span>;
        }
        const {item} = this.state;
        const {name} = item;
        return (
            <ItemDetailsBlock className="rounded">
                <ItemDetailsTitle>{name}</ItemDetailsTitle>
                <ListGroup flush>
                    {
                        React.Children.map(this.props.children,  (child) => {
                            return React.cloneElement(child, {item});
                        })
                    }
                </ListGroup>
            </ItemDetailsBlock>
        );
    }
}
