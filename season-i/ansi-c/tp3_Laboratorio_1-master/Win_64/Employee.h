#ifndef employee_H_INCLUDED
#define employee_H_INCLUDED
typedef struct
{
    int id;
    char nombre[128];
    int horasTrabajadas;
    int sueldo;
}Employee;

Employee* employee_new();
Employee* employee_newParametros(char* idStr, char* nombreStr, char* horasTrabajadasStr, char* salaryStr);
Employee* employee_newParametrosBinary(Employee empl);

void employee_delete();

int employee_setId(Employee* this, int id);
int employee_getId(Employee* this);

int employee_setNombre(Employee* this, char* nombre);
int employee_getNombre(Employee* this, char* input);

int employee_setHorasTrabajadas(Employee* this, int horasTrabajadas);
int employee_getHorasTrabajadas(Employee* this);

int employee_setSueldo(Employee* this, int sueldo);
int employee_getSueldo(Employee* this);


void verificarYSetearNombre(char* name, Employee* empleado);
void verificarYSetearSalario(int valor, Employee* empleado);
void verificarYSetearHsTrabajadas(int hsTrabajadas, Employee* empleado);

#endif // employee_H_INCLUDED
