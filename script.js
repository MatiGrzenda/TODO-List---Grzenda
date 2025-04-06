let lista = [];

if(localStorage.getItem("lista") != null)
{
    lista = JSON.parse(localStorage.getItem("lista"));
    lista.forEach((element) =>
    {
        element.fechaCreacion = new Date(element.fechaCreacion);
        element.fechaTachado = new Date(element.fechaTachado);
    })
    llenarTabla();
}

function nuevaEntrada()
{
    event.preventDefault();
    let input = document.getElementById("input");
    const fechaCreacion = new Date();
    lista.push({entrada: input.value, fechaCreacion: fechaCreacion, activo: true, fechaTachado: fechaCreacion}); //Pongo fechaCreacion en fechaTachado para que reconozca que es una fecha.
    llenarTabla();
}

function tachar(index)
{
    let checkbox = document.getElementById(`checkbox${index}`);

    if(checkbox.checked)
    {
        lista[index].activo = false;
        lista[index].fechaTachado = new Date();
    }
    else lista[index].activo = true;

    llenarTabla();
}

function eliminarEntrada(index)
{
    if (confirm("Está seguro que desea eliminar la tarea? No se podrá recuperar.")) lista.splice(index, 1);

    llenarTabla();
}

function llenarTabla()
{
    let tabla = document.getElementById("lista");
    tabla.innerHTML = "";
    localStorage.setItem("lista", JSON.stringify(lista));
    for(let i = 0; i < lista.length; i++)
    {
        let elemento = lista[i];
        let finalizacion = "", checkbox = "", clase = "";
        if(!elemento.activo)
        {
            checkbox = "checked";
            clase = "tachado";
            finalizacion = `${elemento.fechaTachado.toLocaleTimeString()}, ${elemento.fechaTachado.toLocaleDateString("en-GB")}`;
        }
        tabla.innerHTML += 
        `<tr>
            <th scope="row"><input type="checkbox" id="checkbox${i}" onchange="tachar(${i})" class="form-check-input checkbox-${clase}" ${checkbox}></th>
            <td class="${clase}" id="tarea${i}"></td>
            <td>${elemento.fechaCreacion.toLocaleTimeString()}, ${elemento.fechaCreacion.toLocaleDateString("en-GB")}</td>
            <td>${finalizacion}</td>
            <td><button class="botonEliminar" onclick="eliminarEntrada(${i})"><i class="fa-solid fa-trash-can"></i></button></td>
        </tr>`;

        let tarea = document.getElementById(`tarea${i}`);
        tarea.innerText = elemento.entrada; //Para que no se pueda poner HTML en el input.

    }
    tabla.innerHTML +=
    `   <tr>
            <th scope="row"></th>
            <td>
                <form onsubmit="nuevaEntrada()">
                    <input type="text" id="input" autocomplete="off" required>
                    <input type="submit">
                </form>
            </td>
            <td colspan="3"></td>
        </tr>`;
}

function verificarMasRapida()
{
    let tareaMin, indexMin, tiempoMin = Number.MAX_VALUE, hayTerminadas = false;

    for(let i = 0; i < lista.length; i++)
    {
        let tiempo = Math.abs(lista[i].fechaCreacion - lista[i].fechaTachado);

        if (tiempo < tiempoMin && !lista[i].activo)
        {
            tiempoMin = tiempo;
            indexMin = i;
            hayTerminadas = true;
        }
    }

    if (hayTerminadas)
    {
        tareaMin = lista[indexMin].entrada;
        alert(`La tarea más rápida en realizarse fue "${tareaMin}", número ${indexMin + 1} en la lista.`);
    }
    else alert("Aún no fue terminada ninguna tarea.");
}