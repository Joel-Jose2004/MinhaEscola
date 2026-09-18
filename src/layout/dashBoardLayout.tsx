import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./sideBar";
import Topbar from "./topBar";


interface Props {
    children: React.ReactNode;
    name:string,
}

export default function DashboardLayout({children,name}: Props) {
 

    return (

        <Flex
            maxH="100vh"
            bg="background"
        >
           <Box display={{base:"none",lg:"flex"}}>
            <Sidebar/> 
          </Box>
          
            <Flex
                flex="1"
                direction="column"
                width={"80%"}
                position={"absolute"}
                left={{base:"1px",lg:"260px"}}
            >

                <Topbar Name={name} />

                <Flex
                    flex="1"
                    p={8}
                    bg={"blackAlpha.200"}
                    width={{base:"124%",lg:"100%"}}
                >
                    {children}
                </Flex>
             
            </Flex>

        </Flex>

    )

}