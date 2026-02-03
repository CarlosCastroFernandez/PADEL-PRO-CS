export const createStudent=async (email,password,name,lastName)=>{
    try{
    const result= await fetch("http://localhost:3000/student/createStudent",{
        method:"POST",
        headers:{
            ["Content-Type"]:"application/json"
        },
        body: JSON.stringify({
            name:name,
            lastName:lastName,
            email:email,
            password:password
        })
    });

    const res=await result.json();

    if (res!==null && res.status==="SUCCESS"){
        console.log(JSON.stringify(res.data))
        return res.data;

    }

    }catch(e){
        console.log("MAL")
        return null;
    }
    
}
export const findStudentByEmail=async (email,password)=>{
    try{
    const result= await fetch("http://localhost:3000/student/findStudentByEmail",{
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
        return res.data;

    }else{
        return undefined
    }

    }catch(e){
        console.log("MAL")
        return undefined;
    }
    
}
export const getStudentByEmail=async (email)=>{
    try{
    const result= await fetch("http://localhost:3000/student/getStudentByEmail/"+email,{
        method:"GET",
        headers:{
            ["Content-Type"]:"application/json"
        }
    });

    const res=await result.json();

    if (res!==null && res.status==="SUCCESS"){
        console.log(JSON.stringify(res.data))
        return res.data;

    }else{
        return undefined
    }

    }catch(e){
        console.log("MAL")
        return undefined;
    }
    
}


export const modifyStudent=async (name,lastName,id)=>{
    console.log("ID: "+id);
    try{
    const result= await fetch("http://localhost:3000/student/modifyStudentById",{
        method:"POST",
        headers:{
            ["Content-Type"]:"application/json"
        },
        body:JSON.stringify({
            name:name,
            lastName:lastName,
            studentId:id
        })
    });

    const res=await result.json();

    if (res!==null && res.status==="SUCCESS"){
        console.log(JSON.stringify(res.data))
        return res.data;

    }else{
        return res.message;
    }

    }catch(e){
        console.log("MAL")
        return undefined;
    }
    
}






