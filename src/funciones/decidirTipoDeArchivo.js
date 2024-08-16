/*export default function decidirTipoDeArchivo(selectedFile){
    const fileType = selectedFile.type;
    const fileURL = URL.createObjectURL(selectedFile);

        if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            // Archivo de Excel (xlsx)
            return <p style={{ color: 'black' }}>Sí, es un archivo de Excel.</p>;
        } else {
            return <p style={{color: 'black'}}>Formato incorrecto, sólo se acepta formato xlsx</p>
        }
}*/

import React from 'react';

export default function DecidirTipoDeArchivo(selectedFile) {
    const fileType = selectedFile.type;

    if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        return <p style={{ color: 'black' }}>Archivo listo para subir</p>;
    } else {
        return <p style={{ color: 'black' }}>Formato incorrecto, solo se acepta formato xlsx.</p>;
    }
}



