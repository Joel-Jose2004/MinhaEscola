import { Button } from "@chakra-ui/react";

interface Props{

    children:React.ReactNode;
    cancel:()=>void

}

export default function SecondaryButton({children,cancel}:Props){

    return(

        <Button

            variant="ghost"

            h="50px"
          onClick={cancel}
        >

            {children}

        </Button>

    )

}