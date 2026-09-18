import { Box,Flex,Text} from "@chakra-ui/react";
import {
    FiBook,
    FiGrid,
    FiSettings
} from "react-icons/fi";

import { BiLogOut } from "react-icons/bi";
import SidebarItem from "../components/menu/sideBarItem";
import { ROUTE_ADD_SCHOOL,ROUTE_ADMIN_PAGE,ROUTE_LOGIN_PAGE } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";


export default function Sidebar() {
    const navigate=useNavigate()

 const log_out=()=>{
    const auth = getAuth();
     signOut(auth).then(() => {
     }).catch((error) => {
  
       console.error("Erro ao fazer logout:", error);});
       localStorage.removeItem("MinhaEscola")
       navigate(ROUTE_LOGIN_PAGE.route)
   }
    return (

        <Flex
            w="260px"
            h="100vh"
            bg="white"
            borderRight="1px solid"
            borderColor="gray.200"
            direction="column"
            position={"fixed"}
            p={6}
        >

            {/* Logo */}

            <Box>

                <Text
                    fontSize="22px"
                    fontWeight="700"
                    color="brand.500"
                >
                    Minha
                </Text>

                <Text
                    fontWeight="700"
                    fontSize="20px"
                >
                    Escola
                </Text>

                <Text
                    mt={1}
                    color="gray.500"
                    fontSize="12px"
                >
                    District Administration
                </Text>

            </Box>

            {/* Menu */}

            <Flex
                direction="column"
                gap={2}
                mt={12}
            >

                <SidebarItem
                    icon={FiGrid}
                    title="Dashboard"
                     to={ROUTE_ADMIN_PAGE.route}                />

                <SidebarItem
                    icon={FiBook}
                    title="Adicionar Escola"
                    
                     to={ROUTE_ADD_SCHOOL.route}
                />

                
                <SidebarItem
                    icon={FiSettings}
                    title="Settings"
                     to={""}
                />

            </Flex>

            <Flex flex={1} />

              <Flex 
               alignItems={"center"}
               gap={3}
                h="46px"
                px={4}
                cursor="pointer"
                transition=".25s"
                bg={"red.500"}
                borderRadius="10px"
                color={"white"}
                onClick={()=>log_out()}
              ><BiLogOut size={30}/> <Text fontSize="14px"  fontWeight={500}>Sair</Text></Flex>
        </Flex>

    )

}