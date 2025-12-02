const regexNombre = /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/;
const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexCelular = /^[0-9]{7,12}$/;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

function togglePassword(id) {
    const contraseña = document.getElementById(id);

    if (contraseña.type == 'password') {
        contraseña.type = "text";
    } else {
        contraseña.type = "password";
    }
}

function Registrar() {
    const register_email = document.getElementById('reg-email').value;
    const register_name = document.getElementById('reg-nombre').value;
    const register_num = document.getElementById('reg-numero').value;
    const register_pass = document.getElementById('reg-password').value;

    if (!regexNombre.test(register_name)) return alert("Nombre inválido");
    if (!regexCorreo.test(register_email)) return alert("Correo inválido");
    if (!regexCelular.test(register_num)) return alert("Celular inválido");
    if (!regexPassword.test(register_pass)) return alert("INCORRECTO, la contraseña debe contener minúsculas (a-z), mayusculas (A-Z), por lo menos un número (0-9), por lo menos un carácter especial (*, /, _, etc) y debe tener minimo 6 carácteres");

    localStorage.setItem('NombreUsuario', register_name);
    localStorage.setItem('EmailUsuario', register_email);
    localStorage.setItem('NumeroUsuario', register_num);
    localStorage.setItem('ContraseñaUsuario', register_pass);

    window.location.href = 'index.html';
}

const maxIntentos = 3;
var contador = 0;

function Ingresar() {
    const login_email = document.getElementById('log-email').value;
    const login_pass = document.getElementById('log-password').value;
    const reg_email = localStorage.getItem('EmailUsuario');
    const reg_pass = localStorage.getItem('ContraseñaUsuario');
    const reg_name = localStorage.getItem('NombreUsuario');
    const show = document.getElementById('show');

    console.log(login_email + " " + login_pass + " " + reg_email + " " + reg_pass);

    if (login_email == reg_email && login_pass == reg_pass) {
        show.style.color = 'green';
        let mens = "Bienvenido al sistema! " + reg_name;
        document.getElementById("show").innerHTML = mens;
        contador = 0;
    } else {
        contador = contador + 1;
        show.style.color = 'red';
        let mens = "Usuario o contraseña incorrectos, intento n°" + contador;
        document.getElementById("show").innerHTML = mens;
        if(contador == maxIntentos) {
            let alerta = "Cantidad de intentos excedida! Cuenta Bloqueada";
            document.getElementById("show").innerHTML = alerta;
            deshabilitarBoton();
        }
    }
}

function Recuperar() {
    const rec_email = document.getElementById('rec-email').value;
    const rec_password = document.getElementById('rec-password').value;
    const comp_email = localStorage.getItem('EmailUsuario');
    const input = document.getElementById('rec-email');

    if (!regexPassword.test(rec_password)) return alert("INCORRECTO, la nueva contraseña debe contener minúsculas (a-z), mayusculas (A-Z), por lo menos un número (0-9), por lo menos un carácter especial (*, /, _, etc) y debe tener minimo 6 carácteres");

    if(rec_email == comp_email){
        let mensaje = "Contraseña cambiada con éxito";
        document.getElementById("mostrar").innerHTML = mensaje;
        localStorage.setItem('ContraseñaUsuario', rec_password);
        if (input) {
            input.style.border = '1px solid grey'
        }

        window.location.href = 'index.html';
    } else {
        let mensaje = "No existe el usuario";
        document.getElementById('mostrar').innerHTML = mensaje;
        if (input) {
            input.style.border = '1px solid red'
        }
    }
}

function borrarDatos() {
    localStorage.clear();
    window.location.href = 'registro.html';
}

function deshabilitarBoton() {
    const boton = document.getElementById('boton_formulario');
    const link = document.getElementById('link-recuperacion');
    if (boton) {
        boton.disabled = true;
        boton.textContent = "ACCESO BLOQUEADO";
        boton.style.backgroundColor = 'grey';
        boton.style.cursor = 'default';
    }

    if(link){
        link.removeAttribute('href')
        link.style.cursor = 'default';
        link.style.textDecoration = 'none';
    }
}
