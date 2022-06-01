import {FaLinkedin,FaGithub} from "react-icons/fa";
import { chakra, Flex, Icon, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex w="full" bg={useColorModeValue("gray.50", "gray.800")} p={50} alignItems="center" justifyContent="center">
      <Flex w="full" as="footer" flexDir={{ base: "column", sm: "row" }} align="center" justify="space-between" px="6" py="4" bg="white">
        <chakra.a href="#" fontSize="xl" fontWeight="bold" color="blue.400">Morena </chakra.a>
        <chakra.p py={{ base: "2", sm: "0" }} color="blue.400">Made with love 💙 </chakra.p>

        <Flex mx="-2">
          <chakra.a href="https://www.linkedin.com/in/bwooo/" target="_blank" m={2} color="gray.600" _hover={{color: "blue.400"}} aria-label="Linkedin">
            <Icon as={FaLinkedin} boxSize="5" viewBox="0 0 24 24" fill="currentColor"/>
          </chakra.a>

          <chakra.a href="https://github.com/anothermorena" target="_blank" m={2} color="gray.600" _hover={{color: "blue.400"}} aria-label="Github">
            <Icon as={FaGithub} boxSize="5"  viewBox="0 0 24 24" fill="currentColor" />
          </chakra.a>
          
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Footer;