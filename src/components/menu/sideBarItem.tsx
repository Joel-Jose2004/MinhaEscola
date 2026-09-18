import {Flex,Icon,Text,} from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarItemProps {
  icon: IconType;
  title: string;
  to: string;
  onClick?: () => void;
}

export default function SidebarItem({icon,title,to}: SidebarItemProps) {
   const location = useLocation();
    const navigate = useNavigate(); 
    const isActive = location.pathname === to; 

  return (
    <Flex
      align="center"
      gap={3}
      h="46px"
      px={4}
      borderRadius="10px"
      cursor="pointer"
      transition=".25s"
      bg={isActive ? "green.500" : "transparent"}
      color={isActive ? "white" : "gray.600"}
      _hover={{
        bg: isActive ? "brand.500" : "gray.100",
      }}
      onClick={()=>navigate(to)}
    >
      <Icon as={icon} boxSize={5} />

      <Text
        fontSize="14px"
        fontWeight={500}
      >
        {title}
      </Text>
    </Flex>
  );
}