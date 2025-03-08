import axios from "axios";
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
//import { useEffect } from "react";


const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;

`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;

`;

const Label = styled.label``;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;

`;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;

`;


const Form = ({ getUsers, onEdit, setOnEdit }) => {

    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const user = ref.current;

            user.razao_social.value = onEdit.razao_social;
            user.cpf_cnpj.value = onEdit.cpf_cnpj;
            user.tipo_pessoa.value = onEdit.tipo_pessoa;
            user.endereco.value = onEdit.endereco;
            user.email.value = onEdit.email;
            user.fone.value = onEdit.fone;
            user.data_nascimento.value = onEdit.data_nascimento;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (
            !user.razao_social.value ||
            !user.cpf_cnpj.value ||
            !user.tipo_pessoa.value ||
            !user.endereco.value ||
            !user.email.value ||
            !user.fone.value ||
            !user.data_nascimento.value
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {
            await axios
                .put("http://localhost:8800/" + onEdit.id, {
                    razao_social: user.razao_social.value,
                    endereco: user.endereco.value,
                    tipo_pessoa: user.tipo_pessoa.value,
                    cpf_cnpj: user.cpf_cnpj.value,
                    email: user.email.value,
                    fone: user.fone.value,
                    data_nascimento: user.data_nascimento.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => {
                    console.error("Erro na requisição: PUT", data);
                    toast.error(data)
                });

        } else {
            await axios
                .post("http://localhost:8800", {
                    razao_social: user.razao_social.value,
                    endereco: user.endereco.value,
                    tipo_pessoa: user.tipo_pessoa.value,
                    cpf_cnpj: user.cpf_cnpj.value,
                    email: user.email.value,
                    fone: user.fone.value,
                    data_nascimento: user.data_nascimento.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => {
                    console.error("Erro na requisição: POST", data);
                    toast.error(data)
                });
        }

        user.razao_social.value = "";
        user.tipo_pessoa.value = "";
        user.cpf_cnpj.value = "";
        user.endereco.value = "";
        user.email.value = "";
        user.fone.value = "";
        user.data_nascimento.value = "";

        setOnEdit(null);
        getUsers();
    };

    return (

        <></>


        // <FormContainer ref={ref} onSubmit={handleSubmit}>

        //     <InputArea>
        //         <Label>Nome</Label>
        //         <Input name="razao_social" />
        //     </InputArea>

        //     <InputArea>
        //         <Label>E-mail</Label>
        //         <Input name="email" type="email" />
        //     </InputArea>

        //     <InputArea>
        //         <Label>Telefone</Label>
        //         <Input name="fone" />
        //     </InputArea>

        //     <InputArea>
        //         <Label>Data de Nascimento</Label>
        //         <Input name="data_nascimento" type="date" />
        //     </InputArea>

        //     <Button type="submit" >SALVAR</Button>

        // </FormContainer>

    );

};

export default Form;