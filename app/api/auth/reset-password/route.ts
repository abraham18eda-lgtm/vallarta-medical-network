import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"


export async function POST(req:Request){

try{

const {
 token,
 password
}=await req.json()



const reset =
await prisma.passwordResetToken.findUnique({
where:{
 token
}
})



if(!reset){

return NextResponse.json(
{
error:"Token inválido"
},
{
status:400
}
)

}



if(reset.expiresAt < new Date()){

return NextResponse.json(
{
error:"Token expirado"
},
{
status:400
}
)

}



const hashed =
await bcrypt.hash(password,10)



await prisma.user.update({

where:{
id:reset.userId
},

data:{
password:hashed
}

})



await prisma.passwordResetToken.delete({

where:{
id:reset.id
}

})



return NextResponse.json({
ok:true
})


}catch(error){

console.error(error)

return NextResponse.json(
{
error:"Error actualizando contraseña"
},
{
status:500
}
)

}


}