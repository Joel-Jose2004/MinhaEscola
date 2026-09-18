import { Box, List, ListItem } from "@chakra-ui/react";
import { Text, Input, InputLeftElement, InputGroup } from '@chakra-ui/react'
import {  useEffect, useMemo, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDataRepository } from "../repository/useDataRepository";
import { Flex, Icon,} from "@chakra-ui/react";
import {Menu,MenuItem,MenuList, MenuButton,} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUniversity } from 'react-icons/fa'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {auth} from "../firebase/firebaseAuth"
import { ROUTE_ADMIN_PAGE, ROUTE_LOGIN_PAGE } from "../utils/constants";
import type { userInterface } from "../Types/userType";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Avatar } from "@chakra-ui/react";

export function HomePage(){
   const [medio,setMedio]=useState(true)
   const [superior,setSuperior]=useState(false)
   const [search,setSearch]=useState("")
   const [searchStart,setSearchStart]=useState(false)
   const [result,setResult]=useState("")
   const [id,setId]=useState("")
   const [user,setUser]=useState<userInterface>()
   const getUser=useDataRepository(state=>state.getUser)
   const sugestCourse=useDataRepository(state=>state.sugestCourse)
   const navigate=useNavigate()
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


   useEffect(()=>{
      verificar()
   },[])

   const verificar=()=>{
       
      onAuthStateChanged(auth,(user)=>{
         if(user?.uid){
             setId(user?.uid)
             const dadosRole=localStorage.getItem("MinhaEscola")
             const dadoRole=dadosRole?.replace(/['"]+/g,'')
             console.log(dadoRole)
             if(dadoRole=="schoolUser"){
               navigate(ROUTE_ADMIN_PAGE.route)
             }
            }else{
              navigate(ROUTE_LOGIN_PAGE.route)
            }
      })
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


  useEffect(()=>{
    if(id){
      getUser(id).then((res)=>{
        setUser(res)
      })
    }
},[id])

const Logout=()=>{
   const auth = getAuth();
       signOut(auth).then(() => {
       }).catch((error) => {
    
         console.error("Erro ao fazer logout:", error);});
         localStorage.removeItem("MinhaEscola")
         navigate(ROUTE_LOGIN_PAGE.route)
}

  return(
     <Box 
     padding={1}
     height={"100vh"}
     display={"flex"} 
     bg={"blackAlpha.200"}
     flexDirection={"column"} 
     justifyContent={searchStart?"none":"center"}
     alignItems={"center"}
     gap={20}>
      
      <Box position={"absolute"}
        left={"90%"}
        top={"5%"}>
           <Menu>
                   <MenuButton>
                     <Avatar name={user?.name!}/>
                   </MenuButton>
                   <MenuList>
                     <MenuItem  onClick={()=>Logout()}
                      color={"red.300"} fontWeight={"medium"} 
                      >Logout</MenuItem>
                     
                   </MenuList>
                </Menu>
      
      </Box>

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
       
             <InputLeftElement>
               <Menu>
                   <MenuButton>
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
          bg={"white"}
          boxShadow={"0px 0px 2px 0px grey"}
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
             w="40%"
             bg="white"
             borderRadius="10px"
            
             _hover={{
                boxShadow:"0px 0px 3px 0px grey",
                transition:"1s"
             }}
             p={7}
             position="relative"
             overflow="hidden"
           >
             <Flex
                 flexDirection={"column"}
                 gap={2}
               >
                <Box display={"flex"} alignItems={"center"} gap={3}>
                 <Icon
                   as={FaUniversity}
                   color="green.600"
                   boxSize={6}
                 />
                 <Text color={"green.500"} fontWeight={"bold"}>{index.name}</Text>
                 </Box>
                 <Text>Saber Mais</Text>
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
             w="40%"
             bg="white"
             borderRadius="10px"
             _hover={{
                boxShadow:"0px 0px 3px 0px grey",
                transition:"2s",
                
             }}
             p={5}
             position="relative"
             overflow="hidden"
             
           >
             
               <Flex
                 justifyContent={"space-between"}
               >
                <Box display={"flex"} alignItems={"center"} gap={3}>
                 <Icon
                   as={FaUniversity}
                   color="green.600"
                   boxSize={6}
                 />
                 <Text color={"green.500"} fontWeight={"bold"}>{index.name}</Text>
                </Box> 
                 <Text
                 display={"flex"} alignItems={"center"} gap={2}
                  color={"grey"}>Mais detalhes <IoIosArrowRoundForward size={"24px"}
                  cursor={"pointer"}/></Text>
               </Flex>
       
           </Box>
            
          ))}
      </Box>




     </Box>
  )

}