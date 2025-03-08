import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./componentes/Form.js"
import Grid from "./componentes/Grid.js"
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`

  width: 100%;
  max-width: 1100px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

`;

const Title = styled.h2``;

//{toast.POSITION.BOTTOM_LEFT}

function App() {

  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {

    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.razao_social > b.razao_social ? 1 : -1)));

    } catch (error) {
      toast.error(error);
    }

  }

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (<>

    <Container>
      <Title>TESTES API</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
    </Container>

    <ToastContainer autoClose={3000} position="bottom-left" />
    <GlobalStyle />

  </>)

}

export default App;
