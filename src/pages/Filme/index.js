import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './filme-info.css'
import api from '../../Services/api'
import { toast } from 'react-toastify'

function Filme() {

    const { id } = useParams()
    // useNavigate é um hook também do React
    // neste caso, usamos ele para redirecionar de página quando o usuário digitar a url com um id que não existe por exemplo
    const navigate = useNavigate()

    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "6a2559a34c8a0416a101883094efc655",
                }
            })
            .then((response) => {
                setFilme(response.data)
                setLoading(false)
            })
            .catch(() => {
                console.log("Filme não encontrado!")
                // o primeiro parâmetro é para qual página a gente quer mandar
                // o segundo colocamos replace: true, para redirecionar para tela de home, se não, ele volta apenas uma página
                navigate("/", { replace: true})
                return
            })
        }

        loadFilme()

        return () => {
            console.log("COMPONENTE FOI DESMONTADO")
        }
        
    // passamos o navigate e o id como DEPÊNDENCIA do useEffect, pois quando utilizamos o useEffect e usamos depêndencias como o navigate (useNavigate) e o id (useParams), que estão externas, ou seja, que estão por fora e usamos dentro do useEffect, precisamos passar elas como dependências 
    },[navigate,id])

    function salvarFilme() {
        // através da variável minhaLista, pegamos, se já existir, a lista no localStorage, para adicionar mais filmes
        const minhaLista = localStorage.getItem("@primeflix")
        // se tiver alguma coisa salva na minhaLista, ele vai colocar dentro da variável filmesSalvos
        // se não, ele vai iniciar como uma array vazia
        let filmesSalvos = JSON.parse(minhaLista) || []

        // aqui verificamos através do método some() se algum filme da nossa lista filmesSalvos, possui um id igual a algum filme que temos na nossa página
        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if(hasFilme) {
            toast.warn("Esse filme já está na sua lista!")
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success("Filme Salvo com Sucesso")
    }

    if(loading) {
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme