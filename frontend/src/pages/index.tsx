import { Container } from "../components/Container";
import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/router";

export default function Index() {
  const toast = useToast();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [cellphone, setCellphone] = React.useState("");
  const [show, setShow] = React.useState(false);
  const router = useRouter();

  const handleClick = () => setShow(!show);

  const redirectToLogin = () => {
    router.push("/login");
  };
  const signUpAPI = async () => {
    const data = {
      email,
      password,
      fullName,
      telephoneNumber: cellphone,
      username: email,
    };

    const res = await fetch(
      "https://afinvestimentos-production.up.railway.app/api/v1/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (res.status === 201) {
      toast({
        title: "Cadastro realizado",
        description: "Cadastro realizado com sucesso",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      console.log(res);
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

  return (
    <>
      <Container height="100vh">
        <Flex
          height="100vh"
          width="100vw"
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Flex
            width={"60vw"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            marginBottom={"30px"}
          >
            <Text fontSize="36px" as="b" color="#000">
              {" "}
              Vamos registrar sua conta{" "}
            </Text>
            <Text fontSize="25px" as="b" color="#000">
              {" "}
              Olá investidor(a) , desejamos uma boa experiência{" "}
            </Text>
          </Flex>
          <Flex
            width={"60vw"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            marginBottom={"30px"}
          >
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              pr="4.5rem"
              color="#fff"
              margin={"10px 0"}
              type={"text"}
              placeholder="Nome Completo*"
            />
            <Input
              value={cellphone}
              onChange={(e) => setCellphone(e.target.value)}
              pr="4.5rem"
              color="#fff"
              margin={"10px 0"}
              type={"text"}
              placeholder="(DDD) Celular*"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pr="4.5rem"
              color="#fff"
              margin={"10px 0"}
              type={"text"}
              placeholder="Email*"
            />
            <InputGroup size="md">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pr="4.5rem"
                margin={"10px 0"}
                type={show ? "text" : "password"}
                placeholder="Senha*"
                color="#fff"
              />
              <InputRightElement width="4.5rem" margin={"10px 0"}>
                <Icon
                  w={8}
                  h={8}
                  color="#000"
                  as={show ? AiFillEyeInvisible : AiFillEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
          </Flex>
          <Flex
            width={"60vw"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            marginBottom={"30px"}
          >
            <Button
              width={"150px"}
              height={"50px"}
              backgroundColor="#000"
              color={"#fff"}
              fontSize={"16px"}
              _hover={{ backgroundColor: "#0A0A0A" }}
              onClick={signUpAPI}
            >
              {" "}
              Registrar e entrar
            </Button>
          </Flex>
          <Flex
            width={"60vw"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            marginBottom={"30px"}
          >
            <Text color={"#555454"} fontSize={"16px"}>
              {" "}
              Já possui uma conta?{" "}
              <Link color="#000000" onClick={redirectToLogin}>
                Entre
              </Link>{" "}
            </Text>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
