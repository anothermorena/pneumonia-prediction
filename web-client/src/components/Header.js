//import logo from './logo.png';
import {useRef,useState,useEffect} from "react";
import { useViewportScroll } from "framer-motion";
import {chakra,Flex,useColorModeValue,Box,Text} from "@chakra-ui/react";

const Header = () => {

  const bg = useColorModeValue("gray.50", "gray.800");
  const ref = useRef();
  const [y, setY] = useState(0);
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};

  const { scrollY } = useViewportScroll();

  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  

  return (
    <Box pos="relative">
      <chakra.header ref={ref} shadow={y > height ? "sm" : undefined} transition="box-shadow 0.2s" bg={bg} borderTop="6px solid" borderTopColor="blue.400" w="full" overflowY="hidden">
        <chakra.div h="4.5rem" mx="auto" maxW="1200px">

          <Flex w="full" h="full" px="6" align="center" justify="space-between">
            <Flex justify="center" w="full" maxW="824px" ml={40} mr={15} align="center" color="pink.400" display={{ base: "none", md: "flex" }}>
              <Text fontSize='4xl' color="blue.400" align="center" >Pneumonia Prediction</Text>
            </Flex>

            <Flex justify="flex-end" align="center">
                <Text color="blue.400"  display={{ base: "flex", md: "none" }} ml={16}>Pneumonia Prediction</Text>
            </Flex>
          </Flex>

        </chakra.div>
      </chakra.header>
    </Box>
  );
};

export default Header;