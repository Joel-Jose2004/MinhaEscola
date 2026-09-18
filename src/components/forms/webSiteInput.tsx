import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement
} from "@chakra-ui/react";

import { FiGlobe } from "react-icons/fi";

interface props{
    value:string,
    onChange:(value:string)=>void
}

export default function WebsiteInput({value,onChange}:props){

    return(

        <FormControl>

            <FormLabel>

                Link Website

            </FormLabel>

            <InputGroup>

                <InputLeftElement>

                    <FiGlobe/>

                </InputLeftElement>

                <Input
                    h="52px"
                    placeholder="https://"
                    borderRadius="12px"
                    value={value}
                    onChange={(e)=>onChange(e.target.value)}
                />

            </InputGroup>

        </FormControl>

    )

}