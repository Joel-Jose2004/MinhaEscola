import {
    Input,
    InputGroup,
    InputLeftElement
} from "@chakra-ui/react";

import { FiSearch } from "react-icons/fi";

interface Props{
    placeholder?:string;
}

export default function SearchInput({
    placeholder="Pesquisar..."
}:Props){

    return(

        <InputGroup maxW="420px">

            <InputLeftElement pointerEvents="none">

                <FiSearch color="#94A3B8"/>

            </InputLeftElement>

            <Input
                placeholder={placeholder}
                bg="white"
                borderRadius="12px"
                borderColor="gray.200"
                _focus={{
                    borderColor:"brand.500",
                    boxShadow:"0 0 0 1px #315EFB"
                }}
            />

        </InputGroup>

    )

}