#include <stdio.h>
#include <stdlib.h>

#include "LinkedList.h"
#include "Input.h"
#include "FileController.h"

#define PATHFILE "listaPCs.csv"

int main()
{
    int option = 0;
    LinkedList* listaDevices = ll_newLinkedList();
    LinkedList* listaLaptops;

    char* pathFile;

    do
    {
        printf("\n\n --------------- MENU ---------------");
        printf("\n\n\n1- Cargar datos de Devices modo texto ");
        printf("\n2- Ordenar la Lista segun Id Tipo ");
        printf("\n3- Listar Dispositivos ");
        printf("\n4- Aumentar Precios de productos ");
        printf("\n5- Filtrar Laptops ");
        printf("\n6- Guardar Archivo con Solo Laptops ");
        printf("\n7- Salir ");


        getInt("\n\n\n   Opcion: ", "\n\n Error. Reingrese Opcion ", 1, 7, &option);


        switch(option)
        {
        case 1:
            //getString("\nIngrese nombre del archivo ", "\nNo se ha encontrado el archivo ", 1, 64, pathFile);
            controller_loadFromText(PATHFILE, listaDevices);
            break;

        case 2:
            controller_sortEmployee(listaDevices);
            break;

        case 3:
            controller_ListDevices(listaDevices);
            break;

        case 4:
            controller_mappedList(listaDevices);
            break;

        case 5:
             listaLaptops = controller_ListaLaptops(listaDevices);
            break;

        case 6:
            controller_saveAsText("filtrado.csv", listaLaptops);
            break;

        case 7:
            ll_deleteLinkedList(listaDevices);
            break;


        }

    }
    while(option != 7);

    return 0;
}
