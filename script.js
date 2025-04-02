let lista = [];

function nuevaEntrada()
{
    event.preventDefault();
    let input = document.getElementById("input");
    const fechaCreacion = new Date();
    lista.push({entrada: input.value, fechaCreacion: fechaCreacion, activo: true, fechaTachado: fechaCreacion});
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

function llenarTabla()
{
    let tabla = document.getElementById("lista");
    tabla.innerHTML = "";
    for(let i = 0; i < lista.length; i++)
    {
        let elemento = lista[i];
        let finalizacion = "", checkbox = "", clase = "";
        if(!elemento.activo)
        {
            checkbox = "checked";
            clase = "tachado";
            finalizacion = `${elemento.fechaTachado.toLocaleTimeString()}, ${elemento.fechaTachado.toLocaleDateString()}`;
        }
        tabla.innerHTML += 
        `<tr>
            <th scope="row"><input type="checkbox" id="checkbox${i}" onchange="tachar(${i})" class="form-check-input checkbox-${clase}" ${checkbox}></th>
            <td class="${clase}" id="tarea${i}"></td>
            <td>${elemento.fechaCreacion.toLocaleTimeString()}, ${elemento.fechaCreacion.toLocaleDateString()}</td>
            <td>${finalizacion}</td>
            <td></td>
        </tr>`;

        let tarea = document.getElementById(`tarea${i}`);
        tarea.innerText = elemento.entrada; //Para que no se pueda poner HTML en el input.

    }
    tabla.innerHTML +=
    `   <tr>
            <th scope="row"></th>
            <td>
                <form onsubmit="nuevaEntrada()">
                    <input type="text" id="input" required>
                    <input type="submit">
                </form>
            </td>
            <td colspan="3"></td>
        </tr>`;
}