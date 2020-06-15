import React, {Component} from 'react';
import ItemList from "../../itemList";
import ItemDetails, {Field} from "../../itemDetails";
import gotService from "../../../services/gotService";

import ErrorMessage from "../../errorMessage";
import RowBlock from "../../rowBlock";


export default class CharacterPage extends Component{
    gotService = new gotService();
    state = {
        selectedItem: 130,
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
                getData={this.gotService.getAllCharacters}
                renderItem={({name, gender}) => `${name} (${gender})`}
            />
        );
        const charDetails = (
            <ItemDetails
                itemId={selectedItem}
                getData={this.gotService.getCharacter}
            >
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        );
        return (
            <RowBlock left={itemList} right={charDetails} />
        );
    }
}
