import { useState, useEffect } from "react";
import axios from 'axios';
import MostrarInfo from "./mostrarInfo";
import llamarTodoAPUObjeto from "@/funciones/conectoresBackend/llamarTodoAPUObjeto";
import { CreateSelect } from "./selects";
import decidirTipoDeArchivo from "@/funciones/decidirTipoDeArchivo";

//redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateObjetoAPU, updateLlavesProyectos } from "@/funciones/redux/actions";

export function GanttTable() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [email, setEmail] = useState('davipianof@gmail.com');
    const [loading, setLoading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [llaveProyectoEnUso, setLlaveProyectoEnUso] = useState('');

    //redux
    const objetosAPU = useSelector(state => state.objetosAPU);
    const llavesProyectos = useSelector(state => state.llavesProyectos);
    const dispatch = useDispatch();

    useEffect(() => {
        llamarTodoAPUObjeto('davipianof@gmail.com')
            .then(objetos => {
                dispatch(updateObjetoAPU(objetos[0]))
                dispatch(updateLlavesProyectos(Object.keys(objetos[0])))
                setLlaveProyectoEnUso(Object.keys(objetos[0])[0])
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const uploadFile = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', 'y8peecdo');
        formData.append('folder', `${email}/${llaveProyectoEnUso}`);

        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/dplncudbq/upload`,
            formData
        );

        console.log(res.data);
        console.log(res.data['url']);
        setLoading(false);
        setUploadSuccess(true);
        setSelectedFile(null);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setUploadSuccess(false);
    };

    
    return (
        <div style={{height:'100%'}}>
            {llavesProyectos.length === 0 ? 
                <div className="miContenedor">
                    <div className="miCirculoGiratorio"></div>
                </div>
            : 
                <div >
                    <div className="centrar" style={{display: 'block', height:'25%', background: 'black', paddingBottom: '5%'}}>
                        <div className="" style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around'}}>
                            <MostrarInfo    informacion={'cargar archivo'} 
                                            contenido={<label className="imagenSubirArchivos" style={{display: loading === true ? 'none' : 'flex', backgroundImage: 'url("https://res.cloudinary.com/dplncudbq/image/upload/v1706024045/crearNuevoObjeto_o9hw7f.png")'}}>
                                                            <input type="file" onChange={handleFileChange} style={{display: 'none'}} />
                                                        </label>}
                                            width={65} height={65} style={{paddingBottom: '20px'}}/>
                            <MostrarInfo    informacion={'subir archivo'} 
                                            contenido={<button className="imagenSubirArchivos" style={{display: !selectedFile || loading ? 'none' : 'flex',  backgroundImage: 'url("https://res.cloudinary.com/dplncudbq/image/upload/v1706024045/save_pmx5wo.png")'}} onClick={uploadFile} ></button>}
                                            width={65} height={65} tyle={{paddingBottom: '20px'}}/> 
                            {llavesProyectos.length !== 0 ? 
                                <CreateSelect 
                                    name={'llaves'} 
                                    value={llaveProyectoEnUso} 
                                    options={llavesProyectos} 
                                    event={(event) => setLlaveProyectoEnUso(event.target.value)}
                                /> 
                            : null }                               
                        </div>                
                        <div style={{marginTop: '20px'}}>
                            {loading && <p>Cargando...</p>}
                            {uploadSuccess && <p>¡Archivo subido con éxito!</p>}
                            {selectedFile && <p>Archivo seleccionado: {selectedFile.name}. Guardar en proyecto: {llaveProyectoEnUso}</p>}
                        </div>
                    </div>
                    <div className="centrar borde bordes color5" style={{height:'70vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {selectedFile && (
                            decidirTipoDeArchivo(selectedFile)
                        )}
                    </div>
                </div>
            }
        </div>
    );
}

