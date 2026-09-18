import {
    Box,
    Flex,
    Heading,
    IconButton,
    Spacer
} from "@chakra-ui/react";

import {
    FiBell,
    FiHelpCircle
} from "react-icons/fi";

import SearchInput from "../components/search/searchInput";
import UserAvatar from "../components/avatar/userAvatar";

interface props{
    Name:string
}

export default function Topbar({Name}:props){

    return(

        <Flex
            h="85px"
            bg="white"
            px={8}
            align="center"
            borderBottom="1px solid"
            borderColor="gray.200"
        >

            <Heading
                size="md"
                color="gray.700"
            >
              MinhaEscola Admin
            </Heading>

            <Spacer/>

            <Box
             display={{base:"none",lg:"flex"}}><SearchInput/></Box>

            <Flex
                ml={6}
                gap={2}
            >

                <IconButton
                    aria-label="Notificações"
                    icon={<FiBell/>}
                    variant="ghost"
                    borderRadius="full"
                />

                <IconButton
                    aria-label="Ajuda"
                    icon={<FiHelpCircle/>}
                    variant="ghost"
                    borderRadius="full"
                />

            </Flex>

            <Flex ml={5}>

                <UserAvatar name={Name}/>

            </Flex>

        </Flex>

    )

}