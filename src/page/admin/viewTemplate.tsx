import { Box,Flex,Link,Text } from "@chakra-ui/react"
import imagem from "../../assets/cemu.jfif"
import { CiLocationOn } from "react-icons/ci"
import { TfiEmail } from "react-icons/tfi"
import { IoCallOutline } from "react-icons/io5"
import type { UniversityType } from "../../Types/universityInterface"


interface props{
    institute:UniversityType
}

export function ViewTemplate({institute}:props){

    return(
        <>
        <Box>

         <Box  backgroundImage={imagem} backgroundRepeat={"no-repeat"}
         backgroundSize={"cover"}
          height={"400px"}></Box> 


        <Box backgroundColor={"whiteAlpha.700"}
            padding={"50px"}
            display={"flex"}
            flexDirection={"column"}
            gap={7}>
                 <Text
                  fontWeight={"bold"}
                  fontFamily={"arial"}
                  fontSize={"30px"}
                  width={"100%"}
                   display={"flex"} 
                   justifyContent={"center"}>Cursos em Destaques</Text>
                
                <Flex gap={5}
                 flexWrap={"wrap"}
                 justifyContent={"center"}>
                {institute.courses?.map(index=>(
                    <Box 
                    width={{base:"60%",md:"40%",lg:"20%"}}
                    display={"flex"}
                    alignItems={"center"}
                    boxShadow={"0px 0px 2px 0px blue"}
                    justifyContent={"center"}
                     backgroundColor={"white"}
                     height={"120px"}
                     borderRadius={"10px"}
                     fontFamily={"arial"}
                     fontWeight={"medium"}
                     fontSize={"17px"}
                     color={"blackAlpha.800"}
                     >{index}</Box>
                ))}
                </Flex>
                    
            </Box>

          
          <Box backgroundColor={"blue"}
             color={"white"}
             padding={"50px"}
             display={"flex"}
             flexDirection={"column"}
             gap={9}>
                 <Text
                  fontWeight={"bold"}
                  fontFamily={"arial"}
                  fontSize={"30px"}
                  width={"100%"}
                   display={"flex"} 
                   justifyContent={"center"}>Todos os Contactos</Text>
                
                <Flex 
                  justifyContent={"space-between"}
                  flexDirection={{base:"column",lg:"row"}}
                  gap={5}
                 >
                   <Box
                    width={{base:"100%",lg:"40%"}}
                    display={"flex"}
                    flexDirection={"column"}
                    padding={5}
                    gap={3}
                    boxShadow={"0px 0px 2px 0px white"}
                    justifyContent={"center"}
                    height={"200px"}
                    backdropFilter={"auto"} backdropBlur={"25%"}
                    bg={"rgba(255, 255, 255, 0.2)"}
                    borderRadius={"10px"}
                    fontFamily={"arial"}
                    fontWeight={"bold"}
                    fontSize={"17px"}>
                       <Box>
                         <Text>E-mail institucional</Text>
                         <Text>{institute?.email}</Text>
                      </Box>

                      <Box>
                      <Text>Horários de Atendimento</Text>
                      <Box display={"flex"}>
                         <Text color={"whiteAlpha.800"}>Segunda a Sexta</Text> : <Text>
                            {institute.mondayToFriday?.inicio} ás
                             {institute.mondayToFriday?.fim}</Text>  
                      </Box>

                      <Box display={"flex"}>
                         <Text color={"whiteAlpha.800"}>Sábado</Text> : <Text>
                            {institute.saturday?.inicio} ás {institute.saturday?.fim}</Text>  
                      </Box>

                   </Box>

               </Box>
                  

                   <Box
                   width={{base:"100%",lg:"40%"}}
                    display={"flex"}
                    alignItems={"center"}
                    boxShadow={"0px 0px 2px 0px white"}
                    justifyContent={"center"}
                     height={"200px"}
                     borderRadius={"10px"}
                     fontFamily={"arial"}
                     fontWeight={"bold"}
                     fontSize={"17px"}>
                      <Link href="https://share.google/kRKXurxgDOU2VM2xd" >
                      <Text><CiLocationOn size={"20px"} color="#735c00" />
                      {institute?.location}</Text>
                      </Link>
                   </Box>
                </Flex>

              {!institute?.link?(
               <>
               </>
              ):(
               <Box
                    padding={5}
                    gap={3}
                    boxShadow={"0px 0px 2px 0px white"}
                    justifyContent={"center"}
                    height={"100px"}
                    width={{base:"100%",lg:"40%"}}
                    backdropFilter={"auto"} backdropBlur={"25%"}
                    bg={"rgba(255, 255, 255, 0.2)"}>
                 <Text
                  fontWeight={"bold"}>Site oficial</Text>
                 <Link href="">{
                 institute?.link}</Link>
               </Box>
              )}
                    
            </Box>
 

     <Flex bg={"#e7eeff"} flexWrap={"wrap"} justifyContent={"space-around"} padding={10}
        flexDirection={{base:"column",lg:"row"}}>
        <Box width={{base:"100%",lg:"20%"}} display={"flex"} flexDirection={"column"} gap={3}>
          <Text fontSize={"20px"} color={"#031636"} fontWeight={"bold"}>MinhaEscola</Text>
           A sua escola se encontra aqui.
        </Box>

        
        <Box display={"flex"} flexDirection={"column"} gap={3}>
           <Text color={"#031636"}>Contato</Text>
           <Box display={"flex"} flexDirection={"column"} gap={2}>
            
             <Text display={"flex"} alignItems={"center"} gap={2}>
              <TfiEmail size={"20px"} color="#735c00" />{
              institute?.email}</Text>
             <Text display={"flex"} alignItems={"center"} gap={2}>
              <IoCallOutline size={"20px"} color="#735c00" />{institute?.phone}</Text>
           </Box>
           
        </Box>
        <Box width={"100%"} fontSize={"18px"} color={"grey"}
         display={"flex"} justifyContent={"center"} padding={3}>
        © 2026 MinhaEscola. Todos os direitos reservados.
        </Box>
       </Flex>

        </Box>
        </>
    )
}