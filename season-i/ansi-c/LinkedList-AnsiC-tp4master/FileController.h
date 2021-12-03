#ifndef FILECONTROLLER_H_INCLUDED
#define FILECONTROLLER_H_INCLUDED

int controller_ListDevices(LinkedList* pArrayListDevice);


/** \brief Carga los datos de un archivo  (modo texto).
 *
 * \param path char*
 * \param pArrayListDevice LinkedList*
 * \return int
 *
 */
int controller_loadFromText(char* path, LinkedList* pArrayListDevice);


/** \brief Ordenar empleados
 *
 * \param path char*
 * \param pArrayListDevice LinkedList*
 * \return int
 *
 */
int controller_sortEmployee(LinkedList* pArrayListDevice);


LinkedList* controller_ListaLaptops(LinkedList* this);
int controller_mappedList(LinkedList* this);
int controller_saveAsText(char* path, LinkedList* pArrayListDevice);


#endif // FILECONTROLLER_H_INCLUDED
