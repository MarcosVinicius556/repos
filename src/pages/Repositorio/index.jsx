import { useParams } from "react-router-dom";

function Repositorio() {

    const{ repositorio } = useParams()

    return(
        <div>
            <h1 style={{ color: '#fff' }}>
                {
                    decodeURIComponent(repositorio)
                }
            </h1>
        </div>
    )
}

export default Repositorio;