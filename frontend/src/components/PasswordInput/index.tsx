import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Icon } from '@chakra-ui/react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import React from "react";

export function PasswordInput() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size='md'>
      <Input
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
  )
}
