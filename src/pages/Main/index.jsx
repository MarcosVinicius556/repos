import React from 'react';
import { FaGithub, FaPlus } from 'react-icons/fa';
import { Container, Form, SubmitButton } from './styles';

export default function Main(){
  return(
    <Container>

      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>
      {/*Normalmente quando se tem mais de 2 
        encadeamentos de componentes, um novo é criado....  */}
      <Form onSubmit={()=>{}}>
        <input type="text" placeholder='Adicionar Repositórios' />

        <SubmitButton>
          <FaPlus color='#fff' size={14} />
        </SubmitButton>
      </Form>

    </Container>
  )
}