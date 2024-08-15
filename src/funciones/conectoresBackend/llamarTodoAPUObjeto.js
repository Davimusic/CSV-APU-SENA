export default async function llamarTodoAPUObjeto(correo){
    return fetch('/api/getAllAPUObjects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            correo: correo, 
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }
        return response.json();
    })
    .then(data => {
        return data.objetos;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}



