#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#include "validaciones.h"



/**
 *  @brief Almacena y valida un dato tipo INT en la direccion de memoria de input
 *  @param msj char: mensaje a mostrar por pantalla.
 *  @param errorMsj: mesaje de error a mostrar por pantalla
 *  @param Int min: longitud minima que no debe superar.
 *  @param Int max: longitud maxima que no debe superar.
 *  @param Int input: direccion de memoria donde almacenar el dato
 *
 *  @return     -1: si algun parametro es NULL o minimo supera a maximo
 *              0: si todo ok.
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

        retorno = 0;
    }
    return retorno;
}




/**
 *  @brief Almacena y valida un dato tipo FLOAT en la direccion de memoria de input
 *  @param msj char: mensaje a mostrar por pantalla.
 *  @param errorMsj: mesaje de error a mostrar por pantalla
 *  @param float min: longitud minima que no debe superar.
 *  @param float max: longitud maxima que no debe superar.
 *  @param float input: direccion de memoria donde almacenar el dato
 *
 *  @return     -1: si algun parametro es NULL o minimo supera a maximo
 *              0: si todo ok.
 */
int getFloat(char *msj, char *errorMsj, float minimo, float maximo, float *input)
{
    int retorno = -1;

    if(msj != NULL && errorMsj != NULL &&  maximo >= minimo && input != NULL )
    {
        printf("%s", msj);
        fflush(stdin);
        scanf("%f", input);
        floatIsValid(input, "Error, Reingrese el valor", minimo, maximo );

        retorno = 0;
    }
    return retorno;
}




/**
 *  @brief Almacena y valida un dato tipo Char en la direccion de memoria de input
 *  @param msj char: mensaje a mostrar por pantalla.
 *  @param errorMsj: mesaje de error a mostrar por pantalla
 *  @param char min: longitud minima para la validacion del char.
 *  @param char max: longitud maxima para la validacion del char.
 *  @param char input: direccion de memoria donde almacenar el dato
 *
 *  @return     -1: si algun parametro es NULL o minimo supera a maximo
 *              0: si todo ok.
 */
int getChar(char *msj, char *errorMsj, char minimo, char maximo, char *input)
{
    char buffer;
    int retorno = -1;
    if(msj != NULL && errorMsj != NULL && input != NULL && maximo >= minimo)
    {
        printf("%s", msj);
        fflush(stdin);//
        //__fpurge(stdin);
        scanf("%c", &buffer);

        if(isValidChar(buffer, minimo, maximo))
        {
            *input = buffer;
            retorno = 0;

        }
        else
        {
            printf("%s", errorMsj);
        }

    }
    return retorno;
}







/**
 *  @brief Almacena un dato tipo String en la direccion de memoria de input
 *  @param msj char: mensaje a mostrar por pantalla.
 *  @param errorMsj: mesaje de error a mostrar por pantalla
 *  @param int min: longitud minima de la cadena de caracteres.
 *  @param int max: longitud maxima de la cadena de caracteres.
 *  @param char* input: direccion de memoria donde almacenar el dato
 *
 *  @return     -1: si algun parametro es NULL o minimo supera a maximo
 *              0: si todo ok.
 */
int getString(char* msj, char* errorMsj, int minimo, int maximo, char* input)
{
    int retorno = -1;
    char bufferStr[4096];

    if(msj != NULL && errorMsj != NULL && minimo < maximo && input != NULL)
    {
            printf("%s",msj);
            //__fpurge(stdin);
            fflush(stdin);

            fgets(bufferStr,sizeof(bufferStr),stdin);
            bufferStr[strlen(bufferStr)-1] = '\0';

            if( strlen(bufferStr) >= minimo && strlen(bufferStr) < maximo)
            {
                strncpy(input ,bufferStr, maximo);
                retorno = 0;

            }
            else{
                do{
                     printf("%s",errorMsj);
                     fflush(stdin);

                     fgets(bufferStr,sizeof(bufferStr),stdin);
                     bufferStr[strlen(bufferStr)-1] = '\0';
                     if( strlen(bufferStr) >= minimo && strlen(bufferStr) < maximo)
                     {
                            strncpy(input ,bufferStr, maximo);
                            retorno = 0;
                            break;
                     }else continue;

                }while(retorno == -1);
            }


    }
    return retorno;
}















