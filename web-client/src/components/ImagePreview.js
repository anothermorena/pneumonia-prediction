
import { Center,Box,Image, Button, VStack, Text} from '@chakra-ui/react'

const ImagePreview = ({image,setIsUploaded, setImage}) => {

  return (
    <Center w='100%' bg="blue.50" h="100%" display="grid" alignItems="center"> 
    <Box display="flex" flexDirection="column" bg="#fff" my={40} px={15} pb={18} boxShadow="xs" alignItems="center" borderRadius={20}>
        <Box display="grid" mt={25} alignItems="center" h={500} w={350} bg = "#FBFBFF" borderRadius={20}> 
          <Center display="flex" flexWrap="wrap" alignItems="center"> 
            <VStack>
                <Image id="uploaded-image" src={image} draggable={false} alt="uploaded-img" /> <br/>
                <Text>Prediction Results</Text>
                <Button colorScheme='blue' onClick={() => {setIsUploaded(false); setImage(null);}}>Make Another Prediction</Button>
            </VStack>
          </Center>
        </Box>
     </Box>
    </Center>
  )
}

export default ImagePreview;