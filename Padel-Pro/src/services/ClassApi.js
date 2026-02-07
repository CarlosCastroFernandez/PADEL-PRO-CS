import { getNewToken } from "./TokenRefres";

export const hourAvaliable = async (id) => {
  try {
    const result = await fetch(
      "http://localhost:3000/class/getAllAvaliable/" + id,
      {
        method: "GET",
        headers: {
          ["Content-Type"]: "application/json",
        },
      },
    );

    const res = await result.json();

    if (res !== null && res.status === "SUCCESS") {
      console.log(JSON.stringify(res.data));
      return res.data;
    }
  } catch (e) {
    console.log("MAL");
    return null;
  }
};
export const hourAvaliableDate = async (date, trainerId) => {
  console.log("AQUI EL DATE: " + trainerId);
  let parts = date.split("-"); // ["2026", "02", "4"]
  if (Number(parts[2]) < 10) {
    parts[2] = parts[2].padStart(2, "0"); // "4" -> "04"
  }
  date = parts.join("-"); // "2
  console.log("AQUI EL DATE: " + date);

  try {
    const result = await fetch(
      "http://localhost:3000/class/getAllAvaliableDate/" +
        date +
        "/" +
        trainerId,
      {
        method: "GET",
        headers: {
          ["Content-Type"]: "application/json",
        },
      },
    );

    const res = await result.json();

    if (res !== null && res.status === "SUCCESS") {
      console.log(JSON.stringify(res.data));
      return res.data;
    }
  } catch (e) {
    console.log("MAL");
    return null;
  }
};
export const createClass = async (date, trainerId, listStudent) => {
  try {
    /*let horaUTC;
        if (!date.includes("T")){
        const arrayHours=date.split("-");
        arrayHours[1]=arrayHours[1].includes("0")?arrayHours[1].replace("0",""):arrayHours[1];
        arrayHours[3]=arrayHours[3].replace(":00","");
        console.log(arrayHours)
         horaUTC=  new Date(Date.UTC(Number(arrayHours[0]),Number(arrayHours[1]-1),Number(arrayHours[2]),Number(arrayHours[3]),0))
        horaUTC.toISOString();
        }else{
            horaUTC=new Date(date).toISOString();
        }*/

    const result = await fetch("http://localhost:3000/class/createClass", {
      method: "POST",
      headers: {
        ["Content-Type"]: "application/json",
        ["auth-token"]:sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        date: date,
        trainer: trainerId,
        students: listStudent,
      }),
    });

    const res = await result.json();
    console.log(JSON.stringify(res.data));
    if (res !== null && res.status === "SUCCESS") {
      console.log(JSON.stringify(res.data));
      return res.data;
    } else if (res!==null && res.status==="EXPIRED"){
      return res.data;
    }
  } catch (e) {
    console.log("MAL " + e);
    return null;
  }
};

export const classesByStudents = async (studentId) => {
  try {
    const result = await fetch(
      "http://localhost:3000/class/getAllClassByStudent/" + studentId,
      {
        method: "GET",
        headers: {
          ["Content-Type"]: "application/json",
        },
      },
    );

    const res = await result.json();

    if (res !== null && res.status === "SUCCESS") {
      console.log(JSON.stringify(res.data));
      return res.data;
    }
  } catch (e) {
    console.log("MAL");
    return null;
  }
};
export const classesByTrainer = async (trainerId) => {
  try {
    const result = await fetch(
      "http://localhost:3000/class/getAllClassByTrainer/" + trainerId,
      {
        method: "GET",
        headers: {
          ["Content-Type"]: "application/json",
        },
      },
    );

    const res = await result.json();

    if (res !== null && res.status === "SUCCESS") {
      console.log(JSON.stringify(res.data));
      return res.data;
    }
  } catch (e) {
    console.log("MAL");
    return null;
  }
};
export const getAllClasses = async () => {
  try {
    const result = await fetch("http://localhost:3000/class/getAllClasses/", {
      method: "GET",
      headers: {
        ["Content-Type"]: "application/json",
      },
    });

    const res = await result.json();

    if (res !== null && res.status === "SUCCESS") {
      return res.data;
    }
  } catch (e) {
    console.log("MAL");
    return null;
  }
};
export const deleteClassById = async (classId) => {
  try {
    const result = await fetch(
      "http://localhost:3000/class/deleteClassById/" + classId,
      {
        method: "DELETE",
        headers: {
          ["Content-Type"]: "application/json",
        },
      },
    );

    const res = await result.json();

    if (res !== null && res.status === "SUCCESS") {
      console.log(JSON.stringify(res.data));
      return res.data;
    }
  } catch (e) {
    console.log("MAL");
    return null;
  }
};
export const deleteStudentByClass = async (classId,studentId) => {
  try {
    const result = await fetch(
      "http://localhost:3000/class/deleteStudentByClass/" + classId+"/"+studentId,
      {
        method: "DELETE",
        headers: {
          ["Content-Type"]: "application/json",
        },
      },
    );

    const res = await result.json();

    if (res !== null && res.status === "SUCCESS") {
      console.log(JSON.stringify(res.data));
      return res.data;
    }else if(res!==null && res.status==="ERROR"){
      return res.message;
    }
  } catch (e) {
    console.log("MAL");
    return null;
  }
};
