#include <stdio.h>
#include <stdlib.h>
#include <conio.h>
#include <ctype.h>
#include <string.h>

#include "LinkedList.h"
#include "Employee.h"
#include "parser.h"
#include "utn.h"
#include "validaciones.h"


int ordenamientoId(void* pEmployeeA, void* pEmployeeB);


/** \brief Carga los datos de los empleados desde el archivo data.csv (modo texto).
 *
 * \param path char*
 * \param pArrayListEmployee LinkedList*
 * \return int
 *
 */
int controller_loadFromText(char* path, LinkedList* pArrayListEmployee)
{
    FILE* archivoDatos;

    system("cls");

    if(pArrayListEmployee != NULL)
    {
        ll_clear(pArrayListEmployee);
        printf("\nSe ha limpiado la lista debido a que habia una ya cargada");
    }

    if ( (archivoDatos = fopen(path,"r+") ) != NULL ) // Si la carga de archivos es diferente a NULL, abre..
    {
        parser_EmployeeFromText(archivoDatos, pArrayListEmployee);

        printf("\n\n Carga modo Texto OK.");

    }
    else
    {
        printf("\n\nNo se pudo realizar la carga.");
    }


    fclose(archivoDatos);

    return 0;
}







/** \brief Carga los datos de los empleados desde el archivo data.csv (modo binario).
 *
 * \param path char*
 * \param pArrayListEmployee LinkedList*
 * \return int
 *
 */
int controller_loadFromBinary(char* path, LinkedList* pArrayListEmployee)
{
    FILE* datosBinario;

    system("cls");

    if(pArrayListEmployee != NULL)
    {
        ll_clear(pArrayListEmployee);
        printf("\nSe ha limpiado la lista debido a que habia una ya cargada");
    }


    if ( (datosBinario = fopen(path,"rb") ) != NULL )
    {
        datosBinario = fopen(path, "rb");

        parser_EmployeeFromBinary(datosBinario, pArrayListEmployee);

        printf("\n\n Carga modo Binario OK.");

    }
    else
    {
        printf("\n\nNo se pudo realizar la carga.");
    }



    fclose(datosBinario);

    return 0;
}





/** \brief devuelve un ID disponible de la lista.
 *         debe ser ordenada de forma ascendente antes de usar.
 *
 * \param pArrayListEmployee LinkedList*
 * \return posicion disponible. Int
 */
int returnAvailableId(LinkedList*  pArrayListEmployee)
{
    int a;
    int length = ll_len(pArrayListEmployee);
    int position = length + 1;

    Employee* auxEmpleado;


    for(a = 0; a < length  ; a++)
    {
        auxEmpleado = ll_get(pArrayListEmployee, a);

        if(employee_getId(auxEmpleado) != a + 1)
        {
           position = a+1;
           break;
        }

    }

    return position;
}




/** \brief Alta de empleados
 *
 * \param pArrayListEmployee LinkedList*
 * \return int
 *
 */
int controller_addEmployee(LinkedList* pArrayListEmployee)
{
    int id, returnAux = 1;
    int hsTrabajadas = 0;
    int salario = 0;
    char name[31];

    Employee* auxiliarEmpleado = employee_new();

    system("cls");

    printf("\nOrdenando la lista de Empleados por ID para el asignamiento de ID automatico...");

    ll_sort(pArrayListEmployee, ordenamientoId, 1);

    system("cls");

    printf("\nOrdenamiento Completado.\n");

    if(pArrayListEmployee != NULL)
    {

        printf("\n ********* Ingreso de datos de Nuevo Empleado *********");

        verificarYSetearNombre(name, auxiliarEmpleado);


        id = returnAvailableId(pArrayListEmployee);

        employee_setId(auxiliarEmpleado, id);


        /************ salario *****************/

        verificarYSetearSalario(salario, auxiliarEmpleado);


        /************ hsTrabajadas *****************/

        verificarYSetearHsTrabajadas(hsTrabajadas, auxiliarEmpleado);


        returnAux = 0;

        ll_add(pArrayListEmployee, auxiliarEmpleado);
        ll_sort(pArrayListEmployee, ordenamientoId, 1);


        printf("\n\nEmpleado dado de alta con el ID:%d", id);

    }
    else
    {
        printf("\n\nAun no hay una lista cargada.");
    }


    return returnAux;
}



/**
* @Brief Busca un empleado por criterio ID y retorna su direccion de memoria
* @param LinkedList* this: puntero a la Lista
* @param Int id: id a buscar entre empleados de la lista
* @return NULL: si el puntero a la lista es NULL o si el ID es menor a 1
          Direccion de memoria del Empleado si existe.
*/
Employee* matchEmployeeId(LinkedList* this, int id)
{
    Employee* empleado = NULL;
    int a, length = ll_len(this);

    if(this != NULL && id > 0)
    {
        for (a = 0; a < length; a++) {
            empleado = ll_get(this, a);

            if(employee_getId(empleado) == id)
            {
                break;
            }
        }
    }
    return empleado;
}



/**
* @Brief Busca la posicion de un empleado en la Lista
* @param LinkedList* this: puntero a la Lista
* @param Int id: id a buscar entre empleados de la lista
* @return int -1: si el puntero a la lista es NULL o si el ID es menor a 1
          int a: index del empleado
*/
int indexEmployee(LinkedList* this, int id)
{
    Employee* empleado = NULL;
    int a; //recorrido For
    int length = ll_len(this);
    int returnAux = -1;

    if(this != NULL && id > 0)
    {
        for (a = 0; a <= length; a++) {
            empleado = ll_get(this, a);

            if(employee_getId(empleado) == id)
            {
                returnAux = a;
                break;
            }
        }
    }
    return returnAux;
}



/**
* @Brief Busca el ID mas alto de la lista de empleados
* @param LinkedList* this: puntero a la Lista
* @param Int id: id a buscar entre empleados de la lista
* @return int -1: si el puntero a la lista es NULL o si el ID es menor a 1
         returnAux: id maximo de la lista de empleados
*/
int returnMaxId(LinkedList* this)
{
    int returnAux = -1;
    int length = ll_len(this);
    int a, flag = 0;
    Employee* empleado;

    if(this != NULL)
    {
        for (a = 0; a < length ; a++) {
            empleado = ll_get(this, a);

            if(flag == 0)
            {
                returnAux = employee_getId(empleado);
                flag++;
            }

            if(employee_getId(empleado) > returnAux)
            {
                returnAux = employee_getId(empleado);
            }
        }
    }

    return returnAux;
}





/** \brief Modificar datos de empleado
 *
 * \param path char*
 * \param pArrayListEmployee LinkedList*
 * \return int
 *
 */
int controller_editEmployee(LinkedList* pArrayListEmployee)
{

    int listLenght = ll_len(pArrayListEmployee);
    int idEmpleado;
    int returnAux = 1;

    Employee* empleado;

    if(pArrayListEmployee != NULL)
    {
        system("cls");
        getInt("\n\nIngrese el ID del Empleado a modificar: ", "\nError.ID inexistente, reingrese: ", 1, listLenght, &idEmpleado);

        empleado = matchEmployeeId(pArrayListEmployee, idEmpleado);

        verificarYSetearNombre(empleado->nombre, empleado);
        verificarYSetearSalario(employee_getSueldo(empleado), empleado);
        verificarYSetearHsTrabajadas(employee_getHorasTrabajadas(empleado), empleado);
    }

    return returnAux;
}



/** \brief Baja de empleado (Se confirma la baja con S/N por teclado)
 *
 * \param pArrayListEmployee LinkedList*
 * \return int
 *
 */
int controller_removeEmployee(LinkedList* pArrayListEmployee)
{
    int maxId = returnMaxId(pArrayListEmployee);
    int idEmpleado, index;
    int returnAux = 1; //variable recorrido For().
    char opcion;

    Employee* auxEmpleado;

    if(pArrayListEmployee != NULL)
    {
        system("cls");
        getInt("\nIngrese el ID del Empleado a Eliminar: ", "\n\nError.Empleado no existe ingrese nuevamente: ", 1, maxId, &idEmpleado);

        auxEmpleado = matchEmployeeId(pArrayListEmployee, idEmpleado);
        index = indexEmployee(pArrayListEmployee, idEmpleado);

        do{
            printf("\n\nEsta seguro que desea Eliminar el Empleado? s/n->  ");
            opcion = toupper(getch());

            if(opcion == 'S')
            {
                printf("\n\nEl Empleado %s, cuyo Id: %i. Se ha Eliminado Correctamente.", (*auxEmpleado).nombre, employee_getId(auxEmpleado));
                ll_remove(pArrayListEmployee, index);
            }
            else if(opcion == 'N')
            {
                break;
            }

        }while(opcion != 'S' && opcion != 'N');

        returnAux = 0;
    }

    return returnAux;
}



/** \brief Listar empleados
 *
 * \param pArrayListEmployee LinkedList*
 * \return int
 *
 */
int controller_ListEmployee(LinkedList* pArrayListEmployee)
{
    int a;
    int lenght;

    Employee* auxEmpleado = employee_new();

    lenght = ll_len(pArrayListEmployee);

    system("cls");

    printf("\n\nID - Nombre - Salario - HorasTrabajadas\n");


    for(a = 0; a < lenght; a++)
    {
        auxEmpleado = ll_get(pArrayListEmployee, a);

        if((auxEmpleado)->id > 0)
        {
            printf("\n%i - %s - %i - %i", employee_getId(auxEmpleado), (auxEmpleado)->nombre, employee_getSueldo(auxEmpleado), employee_getHorasTrabajadas(auxEmpleado));
        }

    }

    return 0;
}



/** \brief Criterio de ordenamiento de Empleados por ID
 *
 * \param void* pEmployeeA
 * \param void* pEmployeeB
 * \return 0
 *
 */
int ordenamientoId(void* pEmployeeA, void* pEmployeeB)
{


    if(((Employee*)pEmployeeA)->id > ((Employee*)pEmployeeB)->id)
    {
        return 1;
    }
    if(((Employee*)pEmployeeA)->id < ((Employee*)pEmployeeB)->id)
    {
        return -1;
    }

    return 0;
}




/** \brief Criterio de ordenamiento de Empleados por Nombre
 *
 * \param void* pEmployeeA
 * \param void* pEmployeeB
 * \return 0
 *
 */
int ordenamientoNombre(void* pEmployeeA, void* pEmployeeB)
{


    if(  strcmpi(( (Employee*)pEmployeeA)->nombre, ((Employee*)pEmployeeB)->nombre) > 0)
    {
        return 1;
    }
    if(strcmpi(( (Employee*)pEmployeeA)->nombre, ((Employee*)pEmployeeB)->nombre) < 0)
    {
        return -1;
    }

    return 0;
}


/** \brief Ordenar empleados
 *
 * \param path char*
 * \param pArrayListEmployee LinkedList*
 * \return int
 *
 */
int controller_sortEmployee(LinkedList* pArrayListEmployee)
{
    system("cls");

    printf("\nEste Proceso podria tardar unos momentos.. ");


    ll_sort(pArrayListEmployee, ordenamientoNombre, 1);

    system("cls");

    printf("\nSe ha ordenado por Nombre Ascendente Correctamente.");



    return 1;
}






/** \brief Guarda los datos de los empleados en el archivo data.csv (modo texto).
 *
 * \param path char*
 * \param pArrayListEmployee LinkedList*
 * \return int
 *
 */
int controller_saveAsText(char* path, LinkedList* pArrayListEmployee)
{
    int length = ll_len(pArrayListEmployee);
    int a;


    Employee* auxEmployee;

    FILE* archivo;

    system("cls");

    if ( (archivo = fopen(path,"w+")) == NULL )

    {
        printf("No se pudo abrir el archivo");
        exit(1);
    }
    else{
        archivo = fopen(path, "r+");
    }


   // fprintf(archivo, "%s,%s,%s,%s\n", "id", "nombre", "horasTrabajadas" , "sueldo");
    for(a = 0; a < length; a++)
    {

        auxEmployee = ll_get(pArrayListEmployee, a);
        fseek(archivo, 0L, SEEK_END);

        fprintf(archivo, "%i,%s,%i,%i\n", auxEmployee->id, auxEmployee->nombre, auxEmployee->horasTrabajadas, auxEmployee->sueldo);

    }

    ll_clear(pArrayListEmployee);
    printf("\nArchivo Guardado en modo texto correctamente.");
    fclose(archivo);

    return 1;
}







/** \brief Guarda los datos de los empleados en el archivo data.csv (modo binario).
 *
 * \param path char*
 * \param pArrayListEmployee LinkedList*
 * \return int
 *
 */
int controller_saveAsBinary(char* path, LinkedList* pArrayListEmployee)
{
    int length = ll_len(pArrayListEmployee);
    int a; //Variable recorrido For

    Employee* auxEmployee = NULL;

    FILE* archivo;

    system("cls");

    if ( (archivo = fopen(path,"rb+")) == NULL )
    {
        if ((archivo = fopen(path,"wb+")) == NULL )
        {
            printf("No se pudo abrir el archivo");
            exit(1);
        }
    }


    for(a = 0; a < length; a++)
    {
        auxEmployee = ll_get(pArrayListEmployee, a);
        if(auxEmployee != NULL)
        {
            fwrite(auxEmployee, sizeof(Employee), 1, archivo);
        }
    }

    ll_clear(pArrayListEmployee);
    printf("\nArchivo guardado en modo Binario correctamente.");

    fclose(archivo);

    return 1;
}

