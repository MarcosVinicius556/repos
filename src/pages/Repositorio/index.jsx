import { useParams} from "react-router-dom";
import { useState, useEffect } from 'react';
import { Container } from "./styles";
import api from '../../services/api';

function Repositorio() {

    const{ repositorio } = useParams()
    const[ repo, setRepo ] = useState({});
    const[ issues, setIssues ] = useState([]);
    const[ loading, setLoading ] = useState(true);


    useEffect(() => {

        async function load() {
            /**
             * Executa um array de promisses ao mesmo tempo
             * Bom de utlizar quando se tem casos em que 
             * é necessário mais de 1 requisição para buscar todos os dados
             * da página, o retorno é um array,e pode ser utilizado com desconstrução 
             * por exemplo
             */
            const [ repositorioData, issuesData ] = await Promise.all([
                api.get(`/repos/${decodeURIComponent(repositorio)}`),
                api.get(`/repos/${decodeURIComponent(repositorio)}/issues`, {
                    //axios permite passar parâmetros desta forma
                    params: {
                        state: 'open',
                        per_page: 5
                    }
                }),
            ]);

            setRepo(repositorioData.data);
            setIssues(issuesData.data);
            setLoading(false);

        }

        load();

    }, [repositorio]);

    return(
        <Container>
            
        </Container>
    )
}

export default Repositorio;