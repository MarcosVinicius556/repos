import styled, {keyframes, css} from 'styled-components';

export const Container = styled.div`
    max-width: 700px;
    background: #FFF;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0,0,0, 0.2);
    padding: 30px;
    margin: 80px auto;

    h1 {
        font-size: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;

        svg {
            margin-right: 10px;
        }
    }
`;

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: 1px solid ${props => (props.error ? '#FF0000' : '#ddd' )};
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 17px;
    }
`;

/**
 * Criando animação do botão
 */

const spin = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;

export const SubmitButton = styled.button.attrs((props) => ({
    type: 'submit',
    disabled: props.loading //Desabilitando o botão
}))`
    background: #0d2636;
    border: 0;
    border-radius: 4px;
    margin-left: 10px;
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;

    /* Aplicando estilo quando for disabled */
    &[disabled] {
        cursor: not-allowed;
        opacity: 0.5;
    }

    //Quando estiver carregando, irá utilizar o código css abaixo
    ${props => props.loading && 
        //Criando um css nativo dentro do styled
        css`
        svg{
            animation: ${ spin } 2s linear infinite;
        }
        `
    }

    }
    
`;

export const List = styled.ul`
    list-style: none;
    margin-top: 20px;

    li {
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        & + li{ //Ignora o primeiro, e para os demais aplica o que estiver definido
            border-top: 1px solid #eee;
        }

        a {
            color: #0D2636;
            text-decoration: none;
        }

    }
`;

export const DeleteButton = styled.button.attrs({
    type: 'button'
})`

    background: transparent;
    color: #0D2636;
    border: 0;
    padding: 8px 7px;
    outline: 0;
    border-radius: 4px;
`;