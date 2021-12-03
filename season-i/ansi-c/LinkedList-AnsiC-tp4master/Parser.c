#include <stdio.h>
#include <stdlib.h>
#include "LinkedList.h"
#include "clientes.h"

/** \brief Parsea los datos  de los empleados desde el archivo data.csv (modo texto).
 *
 * \param path char*
 * \param pArrayListDevice LinkedList*
 * \return int
 *
 */
int parser_fromText(FILE* pFile, LinkedList* pArrayListDevice)
{

    eComputer* auxDevice;

    char id[50];
    char descripcionStr[200];
    char precioStr[50];
    char idTipo[50];


    fscanf(pFile, "%[^,], %[^,], %[^,], %[^\n]\n", id, descripcionStr, precioStr, idTipo);

    do{
        fscanf(pFile, "%[^,], %[^,], %[^,], %[^\n]\n", id, descripcionStr, precioStr, idTipo);


        auxDevice = device_newParametros(id, descripcionStr, precioStr, idTipo);

        ll_add(pArrayListDevice, auxDevice);

    }while(!feof(pFile));


    return 0;
}
