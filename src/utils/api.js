const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

class Api {
    constructor({baseUrl, headers}){
        this._headers = headers;
        this._baseUrl= baseUrl;
    }

    getProductList() {
        return fetch(`${this._baseUrl}/products`, {
            headers: this._headers
        }).then(onResponce)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Content-Type' : 'application/json',
                Authorization : `${localStorage.getItem('token')}`
            }
        }).then(onResponce)
    }

    getReview(idProduct){
        return fetch (`GET https://api.react-learning.ru/products/review/${idProduct}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzZWY4MzU5Yjk4YjAzOGY3N2IzYjQiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc1ODgyNjA2LCJleHAiOjE3MDc0MTg2MDZ9.lD6Z75buEH-2yIKOAE9G9vOle09Zo8qIdXCz4pOtQ4s'
    }, body: JSON.stringify()
}).then(response => response.json())
        .then(result => 
            console.log(result))
    }
    getProductById(idProduct) {
        return fetch(`${this._baseUrl}/products/${idProduct}`, {
            headers: this._headers
        }).then(onResponce)
    }

    setUserInfo(dataUser) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(dataUser)
        }).then(onResponce)
    }

    search(searchQuery) {
        return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {
            headers: this._headers
        }).then(onResponce)
    }

    changeLikeProduct(productId, isLike) {
        return fetch(`${this._baseUrl}/products/likes/${productId}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: this._headers
        }).then(onResponce)
    }
    signUp = (userData) => {
        const regUser = fetch("https://api.react-learning.ru/signup", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(response => response.json())
        .then(result => {
            console.log(result);
        });
    }
    Login = (userData) => {
        const userLogIn = fetch('https://api.react-learning.ru/signin', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
    }).then(response => response.json())
    .then(result => {
        console.log(result.token);
        localStorage.setItem('token', result.token)
    });
}}

const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`
    }
}


const api = new Api(config);

export default api;