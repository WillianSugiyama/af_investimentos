import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
  Text,
  Select,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import CurrencyInput from "react-currency-masked-input";
import InputMask from "react-input-mask";

import api from "../../services/api";

function EditModal(props) {
  const toast = useToast();

  const [test, setTest] = useState({
    category: "",
    broker: "",
    quantity: "",
    negociationDate: "",
    order: "",
    price: "",
    orderType: "",
    endDate: "",
    total: "",
    id: "",
  });

  const handleCategoryChange = (e) =>
    setTest({ ...test, category: e.target.value });
  const handleBrokerChange = (e) =>
    setTest({ ...test, broker: e.target.value });
  const handleQuantityChange = (e) =>
    setTest({ ...test, quantity: e.target.value });

  const handleOrderChange = (e) => setTest({ ...test, order: e.target.value });
  const handleNegociationDateChange = (e) =>
    setTest({ ...test, negociationDate: e.target.value });
  const handlePriceChange = (e) => setTest({ ...test, price: e.target.value });

  const handleOrderTypeChange = (e) =>
    setTest({ ...test, orderType: e.target.value });
  const handleEndDateChange = (e) =>
    setTest({ ...test, endDate: e.target.value });
  const handleTotalChange = (e) => setTest({ ...test, total: e.target.value });

  const handleInput = async () => {
    if (props.isEdit) {
      handleEdit();
    }

    if (props.isCreate) {
      handleSubmit();
    }

    if (props.isDelete) {
      handleDelete();
    }
  };

  const handleSubmit = async () => {
    const data = {
      ...test,
    };

    const res = await api.post("api/v1/transaction", data);

    if (res.status === 201) {
      toast({
        title: "Cadastro realizado",
        description: "Cadastro realizado com sucesso",
        status: "success",
        duration: 1500,
        isClosable: true,
      });

      setTest({
        category: "",
        broker: "",
        quantity: "",
        negociationDate: "",
        order: "",
        price: "",
        orderType: "",
        endDate: "",
        total: "",
        id: "",
      });

      props.onClose();
      window.location.reload();
      return;
    }

    if (res.status === 400) {
      toast({
        title: "Erro ao cadastrar",
        description: "Usuário Já cadastrado",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Erro ao cadastrar",
      description: "Erro interno, tente novamente mais tarde",
      status: "error",
      duration: 1500,
      isClosable: true,
    });
  };

  const handleEdit = async () => {
    const data = { ...test };

    const res = await api.put(`api/v1/transaction/${test.id}`, data);

    if (res.status === 200) {
      toast({
        title: "Cadastro realizado",
        description: "Cadastro realizado com sucesso",
        status: "success",
        duration: 1500,
        isClosable: true,
      });

      setTest({
        category: "",
        broker: "",
        quantity: "",
        negociationDate: "",
        order: "",
        price: "",
        orderType: "",
        endDate: "",
        total: "",
        id: "",
      });

      props.onClose();
      window.location.reload();
      return;
    }

    if (res.status === 400) {
      toast({
        title: "Erro ao cadastrar",
        description: "Usuário Já cadastrado",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Erro ao cadastrar",
      description: "Erro interno, tente novamente mais tarde",
      status: "error",
      duration: 1500,
      isClosable: true,
    });
  };

  const handleDelete = async () => {
    const res = await api.delete(`api/v1/transaction/${test.id}`);

    if (res.status === 200) {
      toast({
        title: "Deleção realizada",
        description: "Deleção realizada com sucesso",
        status: "success",
        duration: 1500,
        isClosable: true,
      });

      setTest({
        category: "",
        broker: "",
        quantity: "",
        negociationDate: "",
        order: "",
        price: "",
        orderType: "",
        endDate: "",
        total: "",
        id: "",
      });

      props.onClose();
      window.location.reload();
      return;
    }

    toast({
      title: "Erro ao Deletar",
      description: "Erro interno, tente novamente mais tarde",
      status: "error",
      duration: 1500,
      isClosable: true,
    });
  };

  useEffect(() => {
    console.log("PROPS", props);
    if (props.isEdit || props.isDelete) {
      setTest(props.order);
    }
  }, [props]);

  if (props.isDelete) {
    return (
      <>
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
          <ModalOverlay />
          <ModalContent width="850px">
            <ModalHeader>{props.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex direction="column">
                <Text> Deseja Realmente deletar a ordem? {test.id} </Text>
                <Button
                  backgroundColor="tomato"
                  color="#FFF"
                  marginTop="35px"
                  onClick={handleDelete}
                >
                  Deletar
                </Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent width="850px">
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column">
              <FormControl>
                <FormLabel>Categoria</FormLabel>
                <Select
                  placeholder="Ordem"
                  onChange={(e) => handleCategoryChange(e)}
                >
                  <option value="fiis">FIIs</option>
                  <option value="action">Ações</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Broker</FormLabel>
                <Input
                  placeholder="Broker"
                  type="text"
                  value={test.broker}
                  onChange={handleBrokerChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Quantidade</FormLabel>
                <Input
                  placeholder="Quantidade"
                  type="text"
                  value={test.quantity}
                  onChange={handleQuantityChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Ativo</FormLabel>
                <Input
                  placeholder="Ativo"
                  type="text"
                  value={test.order}
                  onChange={handleOrderChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Negociação</FormLabel>
                <InputMask
                  value={test.negociationDate}
                  onChange={handleNegociationDateChange}
                  mask="99/99/9999"
                >
                  {(inputProps) => (
                    <Input
                      {...inputProps}
                      placeholder="Negociação"
                      type="text"
                    />
                  )}
                </InputMask>
              </FormControl>
              <FormControl>
                <FormLabel>Preço</FormLabel>
                <Input
                  placeholder="Preço"
                  type="text"
                  value={test.price}
                  onChange={handlePriceChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Ordem</FormLabel>
                <Select
                  placeholder="Ordem"
                  onChange={(e) => handleOrderTypeChange(e)}
                >
                  <option value="buy">Comprar</option>
                  <option value="sell">Vender</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Vencimento</FormLabel>
                <InputMask
                  value={test.endDate}
                  onChange={handleEndDateChange}
                  mask="99/99/9999"
                >
                  {(inputProps) => (
                    <Input
                      {...inputProps}
                      placeholder="Vencimento"
                      type="text"
                    />
                  )}
                </InputMask>
              </FormControl>
              <FormControl>
                <FormLabel>Total</FormLabel>
                <Input
                  placeholder="Total"
                  type="text"
                  value={test.total}
                  onChange={handleTotalChange}
                />
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor="#000"
              color={"#fff"}
              fontSize={"16px"}
              _hover={{ backgroundColor: "#0A0A0A" }}
              onClick={handleInput}
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditModal;
