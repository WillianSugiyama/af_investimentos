import { Container } from '../components/Container'
import { Button, Flex, Input, Link, Text } from "@chakra-ui/react";
import { PasswordInput } from '../components/PasswordInput';

const Index = () => (
  <>
  <Container height="100vh">
    <Flex height="100vh" width="100vw" flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
      <Flex width={'60vw'} flexDirection={'column'} justifyContent={'flex-start'} marginBottom={'30px'}>
        <Text fontSize="36px" as='b' color='#000'> Vamos registrar sua conta </Text>
        <Text fontSize="25px" as='b' color='#000'> Olá investidor(a) , desejamos uma boa experiência </Text>
      </Flex>
      <Flex width={'60vw'} flexDirection={'column'} justifyContent={'space-between'} marginBottom={'30px'}>
        <Input
          pr='4.5rem'
          color="#fff"
          margin={'10px 0'}
          type={'text'}
          placeholder='Nome Completo*'
        />
        <Input
          pr='4.5rem'
          color="#fff"
          margin={'10px 0'}
          type={'text'}
          placeholder='(DDD) Celular*'
        />
        <Input
          pr='4.5rem'
          color="#fff"
          margin={'10px 0'}
          type={'text'}
          placeholder='Email*'
        />
        <PasswordInput />
      </Flex>
      <Flex width={'60vw'} flexDirection={'column'} justifyContent={'flex-start'} marginBottom={'30px'}>
        <Button width={'150px'} height={'50px'} backgroundColor="#000" color={'#fff'} fontSize={'16px'} _hover={{ backgroundColor: "#0A0A0A" }}> Registrar e entrar</Button>
      </Flex>
      <Flex width={'60vw'} flexDirection={'column'} justifyContent={'flex-start'} marginBottom={'30px'}>
        <Text color={'#555454'} fontSize={'16px'}> Já possui uma conta? <Link color='#000000' href='#'>Entre</Link> </Text>
      </Flex>
    </Flex>
  </Container> 
  </>
)

export default Index
