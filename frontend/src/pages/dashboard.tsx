import { useAuth } from "../context/auth-context";
import useSWR from "swr";
import api from "../services/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import fileDownload from "js-file-download";

import { Container } from "../components/Container";
import {
  Button,
  Flex,
  Icon,
  Text,
  Avatar,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { RiDashboardFill } from "react-icons/ri";
import { IoAddCircleSharp } from "react-icons/io5";
import { AiOutlineUpload, AiFillDelete } from "react-icons/ai";
import { HiTicket } from "react-icons/hi";
import { VscGraph, VscGraphLine } from "react-icons/vsc";
import { FaFileDownload, FaWallet } from "react-icons/fa";
import { BiDownload } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import EditModal from "../components/Modals/Modal";
import { Spinner } from "@chakra-ui/react";

import CurrencyFormat from "react-currency-format";

function Dashboard() {
  const { user, loading, isAuthenticated, logout }: any = useAuth();
  const [investiment, setInvestiment] = useState({
    buys: 0,
    sells: 0,
    totals: 0,
  });
  const [orders, setOrders] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState();
  const [userName, setUserName] = useState();
  const [loadingPage, setLoading] = useState(true);
  const [order, setOrder] = useState();

  const toast = useToast();

  const route = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      route.push("/");
    } else {
      setTimeout(() => {
        setLoading(false);
        api
          .get("/api/v1/transaction/total")
          .then((res) => {
            setInvestiment({
              buys: res.data.buys,
              sells: res.data.sells,
              totals: res.data.totals,
            });
          })
          .catch((err) => {
            console.log(err);
          });

        api.get("api/v1/transaction/").then((res) => {
          setOrders(res.data);
          console.log(res.data);
        });

        if (user) {
          setUserName(user.fullName);
        }
      }, 100);
    }
  }, [isAuthenticated]);

  const handleDownload = async () => {
    const res = await api.get("api/v1/transaction/composition", {
      responseType: "blob",
    });

    if (res.status === 200) {
      fileDownload(res.data, "report.csv");
      return;
    }

    toast({
      title: "Erro ao realizar o download do arquivo",
      description: "Erro ao realizar o download do arquivo",
      status: "error",
      duration: 1500,
      isClosable: true,
    });
  };

  const handleModal = (title, is, order) => {
    setTitle(title);

    if (is === "isCreate") {
      setIsCreate(true);
    }

    if (is === "isEdit") {
      setIsEdit(true);
      setOrder(order);
    }

    if (is === "isDelete") {
      setIsDelete(true);
      setOrder(order);
    }

    onOpen();
  };

  if (loadingPage) {
    return (
      <>
        <Container height="100vh">
          <Flex
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner size="xl" color="#FFF" />
          </Flex>
        </Container>
      </>
    );
  }

  return (
    <>
      <EditModal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        isCreate={isCreate}
        isEdit={isEdit}
        isDelete={isDelete}
        order={order}
      />

      <Container height="200vh">
        <Flex
          height="100%"
          width="100%"
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Flex
            width={"100%"}
            height={"150px"}
            marginTop="35px"
            justifyContent={"space-around"}
          >
            <Flex width={"50%"} marginLeft="15px">
              <Flex height={"35px"} alignItems="center">
                <Icon
                  w={12}
                  h={12}
                  color="#FFF"
                  as={RiDashboardFill}
                  marginRight="15px"
                />
                <Text fontSize="36px" color="#FFF">
                  Dashboard
                </Text>
              </Flex>
            </Flex>

            <Flex width={"35%"}>
              <Button
                width={"135px"}
                height={"35px"}
                backgroundColor="#364153"
                color={"#fff"}
                fontSize={"11px"}
                marginLeft="20px"
                padding="25px"
                onClick={() => {
                  handleModal("Adicionar Transação", "isCreate", null);
                }}
                _hover={{ backgroundColor: "#0A0A0A" }}
              >
                <Icon
                  w={8}
                  h={8}
                  color="#FFF"
                  as={IoAddCircleSharp}
                  marginRight="15px"
                />
                <Text whiteSpace={"pre-wrap"}>Adicionar Transação</Text>
              </Button>

              <Button
                width={"135px"}
                height={"35px"}
                backgroundColor="#364153"
                color={"#fff"}
                fontSize={"11px"}
                marginLeft="20px"
                padding="25px"
                _hover={{ backgroundColor: "#0A0A0A" }}
              >
                <Icon
                  w={8}
                  h={8}
                  color="#FFF"
                  as={AiOutlineUpload}
                  marginRight="15px"
                />
                <Text whiteSpace={"pre-wrap"}>Importar Planilha</Text>
              </Button>
            </Flex>

            <Flex width={"15%"} flexDirection="row">
              <Avatar
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
                marginRight="15px"
              />
              <Flex flexDirection="column">
                <Text color="#FFF" as="b">
                  Bem vindo,
                </Text>
                <Text color="#FFF" as="b">
                  {userName}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            width="70%"
            height="15%"
            backgroundColor="#364153"
            borderRadius="5px"
            flexDirection="column"
            color="#FFF"
            justifyContent="space-around"
            marginBottom="30px"
          >
            <Flex justifyContent="space-evenly" alignItems={"center"}>
              <Flex alignItems="center">
                <Icon
                  w={6}
                  h={6}
                  color="#FFF"
                  as={VscGraphLine}
                  marginRight="15px"
                />
                <Text fontSize="24px" as="b">
                  Total Investido:
                </Text>
              </Flex>
              <Text fontSize="24px">
                <CurrencyFormat
                  value={investiment.totals}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"R$"}
                  renderText={(value) => `  ${value}`}
                />
              </Text>
            </Flex>
            <Flex justifyContent="space-evenly" alignItems={"center"}>
              <Flex alignItems="center">
                <Icon
                  w={6}
                  h={6}
                  color="#FFF"
                  as={HiTicket}
                  marginRight="15px"
                />
                <Text fontSize="24px" as="b">
                  Compras no mês:
                </Text>
              </Flex>
              <Text fontSize="24px">
                <CurrencyFormat
                  value={investiment.buys}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"R$"}
                  renderText={(value) => `  ${value}`}
                />
              </Text>
            </Flex>
            <Flex justifyContent="space-evenly" alignItems={"center"}>
              <Flex alignItems="center">
                <Icon
                  w={6}
                  h={6}
                  color="#FFF"
                  as={VscGraph}
                  marginRight="15px"
                />
                <Text fontSize="24px" as="b">
                  Vendas no mês:
                </Text>
              </Flex>
              <Text fontSize="24px">
                <CurrencyFormat
                  value={investiment.sells}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"R$"}
                  renderText={(value) => `  ${value}`}
                />{" "}
              </Text>
            </Flex>
          </Flex>

          <Flex
            width={"100%"}
            height={"350px"}
            marginTop="35px"
            flexDirection="column"
          >
            <Flex width={"50%"} marginLeft="15px">
              <Flex height={"35px"} alignItems="center">
                <Icon
                  w={12}
                  h={12}
                  color="#FFF"
                  as={FaFileDownload}
                  marginRight="15px"
                />
                <Text fontSize="36px" color="#FFF">
                  Relatórios
                </Text>
              </Flex>
            </Flex>
            <Flex marginTop="50px" justifyContent="space-around">
              <Flex alignItems="center">
                <Text color="#FFF" fontSize="24px" marginRight="35px">
                  Composição
                </Text>
                <Icon
                  onClick={handleDownload}
                  w={8}
                  h={8}
                  color="#FFF"
                  as={BiDownload}
                  marginRight="15px"
                />
              </Flex>
              <Flex alignItems="center">
                <Text color="#FFF" fontSize="24px" marginRight="35px">
                  Rentabilidade
                </Text>
                <Icon
                  onClick={handleDownload}
                  w={8}
                  h={8}
                  color="#FFF"
                  as={BiDownload}
                  marginRight="15px"
                />
              </Flex>
              <Flex alignItems="center">
                <Text color="#FFF" fontSize="24px" marginRight="35px">
                  Imposto de Renda
                </Text>
                <Icon
                  onClick={handleDownload}
                  w={8}
                  h={8}
                  color="#FFF"
                  as={BiDownload}
                  marginRight="15px"
                />
              </Flex>
            </Flex>
          </Flex>

          <Flex width="100%" height={"350px"} marginTop="35px">
            <Flex width="100%" marginLeft="15px" flexDirection="column">
              <Flex height={"35px"} alignItems="center" marginBottom="40px">
                <Icon
                  w={12}
                  h={12}
                  color="#FFF"
                  as={FaWallet}
                  marginRight="15px"
                />
                <Text fontSize="36px" color="#FFF">
                  Painel de Transações
                </Text>
              </Flex>
              <Flex width="98%" overflow="hidden">
                <TableContainer overflowY="scroll" maxHeight="450px">
                  <Table variant="mytable">
                    <Thead>
                      <Tr>
                        <Th minWidth="250px">Categoria</Th>
                        <Th>Ativo</Th>
                        <Th>Ordem</Th>
                        <Th>Broker</Th>
                        <Th>Negociação</Th>
                        <Th>Vencimento</Th>
                        <Th>Quantidade</Th>
                        <Th>Preço</Th>
                        <Th>Total</Th>
                        <Th>Ações</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {orders.map((order, index) => {
                        return (
                          <Tr key={index}>
                            <Td fontSize="12px">{order.category}</Td>
                            <Td fontSize="12px">{order.order}</Td>
                            <Td fontSize="12px">
                              {order.orderType === "buy" ? "Compra" : "Venda"}
                            </Td>
                            <Td fontSize="12px">{order.broker}</Td>
                            <Td fontSize="12px">{order.negociationDate}</Td>
                            <Td fontSize="12px">{order.endDate}</Td>
                            <Td fontSize="12px">{order.quantity}</Td>
                            <Td fontSize="12px">{order.price}</Td>
                            <Td fontSize="12px">{order.total}</Td>
                            <Td>
                              <Icon
                                w={3}
                                h={3}
                                color="#FFF"
                                as={FiEdit2}
                                onClick={() =>
                                  handleModal(
                                    "Editar uma Transação",
                                    "isEdit",
                                    order
                                  )
                                }
                                marginRight="15px"
                              />
                              <Icon
                                w={3}
                                h={3}
                                color="tomato"
                                as={AiFillDelete}
                                marginRight="15px"
                                onClick={() =>
                                  handleModal(
                                    "Deletar uma transação",
                                    "isDelete",
                                    order
                                  )
                                }
                              />
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            width="100%"
            justifyContent="flex-end"
            marginBottom="15px"
            marginTop="45px"
          >
            <Icon
              w={12}
              h={12}
              color="#000"
              as={MdLogout}
              marginRight="35px"
              onClick={logout}
            />
          </Flex>
        </Flex>
      </Container>
    </>
  );
}

export default Dashboard;
