import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
    Flex,
    Box,
    Center,
    FormControl,
    Input,
    FormLabel,
    HStack,
    Button,
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot
} from "@chakra-ui/react";
import {
  useNavigate
 } from "react-router-dom";
function TableClient() {
    const [clients, setClients] =  useState([])
    
let navigate = useNavigate();

    useEffect(()=>{
        Clients()
    },[])
    async function Clients() {
        try {
          const response = await axios.get('http://localhost:8080/clients', {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
          });
          setClients(response.data)
        } catch (error) {
          console.error(error);
        }
      }
    
      async function handleRemoveClient(id){
        try {
           await axios.delete(`http://localhost:8080/clients/${id}`, {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
          });
          Clients()
        } catch (error) {
          console.error(error);
          alert("Houve um erro ao deletar contato!")
        }
    }
    
    return (
        <Flex
            align="center"
            justify="center"
            marginTop={50}
        >
            <Center
                w="100%"
                top={100}
                borderRadius={5}
                p="6"
                boxShadow="0 1px 2px #ccc"
            >
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th isNumeric>ID</Th>
                                <Th>Nome Completo</Th>
                                <Th isNumeric>CPF</Th>
                                <Th>E-mail</Th>
                                <Th isNumeric>Telefone</Th>
                                <Th>Endereço</Th>
                                <Th>Bairro</Th>
                                <Th>Cidade</Th>
                                <Th>Estado</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
              {clients?.map(({ id, name, cpf, email, phone, address, district, city, state }, index) => (
                <Tr key={index} justify="center" _hover={{ bg: "gray.100" }}>
                  <Td w={50}>{id}</Td>
                  <Td w={200}>{name}</Td>
                  <Td w={100}>{cpf}</Td>
                  <Td w={100}>{email}</Td>
                  <Td w={100}>{phone}</Td>
                  <Td w={100}>{address}</Td>
                  <Td w={100}>{district}</Td>
                  <Td w={100}>{city}</Td>
                  <Td w={100}>{state}</Td>
                  <Td w={100}>
                  <EditIcon
                      fontSize={20}
                      onClick={() => navigate('/clients/',{
                        state:id
                      })
                      }
                    />
                  </Td>
                  <Td p={0}>
                  <DeleteIcon
                      fontSize={20}
                       onClick={() => handleRemoveClient(id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
                    </Table>
                </TableContainer>
            </Center>
        </Flex>
    );
}

export default TableClient;