import { useEffect, useState } from 'react'
import api from '../../Services/api'
import { Link } from 'react-router-dom'
import './home.css'

// URL DA API: /movie/now_playing?api_key=6a2559a34c8a0416a101883094efc655

function Home() {

    const [filmes, setFilmes] = useState([])
    // aplicando o loading 
    const [loading, setLoading] = useState(true)

    // usamos o useEffect para que toda vez que o usuário abrir a página ele vai fazer a requisição da API e mostrar na tela
    useEffect(() => {

        async function loadFilmes() {
            // ele vai acessar nossa baseURL "api" do services e acrescenter o "/movie/now_playing"
            const response = await api.get("/movie/now_playing", {
                // usamos o params para passar os parâmetros que nossa url vai ter, ela vai ter uma api_key, a language é pt-BR e a page: 1, porquê ela vai ser nossa primeira página
                params: {
                    api_key: "6a2559a34c8a0416a101883094efc655",
                    page: 1,
                }
            })

            // console.log(response.data.results.slice(0,10))

            setFilmes(response.data.results.slice(0,10))
            // colocamos como false, pois como fizemos a verificação if(loading), ele só vai renderizar a state loading enquanto ainda não carregou a API, depois que ele carrega passamos o false para ele renderizar os filmes
            setLoading(false)
        }

        loadFilmes()
    },[])


    if(loading) {
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return(
                        // toda vez que usamos o map, precisamos passar uma key para o primeiro item para o React entender
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
        
    )
}

export default Home