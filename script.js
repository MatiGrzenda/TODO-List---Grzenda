let lista = [];

function nuevaEntrada()
{
    event.preventDefault();
    let input = document.getElementById("input");
    const fechaCreacion = new Date();
    lista.push({entrada: input.value, fechaCreacion: fechaCreacion, activo: true, fechaTachado: fechaCreacion});

    let div = document.getElementById("lista");
    let html;
    for(let i; i < lista.length; i++)
    {
        elemento = lista[i];
        html += 
        `<input type="checkbox" id="checkbox${i}">
        <p>${elemento.entrada}</p>
        <p>${elemento.fechaCreacion.toLocaleTimeString()}, ${elemento.fechaCreacion.toLocaleDateString()}</p>`;
        if(!elemento.activo) html += `<p>${elemento.fechaTachado.toLocaleTimeString()}, ${elemento.fechaTachado.toLocaleDateString()}</p>`;
    }
    div.innerHTML = html;
}