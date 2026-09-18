import {
    Avatar,
    Flex,
    Text
} from "@chakra-ui/react";

interface props{
    name:string
}

export default function UserAvatar({name}:props){

    return(

        <Flex
            align="center"
            gap={3}
            cursor="pointer"
        >

            <Avatar
                size="sm"
                name={name}
            />

            <Flex
                direction="column"
            >

                <Text
                    fontWeight="600"
                    fontSize="14px"
                >
                    {name}
                </Text>

                <Text
                    fontSize="12px"
                    color="gray.500"
                    display={{base:"none",lg:"flex"}}
                >
                    Administrador
                </Text>

            </Flex>

        </Flex>

    )

}