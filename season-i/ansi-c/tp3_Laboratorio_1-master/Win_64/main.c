#include <stdio.h>
#include <stdlib.h>

#include "LinkedList.h"
#include "Controller.h"
#include "Employee.h"
#include "utn.h"


/****************************************************
    Menu:
     1. Cargar los datos de los empleados desde el archivo data.csv (modo texto).
     2. Cargar los datos de los empleados desde el archivo data.csv (modo binario).
     3. Alta de empleado
     4. Modificar datos de empleado
     5. Baja de empleado
     6. Listar empleados
     7. Ordenar empleados
     8. Guardar los datos de los empleados en el archivo data.csv (modo texto).
     9. Guardar los datos de los empleados en el archivo data.csv (modo binario).
    10. Salir


    Alumno: Dellagiovanna Mauricio 1F
*****************************************************/

// fscanf lee en modo texto
// fread lee en modo binario

int main()
{
    int option = 0;
    LinkedList* listaEmpleados = ll_newLinkedList();


    do
    {
        printf("\n\n --------------- MENU ---------------");
        printf("\n\n\n1- Cargar datos de empleados modo texto ");
        printf("\n2- Cargar datos de empleados modo binario ");
        printf("\n3- Alta empleado ");
        printf("\n4- Modificar datos empleado ");
        printf("\n5- Baja empleado ");
        printf("\n6- Listar Empleados ");
        printf("\n7- Ordenar Empleados ");
        printf("\n8- Guardar datos de empleados modo texto");
        printf("\n9- Guardar datos de empleados modo binario ");
        printf("\n10- Salir ");

        printf("\n\n\n   Opcion: ");
        fflush(stdin);
        scanf("%d", &option);


        switch(option)
        {
        case 1:
            controller_loadFromText("data.csv", listaEmpleados);
            break;

        case 2:
            controller_loadFromBinary("dat.bin", listaEmpleados);
            break;

        case 3:
            controller_addEmployee(listaEmpleados);
            break;

        case 5:
            controller_removeEmployee(listaEmpleados);
            break;

        case 4:
            controller_editEmployee(listaEmpleados);
            break;

        case 6:
            controller_ListEmployee(listaEmpleados);
            break;

        case 7:
            controller_sortEmployee(listaEmpleados);
            break;

        case 8:
            controller_saveAsText("data.csv", listaEmpleados);
            break;

        case 9:
            controller_saveAsBinary("dat.bin", listaEmpleados);
            break;

        case 10:
            ll_deleteLinkedList(listaEmpleados);
            break;
        }

    }
    while(option != 10);



    return 0;
}
