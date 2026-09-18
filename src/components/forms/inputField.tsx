import {
    FormControl,
    FormLabel,
    Input
} from "@chakra-ui/react";

interface Props{
    label:string;
    value:string;
    onChange:(value:string)=>void
    placeholder:string;
}

export default function InputField({label,onChange,value,placeholder}:Props){

    return(

        <FormControl>

            <FormLabel
                fontWeight="600"
            >
                {label}
            </FormLabel>

            <Input
                placeholder={placeholder}
                h="52px"
                borderRadius="12px"
                borderColor="gray.200"
                _focus={{

                    borderColor:"brand.500",

                    boxShadow:"0 0 0 1px #315EFB"

                }}
                value={value}
               onChange={(e)=>onChange(e.target.value)} 

            />

        </FormControl>

    )

}