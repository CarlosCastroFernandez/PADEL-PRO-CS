export const findAdminByEmail=async (email,password)=>{
    console.log(email)
    console.log(password)
    try{
    const result= await fetch("http://localhost:3000/admin/findAdminByEmail",{
        method:"POST",
        headers:{
            ["Content-Type"]:"application/json"
        },
        body: JSON.stringify({
            email:email,
            password:password
        })
    });

    const res=await result.json();

    if (res!==null && res.status==="SUCCESS"){
        console.log(JSON.stringify(res.data))
        return res;

    }else{
        return undefined
    }

    }catch(e){
        console.log("MAL")
        return undefined;
    }
    
}