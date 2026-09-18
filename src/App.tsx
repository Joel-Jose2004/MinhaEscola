import { ChakraProvider} from "@chakra-ui/react"
import { HomePage } from "./page/homePage"
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import { ROUTE_LOGIN_PAGE,ROUTE_HOME_PAGE,ROUTE_ADMIN_PAGE,ROUTE_ADD_SCHOOL,
  ROUTE_VIEW,ROUTE_CREATE_ACCOUNT
 } from "./utils/constants"
import { AdminPage } from "./page/admin/adminPage"
import { Login } from "./page/login";
import AddSchool from "./page/admin/addSchool";
import { ViewPage } from "./page/admin/viewTemplate";
import { useState } from "react";
import { CreateUser } from "./page/createAccount";
import type { UniversityType } from "./Types/universityInterface";


function App() {
const [dados,setDados]=useState<UniversityType>()


const route=createBrowserRouter([
  {
    path:ROUTE_ADMIN_PAGE.route,
    element:<AdminPage
    transfer={(insitute)=>setDados(insitute)}/>

},{
  path:ROUTE_LOGIN_PAGE.route,
  element:<Login/>
},{
  path:ROUTE_HOME_PAGE.route,
  element:<HomePage
   transfer={(dados)=>setDados(dados)}/>
},{
  path:ROUTE_CREATE_ACCOUNT.route,
  element:<CreateUser/>
},{
  path:ROUTE_ADD_SCHOOL.route,
  element:<AddSchool/>
},{
  path:ROUTE_VIEW.route,
  element:<ViewPage
       institute={dados!}/>
}
])

  return (
    <ChakraProvider >
      <RouterProvider router={route}/>
    </ChakraProvider>
  )
}

export default App
