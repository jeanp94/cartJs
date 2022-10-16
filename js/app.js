const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
let articuloCarrito = [];

cargarEvenetListerner();
function cargarEvenetListerner(){
        listaCursos.addEventListener('click',agregarCurso);
        carrito.addEventListener('click',eliminarCurso);
        vaciarCarrito.addEventListener('click',deleteCart);
}

function agregarCurso(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){
                leerCursos(e.target.parentElement.parentElement);
        }
}
function leerCursos(cursos){
        const datos = {
                image : cursos.querySelector('img').src,
                titulo : cursos.querySelector('h4').textContent,
                precio : cursos.querySelector('.precio span').textContent,
                id : cursos.querySelector('a').getAttribute('data-id'),
                cantidad : 1
        }
        const existe = articuloCarrito.some(curso => curso.id === datos.id);
        if(existe){
             const cursos = articuloCarrito.map(curso => {
                if(curso.id === datos.id){
                        curso.cantidad++;
                        return curso;
                }
                else{
                        return curso;
                }
             })
        }else{
                articuloCarrito = [...articuloCarrito,datos];
        }
     
        createHtml();
}

function createHtml(){
        limpiarHTML();
        articuloCarrito.forEach(curso => {
                const {image,titulo,precio,id,cantidad} = curso;
                const row = document.createElement('tr');
                row.innerHTML= `
                        <td>
                                <img src='${image}' width='100' /> 
                        </td>
                        <td>
                                ${titulo}
                        </td>
                        <td>
                                 ${precio}
                        </td>
                        <td>
                                 ${cantidad}
                        </td>
                        <td>
                                <a href='#' class='borrar-curso' curso-id='${id}'>X</a>
                        </td>
                `;
                contenedorCarrito.appendChild(row);
        });
}

function limpiarHTML(){
        while(contenedorCarrito.firstChild){
                contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        }
}

function eliminarCurso(e){
        if(e.target.classList.contains('borrar-curso')){
               const idCurso = e.target.getAttribute('curso-id');
               articuloCarrito = articuloCarrito.filter(curso => curso.id !== idCurso);
               createHtml();
        }
    
}
function deleteCart(){
        articuloCarrito=[];
        createHtml();
}