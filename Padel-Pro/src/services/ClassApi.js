export const hourAvaliable=async (id)=>{
    try{
    const result= await fetch("http://localhost:3000/class/getAllAvaliable/"+id,{
        method:"GET",
        headers:{
            ["Content-Type"]:"application/json"
        }
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
export const hourAvaliableDate=async (date,trainerId)=>{
    console.log("AQUI EL DATE: "+date)
    console.log("AQUI EL DATE: "+trainerId)
    try{
    const result= await fetch("http://localhost:3000/class/getAllAvaliableDate/"+date+"/"+trainerId,{
        method:"GET",
        headers:{
            ["Content-Type"]:"application/json"
        }
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
export const createClass=async (date,trainerId,listStudent)=>{
    try{
        const arrayHours=date.split("-");
        arrayHours[1]=arrayHours[1].includes("0")?arrayHours[1].replace("0",""):arrayHours[1];
        arrayHours[3]=arrayHours[3].replace(":00","");
        console.log(arrayHours)
        const horaUTC=  new Date(Date.UTC(Number(arrayHours[0]),Number(arrayHours[1]-1),Number(arrayHours[2]),Number(arrayHours[3]),0))
        horaUTC.toISOString();
        
    const result= await fetch("http://localhost:3000/class/createClass",{
        method:"POST",
        headers:{
            ["Content-Type"]:"application/json"
        },
            body: JSON.stringify({
            date:horaUTC,
            trainer:trainerId,
            students:listStudent
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

export const classesByStudents=async (studentId)=>{

    try{
    const result= await fetch("http://localhost:3000/class/getAllClassByStudent/"+studentId,{
        method:"GET",
        headers:{
            ["Content-Type"]:"application/json"
        }
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
export const classesByTrainer=async (trainerId)=>{

    try{
    const result= await fetch("http://localhost:3000/class/getAllClassByTrainer/"+trainerId,{
        method:"GET",
        headers:{
            ["Content-Type"]:"application/json"
        }
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
export const getAllClasses=async ()=>{

    try{
    const result= await fetch("http://localhost:3000/class/getAllClasses/",{
        method:"GET",
        headers:{
            ["Content-Type"]:"application/json"
        }
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

