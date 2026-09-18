import { Box, VStack, Text, Input, Button, Spinner, useToast,
 InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
;
import { useAuthRepository } from "../repository/useAuthRepository";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { BiLock } from "react-icons/bi";
import { TfiEmail } from "react-icons/tfi";
import { ROUTE_CREATE_ACCOUNT } from "../utils/constants";



export function Login() {
  const toast = useToast()
  const navigate = useNavigate()
   const log=useAuthRepository(state=>state.login)
  const [loader, setLoader] = useState(false)
  const [dadosDador, setdadosDador] = useState({
    email: "",
    password: ""
  })
  const [eyeOpen,setEyeOpen]=useState(true)
   const [typeInput,setTypeInput]=useState("password")
   
   const SeePassword=()=>{
      if(eyeOpen==true){
         setEyeOpen(false)
        setTypeInput("text")
      }else{
        setEyeOpen(true)
        setTypeInput("password")
      }
   }


  const login = async () => {

    if (dadosDador?.email !== "" && dadosDador?.password !== "") {
      setLoader(true)

    setTimeout(()=>{
           log(dadosDador.email, dadosDador.password)
  .then((res) => {

    setLoader(false);
    navigate(res);

  })
  .catch((error) => {
        console.error("ERRO:", error);
    console.log("Código:", error?.code);

    setLoader(false);

    switch (error?.code) {

      case "auth/invalid-email":

        toast({
          title: "E-mail inválido",
          description: "Digite um endereço de e-mail válido.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });

        break;

      case "auth/invalid-credential":

        toast({
          title: "Credenciais inválidas",
          description: "O e-mail ou a senha estão incorretos.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });

        break;

      case "auth/user-not-found":

        toast({
          title: "Usuário não encontrado",
          description: "Não existe uma conta associada a este e-mail.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });

        break;

      case "auth/too-many-requests":

        toast({
          title: "Muitas tentativas",
          description: "Tente novamente mais tarde.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });

        break;

      default:

        toast({
          title: "Erro",
          description: "Não foi possível iniciar sessão.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });

        break;
    }
    

    });
},3000)
      
      

    } else {
      toast({
        title: "Alerta",
        description: "Preencha todos os campos",
        status: "warning",
        duration: 3000,
        isClosable: true
      })
    }



  }


  return (
    <Box height={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}
      bg={"blackAlpha.100"}>


      <Box width={{ base: "80%",sm:"47%", md: "40%", lg: "30%" }} display={"flex"}
        flexDirection={"column"} gap={"5px"} 
        borderRadius={"5px"}
        padding={"20px"} boxShadow={"0px 3px 8px grey"}
        bg={"white"}
      >

        <Text fontWeight={"bold"} fontSize={"larger"}
          display={"flex"} justifyContent={"center"} color={"green.600"}>Login</Text>

        <VStack gap={5}>
          <Box w="100%">
            <Text fontWeight={"normal"} >Email</Text>
             <InputGroup >
                  <InputLeftElement>
                          <TfiEmail/>                             
                 </InputLeftElement>
          <Input type="email" placeholder="Email" focusBorderColor="green.600"
              required
              name="email"
              value={dadosDador.email}
              onChange={(event) => setdadosDador({ ...dadosDador, email: event.target.value })} />         
           </InputGroup>
    </Box>

          <Box w="100%">
            <Text fontWeight={"normal"}>Password</Text>

            <InputGroup >
                      <InputLeftElement >
                              <BiLock />              
                     </InputLeftElement>
         
                      <InputRightElement >
                             {eyeOpen?<BsEyeSlash cursor={"pointer"} onClick={()=>SeePassword()}/>
                             :
                             <BsEye cursor={"pointer"} onClick={()=>SeePassword()}/>  }             
                     </InputRightElement>

            <Input type={typeInput} placeholder={"Password"} focusBorderColor="green.600"
              required
              name="password"
              value={dadosDador.password}
              onChange={(event) => setdadosDador({ ...dadosDador, password: event.target.value })} />
              </InputGroup>       

          </Box>

          <Box w={"100%"}>
            <Button onClick={login}
              colorScheme={"green"} disabled={loader?true:false}
              width={"100%"} variant={"solid"}>
              {loader ? <Spinner />: "Login"}
              </Button>
              
              </Box>
          <Box width={"100%"} display={"flex"} justifyContent={"space-between"}
          flexDirection={"column"} >
            <Text
              color={"blackAlpha.800"}
              width={"100%"} display={"flex"} justifyContent={"center"}>
              Não tenho uma conta?
              <Button variant={"link"} colorScheme="green"
                onClick={()=>navigate(ROUTE_CREATE_ACCOUNT.route)}>Criar Conta</Button></Text>

                <Button variant={"link"} colorScheme="green" onClick={()=>navigate("/")}>
                  Página Inicial
                </Button>

          </Box>
        </VStack>

      </Box>

    </Box>
  )
}