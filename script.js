const url = 'https://randomuser.me/api/?results=';
const button = document.querySelector('button'),
      stat = document.querySelector('.status__text');
let loading = true;
const requestHelper = async(url, limit) => {
    const response = await fetch(`${url}`+ limit)
    return response.json();
}

const getUsers = async() => {
    const users = await requestHelper(url, 5);
    return users
}

const convertUserData = (data) => {
    return {
        picture: data.picture.large,
        name: `${data.name.first} ${data.name.last}`,
        cell: data.cell,
        city: data.location.city,
        country: data.location.country
    }
}

const createUsers = async() => {
    const {results} = await getUsers();
    results.forEach(item => {
        const data = convertUserData(item);
        new Person(data.picture,data.name,data.cell, data.city, data.country, '.wrapper').render()
    })
    stat.innerHTML = 'Success'
    
}

class Person {
    constructor(picture, name, cell, city, country, parentSelector,){
    this.name = name;
    this.cell = cell;
    this.city = city;
    this.country = country;
    this.picture = picture;
    this.parent = document.querySelector(parentSelector)
    }
    render() {
        const element = document.createElement('div',);
        element.classList.add('card')
        element.innerHTML = `
            <img src=${this.picture} alt='user'>
            <div>
                <h3>Name: <span>${this.name}</span></h3>
                <h3>Country: <span>${this.country}</span></h3>
                <h3>City: <span>${this.city}</span></h3>
                <h3>Cell: <span>${this.cell}</span></h3>
            </div>
        `;
        this.parent.append(element);
    }
}

button.addEventListener('click', () => {
    const cards = document.querySelectorAll('.card');
    stat.innerHTML = "Loading..."
    cards.forEach(item => {
        item.remove()
    })
    createUsers();
})

createUsers();


