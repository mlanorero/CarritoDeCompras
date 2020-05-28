//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito')

//Even Listeners
cargarEventListeners();

function cargarEventListeners() {
    //Dispara cuando se presiona agregar carrito
    cursos.addEventListener('click', comprarCurso);

    //Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    //al cargar documento mostrar local storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}



//Funciones
//Función que añada el curso al carrito
function comprarCurso(e) {
    e.preventDefault();
    //Delegation para agregar carrito (Enviar curso a carrito al apretar agregar curso)
    if(e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        //Enviamos curso seleccionado para tomar sus datos.
        leerDatosCurso(curso);
    }
}
//Lee los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')   
    }
    insertarCarrito(infoCurso);

}
//Muestra el curso seleccionado en el carrito
function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = 
    `
        <td>
            <img src="${curso.imagen}" width=100></img>
        </td>
        <td>"${curso.titulo}"</td>
        <td>"${curso.precio}"</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">x</a>
        </td>
    
    `;
    listaCursos.appendChild(row);
    guardarCursosLocalStorage(curso);
}
//Elimina cursos del carrito en DOM 
function eliminarCurso(e) {
    e.preventDefault();

    let curso,
        cursoId;
    if(e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
        console.log(cursoId);
    }
    eliminarCursoDeLocalStorage(cursoId);
}
//Elimina los cursos del carrito en el DOM
function vaciarCarrito() {

    //Forma lenta
    //listaCursos.innerHTML = '';
    //Forma rápida y recomendada
    while(listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }
  //Vaciar local Storage
    vaciarLocalStorage();

    return false;
}
//Almacena cursos en el carrito a local storage
function guardarCursosLocalStorage(curso) {
    let cursos;
    //Toma el valor de un arreglo con tados LS o vacío
    cursos = obtenerCursosLocalStorage();

        //Curso seleccionado se agrega al arreglo
    cursos.push(curso);

    localStorage.setItem( 'cursos', JSON.stringify(cursos) );
}
//Comprueba que haya elemento en Local Storage
function obtenerCursosLocalStorage() {
    let cursosLS;
    
    //Comprobamos si hay algo en local storage
    if(localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse( localStorage.getItem('cursos') );
    }
    return cursosLS;
}

//Imprime los cursos de Local Storage en el carrito
function leerLocalStorage() {
    let cursosLS;

    cursosLS =  obtenerCursosLocalStorage();
     
    cursosLS.forEach(function(curso){
        const row = document.createElement('tr');
    row.innerHTML = 
    `
        <td>
            <img src="${curso.imagen}" width=100></img>
        </td>
        <td>"${curso.titulo}"</td>
        <td>"${curso.precio}"</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">x</a>
        </td>
    
    `;
    listaCursos.appendChild(row);
    });
}

//Elimina el curso por el id en local storage
function eliminarCursoDeLocalStorage(curso) {
    let cursosLS;
    // Obtenemos el arreglo de cursos
    cursosLS = obtenerCursosLocalStorage();
    //Iteramos comprando el IDdel cursos comprando con los de LS
    cursosLS.forEach(function(cursoLS, index) {
        if(cursoLS.id === curso) {
            cursosLS.splice(index, 1);
        }
    });
    //Añadimos el arreglo actual a LS
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}
//Elimina todos los cursos de LocalStorage
function vaciarLocalStorage(){
    localStorage.clear();
}