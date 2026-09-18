import {
  Badge,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";

import { FiTrash2 } from "react-icons/fi";

interface Props {
  courses: string[];
  removeCourse: (index: number) => void;
}

export default function DynamicCourseList({courses,removeCourse,}: Props) {
  return (
    <VStack
      mt={5}
      spacing={3}
      align="stretch"
      
    >
      {courses.map((course, index) => (
        <HStack
          key={index}
          justify="space-between"
          bg="gray.50"
          p={4}
          borderRadius="12px"
        >
          <HStack>
            <Badge colorScheme="green">
              Curso
            </Badge>

            <Text>{course}</Text>
          </HStack>

          <IconButton
            aria-label="Excluir"
            icon={<FiTrash2 />}
            size="sm"
            colorScheme="red"
            variant="ghost"
            onClick={() => removeCourse(index)}
          />
        </HStack>
      ))}
    </VStack>
  );
}