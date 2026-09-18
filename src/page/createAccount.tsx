import { Box, Input, Button,Text, VStack, Spinner, useToast, InputGroup, InputLeftElement, InputRightElement} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiLock } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import {type userInterface } from "../Types/userType";
import { Timestamp } from "firebase/firestore";
import { useAuthRepository } from "../repository/useAuthRepository";

export function CreateUser(){
   const toast=useToast()
   const navigate=useNavigate()
   const [userData,setUserData]=useState<userInterface>()
   const [loading,setLoading]=useState(false)
   const [getPassworsd,setgetPassword]=useState<string>("")
   const [eyeOpen,setEyeOpen]=useState(true)
   const [typeInput,setTypeInput]=useState("password")
   const createUser=useAuthRepository(state=>state.createAccount)

   const SeePassword=()=>{
      if(eyeOpen==true){
         setEyeOpen(false)
        setTypeInput("text")
      }else{
        setEyeOpen(true)
        setTypeInput("password")
      }
   }


const initialFormUser:userInterface={
    id:"",
    email:"",
    date_born:"",
    name:"",
    role:"user",
    phone:"",
    data:Timestamp as unknown as Timestamp
}





const Regist=async()=>{

    setLoading(true)
   await createUser(userData as userInterface,getPassworsd).then((res)=>(
       
    setTimeout(()=>{
        toast({
        title:"Alerta",
        description:""+res,  
        status:"success",
        duration:3000,
        isClosable:true
       })

       setUserData(initialFormUser)
      setLoading(false)
      navigate("/")
  
   },2000) 
    
   )).catch((error)=>(

      setTimeout(()=>{
        toast({
        title:"Alerta",
        description:""+error,  
        status:"error",
        duration:3000,
        isClosable:true
       }),     
      
      setLoading(false)
  
   },2000)
   

   ))

   
        
}
    return(
        <Box height={"100vh"} bg={"blackAlpha.200"}
         display={"flex"} justifyContent={"center"} alignItems={"center"}
        >
         
          <Box width={{base:"90%",sm:"55%",md:"45%",lg:"40%"}} display={"flex"} 
          flexDirection={"column"} gap={"5px"} bg={"white"}
          borderRadius={"5px"}
        padding={"15px"}
          boxShadow={"0px 1px 10px grey"}>
            
            <Text fontWeight={"bold"} fontSize={"larger"}
             display={"flex"} justifyContent={"center"} color={"green.600"}>Registar Usuário</Text>
            
            <VStack gap={5}>
            <Box w="100%">    
            <Text fontWeight={"normal"} >Nome</Text>
            <Input  type="text" placeholder="Nome Completo" focusBorderColor="green.600"
            name="nome"
            value={userData?.name}
             onChange={(e)=>setUserData({...userData,name:e.target.value}as userInterface)}
            /></Box>

            <Box w="100%">
            <Text fontWeight={"normal"}>Telefone</Text>
            <Input type="text" placeholder={"Número Telefone"} focusBorderColor="green.600"
              name="phone"
            maxLength={9}
              value={userData?.phone}
               onChange={(e)=>setUserData({...userData,phone:e.target.value}as userInterface)}/>
             </Box>

              <Box w="100%">
            <Text fontWeight={"normal"}>E-mail</Text>
            <Input type="email" placeholder="Email" focusBorderColor="green.600"
              name="email"
              value={userData?.email}
               onChange={(e)=>setUserData({...userData, email:e.target.value}as userInterface)}
               /></Box>

                <Box w="100%">
            <Text fontWeight={"normal"}>Palavra-Passe</Text>
              <InputGroup >
                      <InputLeftElement >
                              <BiLock />              
                     </InputLeftElement>
          
          
                      <InputRightElement >
                             {eyeOpen?<BsEyeSlash cursor={"pointer"} onClick={()=>SeePassword()}/>
                             :
                             <BsEye cursor={"pointer"} onClick={()=>SeePassword()}/>  }             
                     </InputRightElement>
                <Input type={typeInput} placeholder="Palavra-Passe" focusBorderColor="green.600"
                  name="passe"
                  value={getPassworsd}
                   onChange={(e)=>setgetPassword(e.target.value)}/>
                 
                </InputGroup>                   
            
               </Box>

            <Box w="100%">
            <Text fontWeight={"normal"}>Data Nascimento</Text>
            <Input type="date" placeholder="Data Nascimento" focusBorderColor="green.600"
              name="nascimento"
              value={userData?.date_born}
               onChange={(e)=>setUserData({...userData, date_born:e.target.value}as userInterface)} 
               w={"60%"}
            /></Box>


          <Box w={"100%"} display={"flex"} 
          flexDirection={"column"}
          justifyContent={"center"}>              
            <Button
            colorScheme="green" variant={"solid"}
            color={"white"} disabled={loading?true:false}
            onClick={Regist} width={"100%"}>
              {loading ? <Spinner/>:"Registar"}
              </Button>
              
               <Text color={"blackAlpha.800"}
               width={"100%"} display={"flex"} justifyContent={"center"}>
                Já tenho conta<Button 
                onClick={()=>navigate("/Login")}variant={"link"} colorScheme="green">Login</Button> </Text>
               <Button variant={"link"} colorScheme="green" onClick={()=>navigate("/")}>Página Inicial</Button>
              </Box>

            </VStack>            
          </Box>

        </Box>
    )
}