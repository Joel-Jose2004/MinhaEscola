import { Box, HStack, Icon,Flex,Tag,Text, Select, Link,Button, Stack, Heading } from "@chakra-ui/react"
import DashboardLayout from "../../layout/dashBoardLayout"
import { useEffect, useState } from "react"
import { UseAdminRepository } from "../../repository/useAdminRepository"
import { FiHome, FiMapPin, FiStar } from "react-icons/fi"
import CardContainer from "../../components/cards/cardContainer"
import DynamicCourseList from "../../components/forms/dinamicCourseList"
import SecondaryButton from "../../components/buttons/secondButton"
import PrimaryButton from "../../components/buttons/primaryButton"
import InputField from "../../components/forms/inputField"
import WebsiteInput from "../../components/forms/webSiteInput"
import CourseInput from "../../components/forms/courseInput"
import { onAuthStateChanged } from "firebase/auth"
import {auth} from "../../firebase/firebaseAuth"
import { useNavigate } from "react-router-dom"
import { ROUTE_HOME_PAGE, ROUTE_LOGIN_PAGE, ROUTE_VIEW } from "../../utils/constants"
import { useDataRepository } from "../../repository/useDataRepository"
import type { userInterface } from "../../Types/userType"
import type { UniversityType } from "../../Types/universityInterface"


interface props{
   transfer:(institute:UniversityType)=>void
}

export function AdminPage({transfer}:props) {
const [id,setId]=useState("")
const navigate=useNavigate()
const [user,setUser]=useState<userInterface>()
const getUser=useDataRepository(state=>state.getUser)
const getUni=UseAdminRepository(state=>state.getUniversities)
const getSchool=UseAdminRepository(state=>state.getSchools)
const listSchool=UseAdminRepository(state=>state.listSchool)
const listUni=UseAdminRepository(state=>state.listUni)
const [uni,setUni]=useState(true)
const [med,setMed]=useState(false)
const [upDateCard,setUpDateCard]=useState(false)

const [course, setCourse] = useState("");
const [courseName,setCourseName]=useState("");
const [webSiteName,setWebSiteName]=useState("");

const [courses, setCourses] = useState<string[]>([]);
 const changeToMe=()=>{
    setUni(false)
    setMed(true)
 }

 const changeToUni=()=>{
  setMed(false)
  setUni(true)
 }
const Editar=(name:string,link:string,courses:string[])=>{
  setCourses(courses)
  setCourseName(name)
  setWebSiteName(link)
  setUpDateCard(true)
}

const handleAddCourse = () => {

    if (!course.trim()) return;

    if (courses.includes(course.trim())) return;

    setCourses([...courses, course.trim()]);

    setCourse("");

};

const ActualizarData=()=>{
   setCourseName("")
   setCourse("")
   setWebSiteName("")
   
  setCourses([])
}


const Previsualizar=(index:UniversityType)=>{
    
transfer(index)
    navigate(ROUTE_VIEW.route)
}

const removeCourse = (index:number)=>{
    setCourses(
        courses.filter((_,i)=>i!==index)
    );

}


const CancelUpDate=()=>{
   setUpDateCard(false)
}

useEffect(() => {
    verificar()
    
 },[]);


 const verificar=()=>{
    
   onAuthStateChanged(auth,(user)=>{
      if(user?.uid){
          setId(user?.uid)
          const dadosRole=localStorage.getItem("MinhaEscola")
          const dadoRole=dadosRole?.replace(/['"]+/g,'')
          if(dadoRole=="user"){
            navigate(ROUTE_HOME_PAGE.route)
          }
         }else{
          navigate(ROUTE_LOGIN_PAGE.route)
         }
        
   })
}

useEffect(()=>{
    if(id){
      getUser(id).then((res)=>{
        setUser(res)
      })
      getSchool(id)
      getUni(id)
    }
},[id])

  
  return (
    <Box>
        <DashboardLayout name={user?.name!}> 
           <Box display={upDateCard?"flex":"none"} bg={"white"} width={"100%"} flexWrap={"wrap"} gap={7}
            padding={5}>
               <Box width={"100%"}>
                    
                       <Heading     
                           size="lg"
                           mb={8}
                       >
      
                           Actualizar Escola
      
                       </Heading>
                </Box>
              
               <CardContainer>
              
      
                       <Stack spacing={6}>
      
                           <InputField
                               label="Nome da Escola"
                               placeholder="Digite o nome"
                               value={courseName}
                                onChange={setCourseName}/>
      
                           <WebsiteInput 
                            value={webSiteName}
                            onChange={setWebSiteName}/>
      
      
                           <CourseInput 
                               value={course}
                               onChange={setCourse}
                               onAdd={handleAddCourse}
                              />

                           <Box
                           height={"150px"}
                           overflowY={"scroll"}>

                              <DynamicCourseList
                                courses={courses}
                                removeCourse={removeCourse}
                            />
                          </Box>
                  
                            
                       </Stack>
      
                       <HStack
                           justify="end"
                           mt={10}
                       >
      
                           <SecondaryButton cancel={()=>CancelUpDate()}>
                               Cancelar
                           </SecondaryButton>
      
                           <PrimaryButton save={()=>ActualizarData()}>
                               Actualizar Escola
                           </PrimaryButton>
      
                       </HStack>
      
                   </CardContainer> 
                 
                   
           </Box>

          <Box width={"100%"} bg={"white"} padding={5}
            display={upDateCard?"none":"flex"} flexDirection={"column"} gap={5} borderRadius={5}>
              <Box display={"flex"} gap={5}>
                <Button colorScheme="purple" onClick={changeToUni}>Universidade</Button>
                <Button colorScheme="purple" onClick={changeToMe}>Escola</Button>
              </Box>


          <Box display={uni?"flex":"none"} width={"100%"} gap={5}>
          {listUni.map((index,item)=>(
                 
        <Box 
            key={item}
             w="400px"
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
                 <Text>{}</Text>
               </HStack>
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
                 CURSOS
               </Text>
                 <Select>
                  {index.courses.map(index=>(
                    <option value={index}>
                    {index}</option>
                  ))}
                   
                </Select>
                 
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
               flexWrap={"wrap"}
             >
              <Button onClick={()=>Previsualizar(index)}>Preview</Button>

               <Button colorScheme="green" onClick={()=>Editar(index.name,index.link,index.courses)}>
                    Editar</Button>
             </Flex>
           </Box>
          ))}
            </Box>

            <Box display={med?"flex":"none"} width={"100%"}>
          {listSchool.map((index,item)=>(
                 
        <Box 
            key={item}
             w="400px"
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
                 <Text>{}</Text>
               </HStack>
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
                 CURSOS
               </Text>
                 <Select>
                  {index.courses.map(index=>(
                    <option value={index}>
                    {index}</option>
                  ))}
                   
                </Select>
                 
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
                 Nosso website
               </Text>
       
               <HStack
                 color="green.600"
                 fontWeight="700"
                 cursor="pointer"
               >

                 <Link >Site</Link>
               </HStack>
             </Flex>
           </Box>
          ))}
            </Box>
            
        </Box>
        
    </DashboardLayout>
          
    </Box>
  )

}