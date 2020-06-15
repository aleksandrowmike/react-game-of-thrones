import React, {Component} from 'react';
import ItemList from "../../itemList";
import ItemDetails, {Field} from "../../itemDetails";
import gotService from "../../../services/gotService";

import ErrorMessage from "../../errorMessage";
import RowBlock from "../../rowBlock";


export default class HousePage extends Component{
    gotService = new gotService();
    state = {
        selectedItem: 1,
        error: false
    }
    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        });
    }
    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        });
    }
    render() {
        const {selectedItem} = this.state;
        if(this.state.error) {
            return <ErrorMessage />
        }
        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={({name, region}) => `${name} (${region})`}
            />
        );
        const houseDetails = (
            <ItemDetails
                itemId={selectedItem}
                getData={this.gotService.getHouse}
            >
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='overlord' label='Overlord'/>
                <Field field='ancestralWeapons' label='Ancestral Weapons'/>
            </ItemDetails>
        );
        return (
            <RowBlock left={itemList} right={houseDetails} />
        );
    }
}
