import { Box, Spinner,  Textarea, Flex} from "@chakra-ui/react";
import { Text, Button,Modal, ModalContent, ModalBody,
        ModalOverlay, ModalHeader, Input,VStack} from '@chakra-ui/react'
import {  useState } from "react";
import { type instituteInterface } from "../Types/instituteType";
import {type hourInterface } from "../Types/instituteType";

interface props{
    isOpen:boolean,
    onClose:()=>void
    transferir:(dados:instituteInterface,meioSemana:hourInterface,finalSemana:hourInterface)=>void
}



export function SchoolDataModal({isOpen,onClose,transferir}:props){
  
  const [loader,setLoader]=useState(false)
  const [dados,setDados]=useState<instituteInterface>()
  const [getHora,setGetHora]=useState<hourInterface>()
  const [weekendHora,setWeekendHora]=useState<hourInterface>()

  
  
  const AdicionarCurso=()=>{
    transferir(dados as instituteInterface,getHora as hourInterface,weekendHora as hourInterface)
        onClose()
  }


    return(
        <Box>



         
    <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay/>
                 <ModalContent maxWidth={"80%"} padding={2}>
                    
                    <ModalHeader display={"flex"} justifyContent={"center"} color={"#031636"}
                    fontWeight={"bold"} fontSize={"larger"}>Dados adicionais</ModalHeader>
                    <ModalBody  w={"100"} display={"flex"} gap={10}>
                       <Box display={"none"} flexDirection={"column"} gap={5}>
                           <Box w={"100%"}>
                           <Text fontWeight={"normal"}>Missão</Text>
                             <Textarea 
                             name="description"
                             ></Textarea>
                            </Box>

                         <Box w={"100%"}>
                           <Text fontWeight={"normal"}>Valores</Text>
                             <Textarea 
                             name="description"
                             ></Textarea>
                            </Box>

                            <Box w={"100%"}>
                             <Text fontWeight={"normal"}>Visão</Text>
                             <Textarea 
                             name="description"
                              ></Textarea>
                            </Box>

                       </Box>
                       <Box width={"40%"}> 
                           
                          <VStack gap={5}>
                            

                        <Flex gap={5} w={"100%"}>
                            
                            <Box w={"100%"} gap={2}>
                              <Text fontWeight={"normal"}>Hora de atendimento</Text>
 
                              <Input 
                              type="time"  
                               name="time" 
                              onChange={(e)=>setGetHora(dados=>({...dados,inicio:e.target.value.trim()})as hourInterface)}
                               />
                                                         
                            </Box>

                            <Box w={"100%"} gap={2}>
                              <Text fontWeight={"normal"}>Hora de atendimento</Text>
                              <Box w={"100%"}
                               display={"flex"} gap={3}>

                              <Input 
                              type="time" 
                               name="time" 
                              onChange={(e)=>setGetHora(dados=>({...dados,fim:e.target.value})as hourInterface)}
                               />
                              </Box>
                    
                            </Box>


                        </Flex>

                        <Flex gap={5} w={"100%"}>
                          <Box w={"100%"}>
                            <Text fontWeight={"normal"}>Email</Text>
                            <Input type="email"
                              onChange={(e)=>setDados(dados=>({...dados,email:e.target.value})as instituteInterface)}
                             />     
                          </Box>

                         <Box w={"100%"}>
                            <Text fontWeight={"normal"}>Telefone</Text>
                            <Input type="text"
                             name="Telefone"
                             onChange={(e)=>setDados(dados=>({...dados,phone:e.target.value})as instituteInterface)}/>     
                          </Box>
                        </Flex>
                        
                        <Box w={"100%"}>
                           <Text fontWeight={"normal"}>Localização</Text>
                             <Textarea 
                             name="description"
                             onChange={(e)=>setDados(dados=>({...dados,location:e.target.value})as instituteInterface)}
                             ></Textarea>
                            </Box>

                        
                             <Flex w={"100%"} gap={5}>

                         <Button colorScheme="blue" variant={"outline"}
                         onClick={()=>(onClose(),
                          setLoader(false),
                          setDados({
                            email:"",
                            phone:"",
                            description:"",
                            location:""
                    
                          })
                         )}>
                             Cancelar
                            </Button>

                              <Button  w={"100%"}
                               onClick={AdicionarCurso}>
                               <Box display={loader ? "flex":"none"}><Spinner/></Box>
                                 {loader ? " ":"Finalizar"}</Button>
                              
                                 
                                 
                            </Flex>
                            
                            
                           </VStack>
                        </Box>

                        <Box
                         display={"flex"} gap={2} 
                         flexDirection={"column"}>
                           <Flex gap={5} w={"100%"}>
                            
                            <Box w={"100%"} gap={2}>
                              <Text fontWeight={"normal"}>Hora de atendimento</Text>
 
                              <Input 
                              type="time"  
                               name="time" 
                              onChange={(e)=>setWeekendHora(dados=>({...dados,inicio:e.target.value.trim()})as hourInterface)}
                               />
                                                         
                            </Box>

                            <Box w={"100%"} gap={2}>
                              <Text fontWeight={"normal"}>Hora de atendimento</Text>
                              <Box w={"100%"}
                               display={"flex"} gap={3}>

                              <Input 
                              type="time" 
                               name="time" 
                              onChange={(e)=>setWeekendHora(dados=>({...dados,fim:e.target.value})as hourInterface)}
                               />
                                
                              </Box>
                    
                            </Box>

                        </Flex>

                        <Box w={"100%"}>
                             <Text fontWeight={"normal"}>Detalhes sobre a instituição</Text>
                             <Textarea 
                             name="description"
                             height={"200px"}
                             onChange={(e)=>setDados(dados=>({...dados,description:e.target.value})as instituteInterface)}
                              ></Textarea>
                            </Box>
                        </Box>
                  </ModalBody>
               </ModalContent>
            </Modal>




        </Box>
    )
}