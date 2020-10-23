import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const FormTarea = () => {

    //Extraer si un proyecto esta activo 
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada ,errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    //Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if (tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada]);

    //State del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    });

    //extraer el nombre del proyecto
    const { nombre } = tarea;

    //Si no hay proyecto seleccionado
    if(!proyecto) return null

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    //Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    //Agregar tarea al proyecto
    const onSubmit = e => {
        e.preventDefault();

        //validar
        if (nombre.trim() === '') {
            validarTarea();
            return;
        }

        //Revisar si es edicion o nueva tarea
        if (tareaseleccionada === null) {
            //tarea nueva
            //agregar la nueva tarea al state de tareas
             tarea.proyectoId = proyectoActual.id;
            tarea.estado = false
            agregarTarea(tarea);
        } else {
            //actualizar tarea existente
            actualizarTarea(tarea);
            //Elimina una tarea seleccionada
            limpiarTarea();
        }

        //obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        //resetear el formulario
        guardarTarea({
            nombre: ''
        })
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? "Editar Tarea" : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligaroio</p> : null}
        </div>
     );
}
 
export default FormTarea;