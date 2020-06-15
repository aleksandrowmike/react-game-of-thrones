export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

   getResources =  async (url) => {
        const response = await fetch(`${this._apiBase}${url}`);
        if (!response.ok) {
            throw new Error(`Не удалось получить данные ${this._apiBase}${url}, статус ${response.status}`);
        }
        return await response.json();
    }
    getAllCharacters = async () => {
        const result = await this.getResources('/characters?page=5&pageSize=10');
        return result.map(this._transformCharacter);
    }
    getCharacter = async (id) => {
        const result = await this.getResources(`/characters/${id}`);
        return this._transformCharacter(result);
    }

    getAllBooks = async () => {
        const result = await this.getResources('/books');
        return result.map(this._transformBook);
    }
    getBook = async (id) => {
        const result = await this.getResources(`/books/${id}`);
        return this._transformBook(result);
    }
    getAllHouses = async () => {
        const result = await this.getResources('/houses');
        return result.map(this._transformHouse);
    }
    getHouse = async (id) => {
        const result = await this.getResources(`/houses/${id}`);
        return this._transformHouse(result);
    }
    _transformCharacter(char) {
        return {
            id: char.url.match(/\d{1,3}/)[0],
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _transformHouse(house){
        return {
            id: house.url.match(/\d{1,3}/)[0],
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook(book) {
        return {
            id: book.url.match(/\d{1,3}/)[0],
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released,
        }
    }
}
