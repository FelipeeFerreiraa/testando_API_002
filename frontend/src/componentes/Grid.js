import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";



const Table = styled.table`
justify-content: center;
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    min-width: 1100px;
    margin: 20px auto;
    word-break: break-all;

`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media (max-width: 500px) {
       // ${(props) => props.onlyWeb && "display: none"};

       &.only-web {
            display: none;
        }
    }

`;

export const Td = styled.td`
    padding-top: 15px;
    //text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    text-align: center;
    width: ${(props) => (props.width ? props.width : "auto")};

    @media (max-width: 500px) {
       // ${(props) => props.onlyWeb && "display: none"};

       &.only-web {
            display: none;
        }
    }

`;


const Grid = ({ users, setUsers, setOnEdit }) => {

    const handleDelete = async (id) => {
        await axios
            .delete("http://localhost:8800/" + id)
            .then(({ data }) => {
                const newArray = users.filter((user) => user.id !== id);

                setUsers(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null);

    };

    const handleEdit = (item) => {
        setOnEdit(item);

    };

    return (
        <Table>

            <Thead>

                <Tr>

                    <Th>Razão Social</Th>
                    <Th>CPF / CNPJ</Th>
                    <Th>Tipo</Th>
                    <Th>Endereço</Th>
                    <Th>E-mail</Th>
                    {/* <Th className="only-web">Fone</Th> */}
                    <Th></Th>
                    <Th></Th>

                </Tr>

            </Thead>

            <Tbody>

                {users.map((item, i) => (
                    <Tr key={i}>

                        <Td width="17%">{item.razao_social}</Td>
                        <Td width="17%">{item.cpf_cnpj}</Td>
                        <Td width="12%">{item.tipo_pessoa}</Td>
                        <Td width="27%">{item.endereco}</Td>
                        <Td width="30%">{item.email}</Td>
                        {/* <Td width="20%" className="only-web" >{item.fone}</Td> */}
                        <Td width="12%">.</Td>
                        <Td className="text-center" width="7%"  >
                            <FaEdit onClick={() => handleEdit(item)} />
                        </Td>

                        <Td className="text-center" width="7%"  >
                            <FaTrash onClick={() => handleDelete(item.id)} />
                        </Td>

                    </Tr>
                ))}

            </Tbody>

        </Table>

    );

};

export default Grid;