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