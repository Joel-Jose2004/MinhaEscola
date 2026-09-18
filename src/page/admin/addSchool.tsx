import {  Heading, Stack,  HStack, useDisclosure, Button, Flex, Box, Input, Img} from "@chakra-ui/react";
import DashboardLayout from "../../layout/dashBoardLayout";
import CardContainer from "../../components/cards/cardContainer";
import InputField from "../../components/forms/inputField";
import WebsiteInput from "../../components/forms/webSiteInput";
import PrimaryButton from "../../components/buttons/primaryButton";
import CourseInput from "../../components/forms/courseInput";
import DynamicCourseList from "../../components/forms/dinamicCourseList";
import { useEffect, useState } from "react";
import { UseAdminRepository } from "../../repository/useAdminRepository";
import SelectInput from "../../components/forms/selectInput";
import { useNavigate } from "react-router-dom";
import { SchoolDataModal } from "../../components/schoolDataModal";
import type { hourInterface, instituteInterface } from "../../Types/instituteType";
import { ROUTE_HOME_PAGE, ROUTE_LOGIN_PAGE} from "../../utils/constants";
import type { userInterface } from "../../Types/userType";
import { useDataRepository } from "../../repository/useDataRepository";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../../firebase/firebaseAuth"
import { GiPhotoCamera } from "react-icons/gi";
import {  upload } from "@vercel/blob/client";




export default function AddSchool(){
const [course, setCourse] = useState("");
const [courseName,setCourseName]=useState("");
const {isOpen,onOpen,onClose}=useDisclosure()
const [webSiteName,setWebSiteName]=useState("");
const [category,setCategory]=useState("");
const [courses, setCourses] = useState<string[]>([]);
const [id,setId]=useState("")
const [user,setUser]=useState<userInterface>()
const getUser=useDataRepository(state=>state.getUser)
const navigate=useNavigate()
const addSchool=UseAdminRepository(state=>state.addSchool)
const [dados,setDados]=useState<instituteInterface>()
const [getHora,setGetHora]=useState<hourInterface>()
const [weekendHora,setWeekendHora]=useState<hourInterface>()
const [imagem,setImagem]=useState<File>()
  


useEffect(() => {
    verificar()
    
 },[]);


  const handleImagem=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const file=e.target.files?.[0]
      setImagem(file)
  }

  const handleAddCourse = () => {

    if (!course.trim()) return;

    if (courses.includes(course.trim())) return;

    setCourses([...courses, course.trim()]);

    setCourse("");

 };

 const AdicionarDados=()=>{
     onOpen()
 }


const uploadImage = async (file: File) => {
  const blob = await upload(file.name, file, {
    access: "public",
    handleUploadUrl: "/api/upload",
  });

  return blob.url;
};

const SaveData=async()=>{
        
     const url = await uploadImage(imagem!);

    
    addSchool(
    url,    
    dados as instituteInterface,
    getHora as hourInterface,
    weekendHora as hourInterface,
    courseName,
    webSiteName,
    category,
    courses,
    id)
}



const removeCourse = (index:number)=>{
    setCourses(
        courses.filter((_,i)=>i!==index)
    );

}



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
    }
},[id])

  

    return(

        <DashboardLayout name={user?.name!}>

            <CardContainer>

                <Heading

                    size="lg"

                    mb={8}

                >

                    Adicionar Nova Escola 

                </Heading>
                
               <Flex justifyContent={"space-between"}
                 > 
                <Stack spacing={6}  width={"40%"}>

                    <InputField
                        label="Nome da Escola"
                        placeholder="Digite o nome"
                        value={courseName}
                         onChange={setCourseName}                     />
                         

                    <WebsiteInput 
                     value={webSiteName}
                     onChange={setWebSiteName}/>

                     <SelectInput value={category} onChange={setCategory}/>

                    <CourseInput 
                        value={course}
                        onChange={setCourse}
                        onAdd={handleAddCourse}
                       />
                      
                     <DynamicCourseList
                         courses={courses}
                         removeCourse={removeCourse}
                     />
                </Stack>

                  <Box  
                         border={"1px dashed #735c00"}
                        width={"40%"}>
                            {imagem ?(
                                <Img src={URL.createObjectURL(imagem)} height={"100%"}/>
                             ):(
                             <Box 
                             display={"flex"} justifyContent={"center"}
                             alignItems={"center"}
                             height={"100%"} position={"relative"}><GiPhotoCamera size={40}/></Box>

                             )}

                           <Input type="file" height={"85%"} position={"absolute"}
                           width={"37%"} 
                            opacity={"0%"} cursor={"pointer"} top={"13%"}
                             accept="image/*"
                             onChange={handleImagem}/>
                             
                     </Box>
                </Flex>

                <HStack
                    justify="end"
                    mt={10}
                >
                    <Button onClick={()=>AdicionarDados()}>Adicionar dados</Button>
             
                    <PrimaryButton save={()=>SaveData()}>
                        Salvar Escola
                    </PrimaryButton>

                </HStack>

            </CardContainer>
            <SchoolDataModal
            isOpen={isOpen}
            onClose={onClose}
            transferir={(dados,meio,final)=>(
              setDados(dados),
              setGetHora(meio),
              setWeekendHora(final)
            )}/>
        </DashboardLayout>
   
    )

}