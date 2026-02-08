export const createTrainer=async (email,password,name,lastName,description,price,sex,experience)=>{
    console.log(email+" "+password + name+" "+lastName + description+" "+price+ sex+" "+experience)
    try{
    const result= await fetch("http://localhost:3000/trainer/createTrainer",{
        method:"POST",
        headers:{
            ["Content-Type"]:"application/json",
            ["auth-token"]:sessionStorage.getItem("token")
        },
        body: JSON.stringify({
            name:name,
            lastName:lastName,
            email:email,
            password:password,
            description:description,
            priceByClass:price,
            sex:sex,
            experienceYears:experience
        })
    });

    const res=await result.json();

    if (res!==null && res.status==="SUCCESS"){
        console.log(JSON.stringify(res.data))
        return res.data;

    }else if(res!==null && res.status==="EXPIRED"){
        return res;
    }

    }catch(e){
        console.log("MAL")
        return null;
    }
    
}
export const findTrainerByEmail=async (email,password)=>{
    try{
    const result= await fetch("http://localhost:3000/trainer/findTrainerByEmail",{
        method:"POST",
        headers:{
            ["Content-Type"]:"application/json",
           
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

    }else {
        return res;
    }

    }catch(e){
        console.log("MAL")
        return undefined;
    }
    
}
export const getAllTrainer=async ()=>{
    try{
    const result= await fetch("http://localhost:3000/trainer/getAllTrainers",{
        method:"GET",
        headers:{
            ["Content-Type"]:"application/json"
        },
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




