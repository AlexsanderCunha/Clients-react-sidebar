import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Center,
  FormControl,
  Input,
  FormLabel,
  HStack,
  Button,
} from "@chakra-ui/react";
import { generatePath } from "react-router";
import InputMask from "react-input-mask";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const validarCpf = require('validar-cpf');
import {
  useNavigate,
  useLocation,
  useParams
} from "react-router-dom";

function Form() {
  const [id, setId] = useState(null)
  const [name, setName] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [district, setDistrict] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [isSaving, setIsSaving] = useState(false)
  let navigate = useNavigate();
  const { stateid } = useParams();

  useEffect(() => {
    if (stateid && stateid !== 'new') {
      getClient(stateid)
    }
  }, [stateid])

  const handleSave = () => {
    setIsSaving(true)
    if (!name || name?.trim() === '' || !cpf || cpf?.trim() === '' || !email || email?.trim() === '' || !phone || phone?.trim() === '' || !address || address?.trim() === '' || !district || district?.trim() === '' || !city || city?.trim() === '' || !state || state?.trim() === '') {
      setIsSaving(false)
      return toast.error('Preencha os campos: Nome Completo, CPF, E-mail, Telefone, Endereço, Bairro, Cidade e Estado.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };
    if (!validateEmail(email)) {
      setIsSaving(false)
      return toast.error('E-mail invalido', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (!validarCpf(cpf)) {
      setIsSaving(false)
      return toast.error('CPF invalido', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (id) {
      updateClient({ id: id, name: name, email: email, phone: phone, cpf: cpf, address: address, district: district, city: city, state: state })
    } else {
      saveClient({ id: null, name: name, email: email, phone: phone, cpf: cpf, address: address, district: district, city: city, state: state })
    }
    toast.success('salvo com sucesso', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setIsSaving(false)
    return navigate("/", {
      state: true
    }
    )
  };

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  async function updateClient(dataEdit) {
    try {
      await axios.put(`http://localhost:8080/clients/${dataEdit.id}`, dataEdit, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      });
    } catch (error) {
      console.error(error);
      alert("Houve um erro ao atualizar!")
    }
  }

  async function getClient(id) {
    try {
      const response = await axios.get(`http://localhost:8080/clients/${id}`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      });
      setId(response.data?.id)
      setName(response.data?.name)
      setEmail(response.data.email)
      setCpf(response.data.cpf)
      setPhone(response.data.phone)
      setAddress(response.data.address)
      setDistrict(response.data.district)
      setCity(response.data.city)
      setState(response.data.state)
    } catch (error) {
      console.error(error);
      alert("Houve um erro ao atualizar!")
    }
  }

  async function saveClient(dataEdit) {
    try {
      await axios.post('http://localhost:8080/clients', dataEdit, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      });
    } catch (error) {
      console.error(error);
      toast.error('houve um erro ao salvar', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  async function updateClient(dataEdit) {
    try {
      await axios.put(`http://localhost:8080/clients/${dataEdit.id}`, dataEdit, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      });
    } catch (error) {
      console.error(error);
      alert("Houve um erro ao atualizar!!")
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
        maxW={940}
        top={100}
        borderRadius={5}
        p="6"
        boxShadow="0 1px 2px #ccc"
      >
        <FormControl display="flex" flexDir="column" gap="4">
          <HStack spacing="4">
            <Box w="100%">
              <FormLabel htmlFor="name">Nome Completo</FormLabel>
              <Input id="name"
                value={name}
                onChange={(e) => setName(e.target.value)} />
            </Box>
            <Box w="100%">
              <FormLabel htmlFor="cpf">CPF</FormLabel>
              <Input
                as={InputMask}
                mask="***.***.***.-**"
                maskChar={null}
                id="cpf"
                fullWidth
                type="tel"
                placeholder="000.000.000-00"
                borderRadius="5px 5px 5px"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)} />
            </Box>
          </HStack>
          <HStack spacing="4">
            <Box w="100%">
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </Box>
            <Box w="100%">
              <FormLabel htmlFor="phone">Telefone</FormLabel>
              <Input
                as={InputMask}
                mask="(**)*****-****"
                maskChar={null}
                id="phone"
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} />
            </Box>
          </HStack>
          <HStack spacing="4">
            <Box w="100%">
              <FormLabel htmlFor="address">Endereço</FormLabel>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)} />
            </Box>
            <Box w="100%">
              <FormLabel htmlFor="district">Bairro</FormLabel>
              <Input
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)} />
            </Box>
          </HStack>
          <HStack spacing="4">
            <Box w="100%">
              <FormLabel htmlFor="city">Cidade</FormLabel>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)} />
            </Box>
            <Box w="100%">
              <FormLabel htmlFor="state">Estado</FormLabel>
              <Input
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)} />
            </Box>
          </HStack>
          <HStack justify="center">
            <Button
              w={140}
              p="6"
              type="submit"
              bg="#1A202C"
              color="white"
              fontWeight="bold"
              fontSize="x1"
              onClick={() => handleSave()}
              mt="3"
              disabled={isSaving ? true : false}
              _hover={{ bg: "gray" }}
            >
              Salvar
            </Button>
          </HStack>
        </FormControl>
      </Center>
      <ToastContainer />
    </Flex>
  );
}

export default Form;