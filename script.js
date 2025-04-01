let lista = [];

function nuevaEntrada()
{
    event.preventDefault();
    let input = document.getElementById("input");
    const fechaCreacion = new Date();
    lista.push({entrada: input.value, fechaCreacion: fechaCreacion, activo: true, fechaTachado: fechaCreacion});
    llenarTabla();
}

function llenarTabla()
{
    let tabla = document.getElementById("lista");
    tabla.innerHTML = "";
    for(let i = 0; i < lista.length; i++)
    {
        let elemento = lista[i];
        let finalizacion = "";
        if(!elemento.activo) finalizacion = `${elemento.fechaTachado.toLocaleTimeString()}, ${elemento.fechaTachado.toLocaleDateString()}`;
        tabla.innerHTML += 
        `<tr>
            <th scope="row"><input type="checkbox" id="checkbox${i}></th>
            <td>${elemento.entrada}</td>
            <td>${elemento.fechaCreacion.toLocaleTimeString()}, ${elemento.fechaCreacion.toLocaleDateString()}</td>
            <td>${finalizacion}</td>
        </tr>`;
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
            <td colspan="2"></td>
        </tr>`;
    console.log(tabla.innerHTML);
}