import {
  HStack,
  Select,
} from "@chakra-ui/react";
import {FormControl, FormLabel} from "@chakra-ui/react";

interface CourseInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SelectInput({value,onChange}: CourseInputProps) {
  return (
    <HStack>
    <FormControl>
        <FormLabel
             fontWeight="600">
            Categoria
        </FormLabel>

        <Select
           value={value}
           onChange={(e) => onChange(e.target.value)}
           h="52px"
           borderRadius="12px"
           placeholder="Seleciona a categoria">
         <option value='medio'>Ensino Médio</option>
         <option value='superior'>Ensino Superior</option>
         
        </Select>
    </FormControl>   
      
    </HStack>
  );
}