import React, { useState } from 'react';
import axios from 'axios'; // Importando o Axios

import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Container, LoginContainer, Column, Spacing, Title } from "./styles";
import { defaultValues, IFormLogin } from "./types";


const schema = yup
  .object({
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "No minimo 6 caracteres")
      .required("Campo obrigatório"),
  })
  .required();


const Login = () => {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormLogin>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues,
    reValidateMode: "onChange",
  });

  
  const onSubmit = () => {
    // Enviar os dados para o backend
    axios.post('http://localhost:5070/administrador/login',  { email, senha })
    .then(response => {
      // Tratar a resposta do servidor
      console.log(response);
    })
    .catch(error => {
      // Tratar erros
      console.error(error);
    });
    };

  
  return (
    <Container>
      <LoginContainer>
        <Column>
          <Title>Login</Title>
          <Spacing />
          <Input
            name="email"
            placeholder="Email"
            control={control}
            errorMessage={errors?.email?.message}
          />
          <Spacing />
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            control={control}
            errorMessage={errors?.password?.message}
          />
          <Spacing />
          <Button title="Entrar" onClick={handleSubmit(onSubmit)} />
        </Column>
      </LoginContainer>
    </Container>
  );
};

export default Login;
