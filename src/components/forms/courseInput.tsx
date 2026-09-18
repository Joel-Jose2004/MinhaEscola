import {
  HStack,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

interface CourseInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export default function CourseInput({value,onChange, onAdd}: CourseInputProps) {
  return (
    <HStack>
      
      <Input
        placeholder="Digite o nome do curso"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        h="52px"
        borderRadius="12px"
      />

      <IconButton
        aria-label="Adicionar Curso"
        icon={<FiPlus />}
        colorScheme="blue"
        h="52px"
        w="52px"
        onClick={onAdd}
      />
    </HStack>
  );
}