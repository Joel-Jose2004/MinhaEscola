import { Button } from "@chakra-ui/react";

interface Props{

    children:React.ReactNode;
    save:()=>void

}

export default function PrimaryButton({ children ,save}:Props){

    return(

        <Button
            colorScheme="blue"
            borderRadius="12px"
            px={10}
            h="50px"
            onClick={()=>save()}
        >
            {children}

        </Button>

    )

}