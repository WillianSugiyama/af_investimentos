import { Container } from '../components/Container'
import { Button, Flex, Icon, Input, InputGroup, InputRightElement, Link, Text, useToast } from "@chakra-ui/react";
import { PasswordInput } from '../components/PasswordInput';
import React from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'next/router';


export default function Index() {
  const toast = useToast()
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [show, setShow] = React.useState(false);
  const { login }: any = useAuth()
  const router = useRouter();
  
  const handleClick = () => setShow(!show);
  const loginAPI = async () => {
      const res = await login(email, password)

      if(res) {
        router.push('/dashboard')
        return;
      } 

      toast({
        title: 'Erro ao logar',
        description: 'Confira seu email e senha.',
        status: 'error',
        duration: 1500,
        isClosable: true
      })
    }

  return (
    <>
      <Container height="100vh">
        <Flex height="100vh" width="100vw" flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
          <Flex width={'60vw'} flexDirection={'column'} justifyContent={'flex-start'} marginBottom={'30px'}>
            <Text fontSize="36px" as='b' color='#000'> Vamos entrar na sua conta </Text>
            <Text fontSize="25px" as='b' color='#000'> Bem vindo de volta, investidor(a) </Text>
          </Flex>
          <Flex width={'60vw'} flexDirection={'column'} justifyContent={'space-between'} marginBottom={'30px'}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pr='4.5rem'
              color="#fff"
              margin={'10px 0'}
              type={'text'}
              placeholder='Email*'
            />
            <InputGroup size='md'>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pr='4.5rem'
                margin={'10px 0'}
                type={show ? 'text' : 'password'}
                placeholder='Senha*'
                color="#fff"
              />
              <InputRightElement width='4.5rem' margin={'10px 0'}>
                <Icon w={8} h={8}  color='#000' as={show ? AiFillEyeInvisible : AiFillEye} onClick={handleClick} />
              </InputRightElement>
            </InputGroup>
          </Flex>
          <Flex width={'60vw'} flexDirection={'column'} justifyContent={'flex-start'} marginBottom={'30px'}>
            <Button width={'150px'} height={'50px'} backgroundColor="#000" color={'#fff'} fontSize={'16px'} _hover={{ backgroundColor: "#0A0A0A" }} onClick={loginAPI}>Entrar</Button>
          </Flex>
        </Flex>
      </Container> 
    </>
  )
}
