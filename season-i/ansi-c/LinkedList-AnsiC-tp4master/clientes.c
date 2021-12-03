#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "clientes.h"
#include "validaciones.h"
#include "Input.h"


/**\brief Asigna a la variable this una direccion de memoria.
 *
 * \param void
 * \return this
 *
 */
eComputer* device_new()
{
    eComputer* this = (eComputer*)malloc(sizeof(eComputer));

    return this;
}




/**\brief Asigna el ID en la variable this de eComputer.
 *
 * \param this eComputer* empleado
 * \param int* id
 * \return int 0.
 *
 */
int device_setId(eComputer* this, int id)
{
    this->id = id;

    return 0;
}



/** \brief Obtiene el ID de una Computadora.
 *
 * \param this eComputer
 * \return int 0.
 */
int device_getId(eComputer* this)
{
    return this->id;
}






/**\brief Asigna el Precio en la variable this de eComputer.
 *
 * \param this eComputer*
 * \param int* precio
 * \return int 0.
 *
 */
int device_setPrecio(eComputer* this, int precio)
{
    this->precio = precio;

    return 0;
}




/** \brief Obtiene el Precio de una Computadora.
 *
 * \param this eComputer*
 * \return precio.
 */
int device_getPrecio(eComputer* this)
{
    return this->precio;
}




/**\brief Asigna la descripcion del Dispositivo en la variable this pasada por parametro.
 *
 * \param this eComputer*
 * \param char* descripcion
 * \return int 0.
 *
 */
int device_setDescripcion(eComputer* this, char* descripcion)
{

    strcpy(this->descripcion, descripcion);


    return 0;
}



/**\brief Obtiene la Descripcion de la variable de eComputer pasada por parametro.
 *
 * \param this eComputer*
 * \param char* descripcion cadena de caracteres
 * \return int 0.
 *
 */
int device_getDescripcion(eComputer* this, char* descripcion)
{
   // char* descripcion;
    descripcion = this->descripcion;

    return 0;
}




/**\brief Asigna el ID TIPO del Dispositivo en la variable this pasada por parametro.
 *
 * \param this eComputer*
 * \param int idTipo
 * \return int 0.
 *
 */
int device_setIdTipo(eComputer* this, int idTipo)
{
    this->idTipo = idTipo;

    return 0;
}



/**\brief Obtiene la Descripcion de la variable de eComputer pasada por parametro.
 *
 * \param this eComputer*
 * \param char* idTipo cadena de caracteres
 * \return int 0.
 *
 */
int device_getIdTipo(eComputer* this)
{
    return this->idTipo;
}




/**\brief Retorna un eComputer* con todos los campos asignados en el argumento de la funcion (Modo Texto).
 *
 * \param char* idStr: numero formato string
 * \param char* descripcionStr cadena de caracteres
 * \param char* precioStr numero formato string
 * \param char* idTipoStr numero/tipoDePc cadena de caracteres
 * \return auxDevice puntero a eComputer con campos asignados.
 *
 */
eComputer* device_newParametros(char* idStr, char* descripcionStr, char* precioStr, char* idTipoStr)
{

     int id, precio, idTipo;

     eComputer* auxDevice;

     id = atoi(idStr);
     precio = atoi(precioStr);
     idTipo = atoi(idTipoStr);
     auxDevice = device_new();

     device_setId(auxDevice, id);
     device_setDescripcion(auxDevice, descripcionStr);
     device_setPrecio(auxDevice, precio);
     device_setIdTipo(auxDevice, idTipo);




    return auxDevice;
}
