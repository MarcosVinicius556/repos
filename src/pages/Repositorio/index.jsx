import { useParams} from "react-router-dom";
import { useState, useEffect } from 'react';
import { Container, Owner, Loading, BackButton, IssuesList } from "./styles";
import { FaArrowLeft } from 'react-icons/fa';
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

    if(loading){
        return(
            <Loading>
                <h1>Carregando</h1>
            </Loading>
        );    
    }
    
    return(
        <Container>
            <BackButton to="/">
                <FaArrowLeft color='#000' size={30}/>
            </BackButton>
            <Owner>
                <img src={repo.owner.avatar_url} alt={repo.owner.login} />
                <h1>{ repo.name }</h1>
                <p>{ repo.description}</p>
            </Owner>
            <IssuesList>
                {
                    issues.map((issue) => (
                        <li key={String(issue.id)}> {/**Convertendo o id da issue para string */}
                            <img src={issue.user.avatar_url} alt={issue.user.login} />

                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}> {label.name} </span>
                                    ))}
                                </strong>

                                <p>{issue.user.login}</p>

                            </div>

                        </li>
                    ))
                }
            </IssuesList>
        </Container>
    )
}

export default Repositorio;