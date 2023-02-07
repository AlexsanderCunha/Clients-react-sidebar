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
  Tfoot,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from "@chakra-ui/react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function TableClient() {
  const [clients, setClients,] = useState([])
  const [id, setId] = useState(null)
  let navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  useEffect(() => {
    Clients()
  }, [clients])

  const openalert = (id) => {
    setId(id)
    setTimeout(()=>{
      onOpen()
    },300)
  }

  const closealert = (isdelete) => {
    if(isdelete){
      handleRemoveClient(id)
      return onClose()
    }
    
    setId(null)
    return onClose()
  }

  async function Clients() {
    try {
      const setClientsResponse = await axios.get('http://localhost:8080/clients', {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      });
      setClients(setClientsResponse.data)
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRemoveClient(id) {
    try {
      await axios.delete(`http://localhost:8080/clients/${id}`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      });
      setId(null)
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

        <TableContainer >
          <div style={{ width: "100%", justifyContent: "flex-end", alignItems: "flex-end", display: 'flex' }}>
            <Button
              w={140}
              type="submit"
              bg="#1A202C"
              color="white"
              fontWeight="bold"
              fontSize="x1"
              onClick={() => navigate('/clients/new')}
              mb="3"
              _hover={{ bg: "gray" }}>adicionar</Button>
          </div>

          <Table variant='striped' colorScheme="gray.200">
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
                <Th></Th>
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
                      onClick={() => navigate('/clients/' + id)
                      }
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => openalert(id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Deletar Cliente
            </AlertDialogHeader>

            <AlertDialogBody>
            Tem certeza? Você não pode desfazer esta ação depois.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={()=> closealert(false)}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={() => closealert(true)} ml={3}>
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}

export default TableClient;