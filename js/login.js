window.onload = function() {
    const reg_email = localStorage.getItem('EmailUsuario');
    const reg_pass = localStorage.getItem('ContraseñaUsuario');

    if(reg_email && reg_pass) {
        console.log("Datos cargados");
    } else {
        alert("Por favor Registrese primero :D")
    }
}

