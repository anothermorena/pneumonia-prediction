import { useState } from "react";
import { Center,Box, Image, Text, Input} from '@chakra-ui/react'
import CloudUpload from "./assets/cloud_upload.jpg";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ImagePreview from "./components/ImagePreview";


function App() {

  const [image, setImage] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

  const handleImageChange = (e) => {
    //check if we have a file uploaded
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result);
        setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
  
    }
  }
  
  return (
   <>
   <Header/>
   {/*If no image is uploaded render the upload form else show preview and results */}
   {!isUploaded ? (
   <Center w='100%' bg="blue.50" h="100%" display="grid" alignItems="center"> 
    <Box display="flex" flexDirection="column" bg="#fff" my={40} px={15} pb={18} boxShadow="xs" alignItems="center" borderRadius={20}>
        <Text mt={5} fontWeight="bold" fontSize="2xl">Upload an image below 😁</Text>
        <Box display="grid" mt={25} alignItems="center" border='1px dashed #4299E1' h={350} w={350} bg = "#FBFBFF" borderRadius={20}> 
          <Center display="flex" flexWrap="wrap" alignItems="center"> 
            <label htmlFor="upload-input">
              <Image
                align="center"
                src={CloudUpload}
                draggable={"false"}
                alt="placeholder"
              />
              <Text color="#444" ml={20}>Click to an upload image</Text>
            </label>

            <Input
              style={{display:"none"}}
              id="upload-input"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleImageChange}
            />
          </Center>
        </Box>
        </Box>
    </Center>
    ) : (
    <ImagePreview image={image} setIsUploaded={setIsUploaded} setImage={setImage}/>

    )}
   <Footer/>
   </>
  );
}

export default App;
