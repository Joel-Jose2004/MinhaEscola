import {
    FormControl,
    FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";

interface CourseInputProps {
  value: string;
  onChange: (value: string) => void;
 
}

export default function CourseInputColor({value,onChange}: CourseInputProps) {
  return (
    <HStack>
            <FormControl>
        
        <FormLabel>
            Link Website
        </FormLabel>
        
      
      <Input
      type="color"
        value={value}
        width={"100px"}
        onChange={(e) => onChange(e.target.value)}
        h="52px"
        borderRadius="12px"
      /></FormControl>
    </HStack>
  );
}