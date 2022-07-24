import { Center,Box,Image, Button, VStack, Text, Spinner} from '@chakra-ui/react'

const ImagePreview = ({imageUrl,setIsUploaded, setImageUrl,prediction,loading}) => {

  return (
    <Center w='100%' bg="blue.50" h="100%" display="grid" alignItems="center"> 
    <Box display="flex" flexDirection="column" bg="#fff" my={40} px={15} pb={18} boxShadow="xs" alignItems="center" borderRadius={20}>
        <Box display="grid" mt={25} alignItems="center" h={500} w={350} bg = "#FBFBFF" borderRadius={20}> 
          <Center display="flex" flexWrap="wrap" alignItems="center"> 
            <VStack>
                <Image id="uploaded-image" src={imageUrl} draggable={false} alt="uploaded-img" borderRadius={10} /> <br/>
                {loading ? (
                <>
                <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/> 
                <Text>Making an inference....</Text>
                </>):(
                <>
                <Text>Inference Results:</Text>
                <Text>{prediction}</Text>
                <Button colorScheme='blue' onClick={() => {setIsUploaded(false); setImageUrl(null);}}>Make Another Inference</Button>
                </>
                )}
            </VStack>
          </Center>
        </Box>
     </Box>
    </Center>
  )
}

export default ImagePreview;