export async function getNewToken(status) {
  console.log(status)
  try {
    const tokenActual = sessionStorage.getItem("token");
    const response = await fetch("http://localhost:3000/token/newToken/"+status, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": tokenActual,
      },
    });
    if (!response.ok) throw new Error("Ha ocurrido un error");
    const data = await response.json();

    return true;
  } catch (error) {
    try {
      const tokenRefresh = sessionStorage.getItem("tokenRefresh");
      const response = await fetch(
        "http://localhost:3000/token/newToken/"+status,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": tokenRefresh,
          },
        }
      );
      if (!response.ok) throw new Error("Ha ocurrido un error");
      const data = await response.json();
      const token = data.tokenNew;
      console.log(token)
      sessionStorage.setItem("token", token);

      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }
}