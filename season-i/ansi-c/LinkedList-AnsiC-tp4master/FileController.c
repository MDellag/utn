#include <stdio.h>
#include <stdlib.h>
#include <conio.h>
#include <ctype.h>
#include <string.h>

#include "LinkedList.h"
#include "clientes.h"
#include "Parser.h"
#include "Input.h"
#include "validaciones.h"


/** \brief Carga los datos de un archivo  (modo texto).
 *
 * \param path char*
 * \param pArrayListDevice LinkedList*
 * \return int
 *
 */
int controller_loadFromText(char* path, LinkedList* pArrayListDevice)
{
    FILE* archivoDatos;

    system("cls");

    if(pArrayListDevice != NULL)
    {
        ll_clear(pArrayListDevice);
        printf("\nSe ha limpiado la lista debido a que habia una ya cargada");
    }

    if ( (archivoDatos = fopen(path,"r+") ) != NULL ) // Si la carga de archivos es diferente a NULL, abre..
    {
        archivoDatos = fopen(path, "r+");

        parser_fromText(archivoDatos, pArrayListDevice);

        printf("\n\n Carga modo Texto OK.");

    }
    else
    {
        printf("\n\nNo se pudo realizar la carga.");
    }

    fclose(archivoDatos);

    return 0;
}




/** \brief Ordenamiento de Empleados por Nombre
 *
 * \param void* pDeviceA
 * \param void* pDeviceB
 * \return 0
 *
 */
int ordenamientoIDTipo(void* pDeviceA, void* pDeviceB)
{


    if ( ((eComputer*)pDeviceA)->idTipo > ((eComputer*)pDeviceB)->idTipo )
    {
        return 1;
    }
    if( ((eComputer*)pDeviceA)->idTipo < ((eComputer*)pDeviceB)->idTipo)
    {
        return -1;
    }

    return 0;
}





/** \brief Ordenar empleados
 *
 * \param path char*
 * \param pArrayListDevice LinkedList*
 * \return int
 *
 */
int controller_sortEmployee(LinkedList* pArrayListDevice)
{
    system("cls");

    printf("\nEste Proceso podria tardar unos momentos.. ");


    ll_sort(pArrayListDevice, ordenamientoIDTipo, 1);

    system("cls");

    printf("\nSe ha ordenado por Tipo de manera Ascendente Correctamente.");



    return 1;
}







/** \brief Listar Devices.
 *
 * \param pArrayListDevice LinkedList*
 * \return int
 *
 */
int controller_ListDevices(LinkedList* pArrayListDevice)
{
    int a;
    int lenght;


    eComputer* auxDevice= device_new();

    lenght = ll_len(pArrayListDevice);

    system("cls");

    printf("\n\nID - Descripcion - Precio - ID.TIPO\n");


    for(a = 0; a < lenght; a++)
    {
        auxDevice = ll_get(pArrayListDevice, a);

        if((auxDevice)->id > 0)
        {
             if( device_getIdTipo(auxDevice) == 1)
             {
                printf("\n%i - %s - %i - DESKTOP", device_getId(auxDevice), (auxDevice)->descripcion, device_getPrecio(auxDevice));
             }
             else if( device_getIdTipo(auxDevice) == 2)
             {
                 printf("\n%i - %s - %i - LAPTOP", device_getId(auxDevice), (auxDevice)->descripcion, device_getPrecio(auxDevice));
             }
        }
    }
    return 0;
}





/**\brief Devuelve una lista solo con los devices "Laptops"
 * \Param void* pDevice
 * \return void
 */
void controller_mapPrecio(void* pDevice)
{
    int auxIdTipo;
    int auxPrecio;

    if(pDevice != NULL)
    {
        auxIdTipo = device_getIdTipo(pDevice);
        auxPrecio = device_getPrecio(pDevice);

        if(auxIdTipo == 1){
            device_setPrecio(pDevice, auxPrecio*1.1 );
        }else{
            device_setPrecio(pDevice, auxPrecio*1.2);
        }
    }
}



/**\brief Mapea los items de la lista
 * \Param LinkedList* this
 * \return -1 no ok
            0 ok
 */
int controller_mappedList(LinkedList* this)
{
    int returnAux = -1;

    if(this != NULL)
    {
        returnAux = 0;

        ll_map(this, controller_mapPrecio);
    }

    return returnAux;
}





/**\brief toma la lista de Devices y filtra las que son Laptops
 * \Param void* parameter
 * \return int 0: no ok
               1: ok
 */
int filtrarLaptops(void* parameter)
{
    int ok = 0;
    eComputer* auxComputer;

    if(parameter != NULL )
    {
        auxComputer = (eComputer*) parameter;
        if( auxComputer->idTipo == 2)
        {
            ok = 1;
        }
    }
    return ok;
}



/**\brief Devuelve una lista solo con los devices "Laptops"
 * \Param LinkedList* this
 * \return Lista de Laptops
 */
LinkedList* controller_ListaLaptops(LinkedList* this)
{
    LinkedList* listaLaptops;

    if(this != NULL)
    {
        listaLaptops = ll_filter(this, filtrarLaptops);
        //controller_ListDevices(listaLaptops);
    }
    return listaLaptops;
}





/** \brief Guarda la Lista de Laptops en un nuevo archivo filtrado.csv (modo texto).
 *
 * \param path char*
 * \param pArrayListDevice LinkedList*
 * \return int
 *
 */
int controller_saveAsText(char* path, LinkedList* pArrayListDevice)
{
    int length = ll_len(pArrayListDevice);
    int a;      //variable for


    eComputer* auxDevice;

    FILE* archivo;

    system("cls");

    if ( (archivo = fopen(path,"w+")) == NULL )

    {
        printf("No se pudo abrir el archivo");
        exit(1);
    }
    else
    {
        archivo = fopen(path, "r+");
    }

    fprintf(archivo, "%s,%s,%s,%s\n", "id", "Descripcion", "Precio" , "idTipo");
    for(a = 0; a < length; a++)
    {
        auxDevice = ll_get(pArrayListDevice, a);

        fseek(archivo, 0L, SEEK_END);

        fprintf(archivo, "%i,%s,%i,%i\n", auxDevice->id, auxDevice->descripcion, auxDevice->precio, auxDevice->idTipo);
    }

    ll_clear(pArrayListDevice);
    printf("\nArchivo Guardado en modo texto correctamente.");
    fclose(archivo);

    return 0;
}
