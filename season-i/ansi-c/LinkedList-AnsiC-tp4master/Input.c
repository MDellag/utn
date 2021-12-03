#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#include "validaciones.h"





/** \brief  Obtiene un valor INT, y lo valida
 *
 * \param  char* msj: mensaje a imprimir
 * \param  char* msjError: mensaje de Error a imprimir
 * \param  int minimo: valor minimo que debe tener input
 * \param  int maximo: valor que no puede superar input
 * \param  int* input: direccion de memoria donde se almacenara el dato.
 * \return Int Retorna  (-1) Error: Si almenos uno de los parametros es incorrecto
 *                        0: si todo ok.
 */
int getInt(char *msj, char *errorMsj, int minimo, int maximo, int *input)
{
    int retorno = -1;

    if(msj != NULL && errorMsj != NULL && input != NULL && maximo >= minimo )
    {

            printf("%s", msj);
            fflush(stdin);
            scanf("%d", input);

            intIsValid(input, minimo, maximo, errorMsj);

    }
    return retorno;
}




/** \brief Obtiene un valor Float, y lo valida.
 *
 * \param  char* msj: mensaje a imprimir
 * \param  char* msjError: mensaje de Error a imprimir
 * \param  float minimo: valor minimo que debe tener input
 * \param  float maximo: valor que no puede superar input
 * \param  float* input: direccion de memoria donde se almacenara el dato.
 * \return Int Retorna  (-1) Error: Si almenos uno de los parametros es incorrecto
 *                        0: si todo ok.
 */
int getFloat(char *msj, char *errorMsj, float minimo, float maximo, float *input)
{
    int retorno = -1;

    if(msj != NULL && errorMsj != NULL &&  maximo >= minimo && input != NULL )
    {
            printf("%s", msj);
            fflush(stdin);
            scanf("%f", input);
            floatIsValid(*input, "Error, Reingrese el valor", minimo, maximo );

    }
    return retorno;
}



/** \brief Obtiene un caracter y lo valida
 *
 * \param  char* msj: mensaje a imprimir
 * \param  char* msjError: mensaje de Error a imprimir
 * \param  char minimo: valor minimo que debe tener input (ej A)
 * \param  char maximo: valor que no puede superar input (ej Z)
 * \param  char* input: direccion de memoria donde se almacenara el dato.
 * \return Int Retorna  (-1) Error: Si almenos uno de los parametros es incorrecto
 *                        0: si todo ok.
 */
int getChar(char *msj, char *msjError, char minimo, char maximo, char *input)
{

    int retorno = -1;

    if(msj != NULL && msjError != NULL && input != NULL && maximo >= minimo)
    {
        printf("%s", msj);
        fflush(stdin);
        scanf("%c", input);
        charIsvalid(input, msjError, 'a', 'z');
        retorno = 0;
    }

    return retorno;
}





/** \brief OBtiene un conjunto de caracteres, no se valida en esta misma funcion
 *
 * \param  char* msj: mensaje a imprimir
 * \param  char* msjError: mensaje de Error a imprimir
 * \param  int minimo: valor minimo que debe tener input
 * \param  int maximo: valor que no puede superar input
 * \param  char* input: direccion de memoria donde se almacenara el conjunto de caracteres.
 * \return Int Retorna  (-1) Error: Si almenos uno de los parametros es incorrecto
 *                        0: si todo ok.
 */
int getString(char* msj, char* msjError, int minimo, int maximo, char* input)
{
    int retorno = -1;
    char bufferStr[4096];

    if(msj != NULL && msjError != NULL && minimo < maximo && input != NULL)
    {
            printf("%s",msj);
            fflush(stdin);
            fgets(bufferStr, sizeof(bufferStr), stdin);

            bufferStr[strlen(bufferStr)-1] = '\0';
            if(strlen(bufferStr)>=minimo && strlen(bufferStr) <maximo)
            {
                strncpy(input,bufferStr,maximo);
                retorno = 0;
            }
            else{
                printf("%s", msjError);
            }


    }
    return retorno;
}





/** \brief Crea y retorna una nueva lista con los elementos de la lista pasada como parametro
 *
 * \param  char* msj: mensaje a imprimir
 * \param  char* msjError: mensaje de Error a imprimir
 * \param  int minimo: valor minimo que debe tener input
 * \param  int maximo: valor que no puede superar input
 * \param  char* input: direccion de memoria donde se almacenara la cadena de caracteres.
 * \return Int Retorna  (-1) Error: Si almenos uno de los parametros es incorrecto
 *                        0: si todo ok.
 *//*
int getAlfanumerico(char* msj, char* msjError, int min, int max, char* input)
{
    int retorno=-1;
    char bufferStr[maxSize];

    if(msj != NULL && msjError != NULL && minSize < maxSize && input != NULL)
    {
            if(!getString(msj, msjError, min, max, bufferStr))
            {
                if(isValidAlphanumeric(bufferStr)==1)
                {
                    strncpy(input,bufferStr,maxSize);
                    retorno=0;
                    break;
                }
                else
                {
                    printf("%s",msjError);
                }
            }
    }
    return retorno;
}
*/







