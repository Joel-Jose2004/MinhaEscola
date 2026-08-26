import {Box, ChakraProvider} from "@chakra-ui/react"
import { HomePage } from "./page/homePage"

function App() {

  return (
    <ChakraProvider >
      <Box>
        <HomePage/>
      </Box>
    </ChakraProvider>
  )
}

export default App
