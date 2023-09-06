import axios from 'axios'

// BASE DA API: https://api.themoviedb.org/3/
// URL DA API: /movie/now_playing?api_key=6a2559a34c8a0416a101883094efc655

// usando o "axios" - biblioteca do React para consumir API
// fechar a aplicação e npm install axios

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api

