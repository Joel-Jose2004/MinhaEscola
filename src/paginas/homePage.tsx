import { Box, Link } from "@chakra-ui/react";
import {
  Text,
  Input,
  Button,
  InputLeftElement,
 InputGroup  
} from '@chakra-ui/react'
import {  useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useMedioRepository } from "../repository/useMedioRepository";
import { useSuperiorRepository } from "../repository/useSuperiorRepository";
import {
  Badge,
  Flex,
  HStack,
  Icon,
  Tag,
} from "@chakra-ui/react";
import {
  FiMapPin,
  FiArrowRight,
  FiStar,
  FiAward,
  FiHome,
} from "react-icons/fi";
import { GoArrowRight } from "react-icons/go";

export function HomePage(){
   const [medio,setMedio]=useState(true)
   const [superior,setSuperior]=useState(false)
   const [search,setSearch]=useState("")
   const [searchStart,setSearchStart]=useState(false)
   const [result,setResult]=useState("")
   const getSchool=useMedioRepository(state=>state.getSchool)
   const listSchool=useMedioRepository(state=>state.listSchool)
   const getUni=useSuperiorRepository(state=>state.getSchool)
   const listUni=useSuperiorRepository(state=>state.listUni)

   const Superior=()=>{
    setMedio(false)
    setSuperior(true)
    
   }

   const Medio=()=>{
    setMedio(true)
    setSuperior(false)
   }

   const Pesquisar=()=>{
      setSearchStart(true)
          setResult(search)
          if(medio==true){
              getSchool(search)            
          }else{           
          getUni(search)
             
          } 
   } 

  return(
     <Box 
     padding={1}
     height={"100vh"}
     display={"flex"} 
     flexDirection={"column"} 
     justifyContent={searchStart?"none":"center"}
     alignItems={"center"}
     gap={20}>

    <Box width={"50%"} gap={2}
    boxShadow={"1px 2px 10px grey"} borderRadius={"20"}
    display={"flex"} flexDirection={"column"} alignItems={"center"}
         padding={2}>
             <Text
               fontFamily={"arial"}
               fontSize={"30px"}
               color={"green.700"}
               fontWeight={"bold"}>Minha Escola</Text>

       <InputGroup maxW="600%" display={"flex"} gap={2}>
       
             <InputLeftElement pointerEvents="none">
             <CiSearch color="gray.400" />
            </InputLeftElement>
             <Input type='search'  onChange={(e)=>setSearch(e.target.value)} borderRadius={20}/>
             <Button colorScheme="green" onClick={()=>Pesquisar()}>Pesquisar</Button>
         
       </InputGroup>   

        <Box display={"flex"} gap={2} padding={2}> 
            <Text bg={medio?"green.500":"blackAlpha.200"} color={medio?"white":"black"} padding={1}
            borderRadius={10} cursor={"pointer"} onClick={()=>Medio()}
            >Ensino Médio</Text>

            <Text
            bg={superior?"green.500":"blackAlpha.200"} color={superior?"white":"black"} padding={1}
            borderRadius={10} cursor={"pointer"} onClick={()=>Superior()}>
            Ensino Superior</Text>
        </Box> 
    </Box>


      <Box display={searchStart?"flex":"none"} gap={2} 
      width={"50%"}
      >
          {medio==true? 
            
           listSchool.length==0 ?(
            <Box  display={"flex"} width={"100%"}
            flexDirection={"column"} justifyContent={"center"} alignItems={"center"}> 

              <Text bg={"red.100"} height={"40px"} display={"flex"} justifyContent={"center"}
              alignItems={"center"} 
                 width={"10%"} borderRadius={"50%"}><CiSearch color="red" size={20}/></Text> 
              <Text color={"black"} fontWeight={"bold"} fontSize={20}>
                Nenhuma instituição encontrada para “{result}”
              </Text>
              <Text color={"grey"}>Tente outro termo, verifique a ortografia</Text></Box>
           ):
          listSchool.map((index,item)=>(
              
        <Box 
            key={item}
             maxW="440px"
             bg="white"
             borderRadius="28px"
             border="1px solid"
             borderColor="green.200"
             p={7}
             position="relative"
             overflow="hidden"
             boxShadow="sm"
           >
             {/* Círculo decorativo */}
             <Box
               position="absolute"
               top="-90px"
               right="-90px"
               w="180px"
               h="180px"
               bg="green.50"
               borderRadius="full"
             />
       
             {/* Nota */}
             <Flex
               position="absolute"
               top={6}
               right={6}
               bg="gray.50"
               px={3}
               py={2}
               borderRadius="16px"
               align="center"
               gap={2}
               boxShadow="sm"
             >
               <Icon as={FiStar} color="orange.400" fill="orange" />
               <Text fontWeight="700">4.8</Text>
             </Flex>
       
             {/* Topo */}
             <Flex align="center" gap={4}>
               <Flex
                 w="50px"
                 h="50px"
                 borderRadius="18px"
                 bg="green.50"
                 align="center"
                 justify="center"
               >
                 <Icon
                   as={FiHome}
                   color="green.600"
                   boxSize={6}
                 />
               </Flex>
       
               <Tag
                 bg="green.50"
                 color="green.700"
                 borderRadius="full"
                 px={4}
                 py={2}
                 fontWeight="600"
                 fontSize="11px"
                 letterSpacing="1px"
               >
                 ENSINO MÉDIO
               </Tag>
             </Flex>
       
             {/* Nome */}
             <Text
               mt={7}
               fontSize="30px"
               fontWeight="700"
               lineHeight="1.2"
             >
               {index.name}
             </Text>
       
             {/* Informações */}
             <HStack
               mt={4}
               color="gray.600"
               spacing={3}
               flexWrap="wrap"
             >
               <HStack spacing={1}>
                 <Icon as={FiMapPin} />
                 <Text>{index.location}</Text>
               </HStack>
       
               <Text>•</Text>
       
               <Text>Presencial</Text>
       
               <Text>•</Text>
       
               <Text>32k alunos</Text>
             </HStack>
       
             {/* Nota MEC */}
             <Badge
               mt={5}
               bg="#FFF4D8"
               color="#6F4B00"
               px={4}
               py={2}
               borderRadius="full"
               display="inline-flex"
               alignItems="center"
               gap={2}
               fontSize="13px"
             >
               <Icon as={FiAward} />
               Nota máxima MEC
             </Badge>
       
             {/* Cursos */}
             <Box mt={8}>
               <Text
                 fontSize="13px"
                 color="gray.600"
                 letterSpacing="1px"
                 fontWeight="600"
                 mb={3}
               >
                 CURSOS COMPATÍVEIS
               </Text>
       
               <Tag
                 bg="#F6F7D7"
                 border="1px solid"
                 borderColor="#D8D9AA"
                 color="#333"
                 borderRadius="12px"
                 px={4}
                 py={2}
                 fontWeight="600"
               >
                 {result}
               </Tag>
             </Box>
       
             {/* Linha */}
             <Box
               h="1px"
               bg="gray.200"
               mt={10}
               mb={6}
             />
       
             {/* Rodapé */}
             <Flex
               justify="space-between"
               align="center"
             >
               <Text color="gray.600">
                 Inscrições abertas
               </Text>
       
               <HStack
                 color="green.600"
                 fontWeight="700"
                 cursor="pointer"
               >
                 <Text>Ver detalhes</Text>
                 <Icon as={FiArrowRight} />
               </HStack>
             </Flex>
           </Box>
          )): 
          listUni.length==0?(
            <Box  display={"flex"} width={"100%"}
            flexDirection={"column"} justifyContent={"center"} alignItems={"center"}> 

              <Text bg={"red.100"} height={"40px"} display={"flex"} justifyContent={"center"}
              alignItems={"center"} 
                 width={"10%"} borderRadius={"50%"}><CiSearch color="red" size={20}/></Text> 
              <Text color={"black"} fontWeight={"bold"} fontSize={20}>
                Nenhuma instituição encontrada para “{result}”
              </Text>
              <Text color={"grey"}>Tente outro termo, verifique a ortografia</Text></Box>
          ):
          listUni.map((index,item)=>(
              
        <Box 
            key={item}
             maxW="440px"
             bg="white"
             borderRadius="28px"
             border="1px solid"
             borderColor="green.200"
             p={7}
             position="relative"
             overflow="hidden"
             boxShadow="sm"
           >
             {/* Círculo decorativo */}
             <Box
               position="absolute"
               top="-90px"
               right="-90px"
               w="180px"
               h="180px"
               bg="green.50"
               borderRadius="full"
             />
       
             {/* Nota */}
             <Flex
               position="absolute"
               top={6}
               right={6}
               bg="gray.50"
               px={3}
               py={2}
               borderRadius="16px"
               align="center"
               gap={2}
               boxShadow="sm"
             >
               <Icon as={FiStar} color="orange.400" fill="orange" />
               <Text fontWeight="700">4.8</Text>
             </Flex>
       
             {/* Topo */}
             <Flex align="center" gap={4}>
               <Flex
                 w="50px"
                 h="50px"
                 borderRadius="18px"
                 bg="green.50"
                 align="center"
                 justify="center"
               >
                 <Icon
                   as={FiHome}
                   color="green.600"
                   boxSize={6}
                 />
               </Flex>
       
               <Tag
                 bg="green.50"
                 color="green.700"
                 borderRadius="full"
                 px={4}
                 py={2}
                 fontWeight="600"
                 fontSize="11px"
                 letterSpacing="1px"
               >
                 ENSINO SUPERIOR
               </Tag>
             </Flex>
       
             {/* Nome */}
             <Text
               mt={7}
               fontSize="30px"
               fontWeight="700"
               lineHeight="1.2"
             >
               {index.name}
             </Text>
       
             {/* Informações */}
             <HStack
               mt={4}
               color="gray.600"
               spacing={3}
               flexWrap="wrap"
             >
               <HStack spacing={1}>
                 <Icon as={FiMapPin} />
                 <Text>{index.location}</Text>
               </HStack>
       
               <Text>•</Text>
       
               <Text>Presencial</Text>
       
               <Text>•</Text>
       
               <Text>32k alunos</Text>
             </HStack>
       
             {/* Nota MEC */}
             <Badge
               mt={5}
               bg="#FFF4D8"
               color="#6F4B00"
               px={4}
               py={2}
               borderRadius="full"
               display="inline-flex"
               alignItems="center"
               gap={2}
               fontSize="13px"
             >
               <Icon as={FiAward} />
               Nota máxima MEC
             </Badge>
       
             {/* Cursos */}
             <Box mt={8}>
               <Text
                 fontSize="13px"
                 color="gray.600"
                 letterSpacing="1px"
                 fontWeight="600"
                 mb={3}
               >
                 CURSOS COMPATÍVEIS
               </Text>
       
               <Tag
                 bg="#F6F7D7"
                 border="1px solid"
                 borderColor="#D8D9AA"
                 color="#333"
                 borderRadius="12px"
                 px={4}
                 py={2}
                 fontWeight="600"
               >
                 {result}
               </Tag>
             </Box>
       
             {/* Linha */}
             <Box
               h="1px"
               bg="gray.200"
               mt={10}
               mb={6}
             />
       
             {/* Rodapé */}
             <Flex
               justify="space-between"
               align="center"
             >
               <Text color="gray.600" 
               display={"flex"} 
               alignItems={"center"}
               gap={2}>
                 Acesse o site <GoArrowRight/>
               </Text>
       
               <HStack
                 color="green.600"
                 fontWeight="700"
                 cursor="pointer"
               >
                <Link href={index.link} isExternal color="teal.500">{index.name}</Link>
                 
                 
               </HStack>
             </Flex>
           </Box>
            
          ))}
      </Box>


     </Box>
  )

}