import { Box } from "@chakra-ui/react";

interface Props{
    children:React.ReactNode;
}

export default function CardContainer({
    children
}:Props){

    return(

        <Box
            bg="white"
            borderRadius="20px"
            p={8}
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
            w="100%"
            maxW="1200px"
            overflowX={"auto"}
        >

            {children}

        </Box>

    )

}