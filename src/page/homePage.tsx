import { Box, Link, List, ListItem } from "@chakra-ui/react";
import { Text, Input, InputLeftElement, InputGroup } from '@chakra-ui/react'
import {  useEffect, useMemo, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDataRepository } from "../repository/useDataRepository";
import { Flex, HStack, Icon, Tag} from "@chakra-ui/react";
import { FiMapPin, FiArrowRight, FiStar, FiHome } from "react-icons/fi";
import { GoArrowRight } from "react-icons/go";
import {Menu,MenuItem,MenuList, MenuButton,} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";


export function HomePage(){
   const [medio,setMedio]=useState(true)
   const [superior,setSuperior]=useState(false)
   const [search,setSearch]=useState("")
   const [searchStart,setSearchStart]=useState(false)
   const [result,setResult]=useState("")
   const sugestCourse=useDataRepository(state=>state.sugestCourse)
  
   const sugest=useDataRepository(state=>state.getCourses)
   const getSchool=useDataRepository(state=>state.getSchool)
   const listSchool=useDataRepository(state=>state.listSchool)
   const getUni=useDataRepository(state=>state.getUniversity)
   const listUni=useDataRepository(state=>state.listUni)
   const ref = useRef<HTMLInputElement>(null);
  const [aberto, setAberto] = useState(false);   
  const [indice, setIndice] = useState(-1);

  const resultados = useMemo(() => {
    if (!search) return [];

    return sugestCourse.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  useEffect(() => {
    setIndice(-1);
  }, [search]);

function selecionar(valor: string) {
    setSearch(valor);
    setAberto(false);
    ref.current?.focus();
  }

 useEffect(()=>{
   sugest()
 },[])

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
              setAberto(false)        
          }else{           
             getUni(search)
              setAberto(false)
          } 
   } 


  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setAberto(true);
        setIndice((old) =>
          old < resultados.length - 1 ? old + 1 : old
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setIndice((old) => (old > 0 ? old - 1 : 0));
        break;

      case "Enter":
        if (indice >= 0) {
          selecionar(resultados[indice]);
        }
        break;

      case "Escape":
        setAberto(false);
        break;
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

    <Box width={{base:"90%",md:"50%",lg:"50%"}} gap={2}
     borderRadius={"20"}
    display={"flex"} flexDirection={"column"} alignItems={"center"}
         padding={2}>
             <Text
               fontFamily={"arial"}
               fontSize={"30px"}
               color={"green.700"}
               fontWeight={"bold"}>Minha Escola</Text>

       <InputGroup >
       
             <InputLeftElement >
               <Menu>
                   <MenuButton >
                     <BsThreeDotsVertical />
                   </MenuButton>
                   <MenuList>
                     <MenuItem  onClick={()=>Medio()}
                      bg={medio?"green.500":"blackAlpha.200"} color={medio?"white":"black"}
                      >Ensino Médio</MenuItem>
                     <MenuItem onClick={()=>Superior()}
                     bg={superior?"green.500":"blackAlpha.200"} color={superior?"white":"black"}
                     display={"flex"} alignItems={"center"} gap={2} >Ensino Superior</MenuItem>
                   </MenuList>
                </Menu>
            </InputLeftElement>
            

        <Input
          ref={ref}
          value={search}
          placeholder="Coloque o nome do curso"
          size="lg"
          boxShadow={"0px 0px 2px 1px grey"}
          borderRadius="999px"
          onFocus={() => setAberto(true)}
          onChange={(e) => {
            setSearch(e.target.value);
            setAberto(true);
          }}
          onKeyDown={handleKeyDown}
          pr="70px"
          _focus={{
            borderColor: "gray.300",
            boxShadow: "0 1px 6px rgba(32,33,36,.28)",
          }}
          _hover={{
            boxShadow: "0 1px 6px rgba(32,33,36,.20)",
          }}
        />
             
                     <Flex
                       position="absolute"
                       right="20px"
                       h="100%"
                       align="center"
                       gap={3}
                       color="gray.500"
                       zIndex={2}
                     >
                       <CiSearch cursor="pointer" onClick={()=>Pesquisar()}/>
                     </Flex>
           

       </InputGroup>   
        
        

 {aberto && resultados.length > 0 && (
        <Box
          mt={2}
          bg="white"
          borderRadius="25px"
          overflow="hidden"
          boxShadow="0 4px 12px rgba(32,33,36,.28)"
          border="1px solid"
          borderColor="gray.200"
          
          w="100%"
          zIndex={100}
        >
          <List>

            {resultados.map((item, index) => (
              <ListItem
                key={item}
                px={6}
                py={3}
                cursor="pointer"
                bg={indice === index ? "gray.100" : "white"}
                _hover={{
                  bg: "gray.100",
                }}
                onMouseEnter={() => setIndice(index)}
                onClick={() => selecionar(item)}
              >
                <Flex align="center" gap={3}>
                  <CiSearch color="gray.400" />
                  {item}
                </Flex>
              </ListItem>
            ))}

          </List>
        </Box>
      )}

         
    </Box>


      <Box display={searchStart?"flex":"none"} gap={2} 
      width={"100%"} padding={5} justifyContent={"center"}
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