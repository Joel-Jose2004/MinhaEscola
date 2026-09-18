import {create} from "zustand"
import AuthDao from "../databases/AuthDao";
import { UserDao } from "../databases/userDao";
import type { userInterface } from "../Types/userType";

interface actions{
   login:(email:string,password:string)=>Promise<string>,
   createAccount:(userData:userInterface,password:string)=>Promise<string>
   verify:(email:string)=>Promise<void>
   
}


 const calcularIdade = (data: string) => {
    const hoje = new Date();
    const nascimento = new Date(data);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();

    if (
      mesAtual < mesNascimento ||
      (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())
    ) {
      idade--;
    }

    return idade;
  };


export const useAuthRepository=create<actions>(()=>({


createAccount(userData,password) {
  
 const idade = calcularIdade(userData!.date_born);
 return new Promise((resolve,reject)=>{
   if(userData.name ===""){
       reject("Digite o seu nome")
   }else if(userData.phone.length !==9 || userData.phone === ""){
    reject("O número deve ter 9 dígitos")
   }
   else if(userData.email ===""){
     reject("Digite o seu email")
   }else if(userData.date_born ===""){
      reject("Digite a data de nascimento")
   }else if(idade <18){
    reject("Usuário menor de idade")
   }else{
    
     AuthDao.shared.createDonor(userData,password).then(async()=>{
        resolve("Conta Criada com sucesso")
       
     }).catch((error)=>{
      
    const errorCode = error.code;
    const errorMessage = error.message;
  
    if (errorCode === 'auth/email-already-in-use') {
     reject("Este e-mail já está em uso.")                   
                
    } else if (errorCode === 'auth/invalid-email') {
      reject("E-mail inválido.")

    } else if (errorCode === 'auth/weak-password') {

        reject("A senha deve ter pelo menos 6 caracteres.")
    } else {
            reject(`Erro desconhecido: ${errorMessage}. Tente novamente.`)
          
     }
    
   })
}
  
 })
},

login:async(email,password):Promise<string>=>{

 try {

    await AuthDao.shared.SignIn(email, password);

    try {
      const dados=await UserDao.shared.getUserByEmail(email)
      
      if(dados?.role=="schoolUser"){
        return "/AdminPage"
      }{
        return "/HomePage"
      }

    } catch (error) {

      if (
        error instanceof Error &&
        error.message !== "USER_NOT_FOUND"
      ) {
        throw error;
      }
    }


    throw new Error("PROFILE_NOT_FOUND");

  } catch (error) {


    throw error;
  }


},
verify:async(email):Promise<void> =>{
    try{
       AuthDao.shared.checkEmail(email).then((userRecord)=>{
         console.log(userRecord)
       })
       
    }catch(error){
     console.log("Erro ao verificar email")
    }
}
}))