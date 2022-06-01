import { useState, useEffect} from "react";
import { Center,Box, Image, Text, Input,useToast} from '@chakra-ui/react'
import CloudUpload from "./assets/cloud_upload.jpg";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ImagePreview from "./components/ImagePreview";
import axios from './api/axios';

//The api end point we need to call to make our predictions 
const PREDICTION_URL = '/predict';

function App() {

  const [imageUrl, setImageUrl] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const toast = useToast()

  const handleImageChange = async (e) => {
      setLoading(true);
      //check if we have a file uploaded
      if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();

        reader.onload = (e) => {
          setImageUrl(e.target.result);
          setIsUploaded(true);
        };
        //read the image as a url for preview
        reader.readAsDataURL(e.target.files[0]);

        //prepare form data to send to the api for inference
        const formData =  new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);

        //make the api call to make the inference
        try {
          const response = await axios.post(PREDICTION_URL,formData,
              {
                  headers: { 'Content-Type': 'multipart/form-data' }
              }
          );
          //set the prediction result
          const prediction = response?.data?.prediction; 
          setPrediction(prediction);
          setLoading(false);
          setErrMsg("");
        
        //if any error occurred,catch it and display a message to the user
      } catch (err) {
          if (!err?.response) {
              setErrMsg('No server response. Please reload the page and try again');
          } else {
              setErrMsg('Making an inference failed. Please reload the page and try again');
          }
          
          }
      }
  
    }
    //if there is an error message, show it as a toast whenever the errMsg state value changes 
    useEffect(() => {
      if(errMsg){
          toast({
              title: "An Error Occurred",
              description: errMsg,
              status: "error",
              duration: 15000,
              position: "bottom",
              isClosable: true,
            });
      }
    }, [errMsg]);
  
  
  return (
   <>
   <Header/>
   {/*If no image is uploaded render the upload form else show the uploaded image preview and inference results */}
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
              <Text color="#444" ml={14}>Click to upload a chest x-ray image</Text>
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
    ) : (<ImagePreview imageUrl={imageUrl} setIsUploaded={setIsUploaded} setImageUrl={setImageUrl} prediction={prediction} loading={loading}/>)}
   <Footer/>
   </>
  );
}

export default App;
