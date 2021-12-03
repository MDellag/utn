#include <stdio.h>
#include <stdlib.h>
#include "LinkedList.h"
#include "Employee.h"

/** \brief Parsea los datos  de los empleados desde el archivo data.csv (modo texto).
 *
 * \param path char*
 * \param pArrayListEmployee LinkedList*
 * \return int
 *
 */
int parser_EmployeeFromText(FILE* pFile, LinkedList* pArrayListEmployee)
{

    Employee* auxEmpleado;

    char id[50];
    char nombre[50];
    char hTrabajadas[50];
    char salario[50];


   // fscanf(pFile, "%[^,], %[^,], %[^,], %[^\n]\n", id, nombre, hTrabajadas, salario);

    do{
        fscanf(pFile, "%[^,], %[^,], %[^,], %[^\n]\n", id, nombre, hTrabajadas, salario);


        auxEmpleado = employee_newParametros(id, nombre, hTrabajadas, salario);

        ll_add(pArrayListEmployee, auxEmpleado);

    }while(!feof(pFile));


    return 0;
}






/** \brief Parsea los datos los datos de los empleados desde el archivo data.bin (modo binario).
 *
 * \param path char*
 * \param pArrayListEmployee LinkedList*
 * \return int
 *
 */
int parser_EmployeeFromBinary(FILE* pFile, LinkedList* pArrayListEmployee)
{

    Employee* auxEmpleado;
    Employee empleado;
    int cant;

    while(!feof(pFile)){

        cant = fread(&empleado, sizeof(Employee), 1, pFile);
        if (cant != 1)
        {
            if(feof(pFile))
            {
                break;
            }
        }

         auxEmpleado = employee_newParametrosBinary(empleado);
         ll_add(pArrayListEmployee, auxEmpleado);
    }

    return 0;

}
