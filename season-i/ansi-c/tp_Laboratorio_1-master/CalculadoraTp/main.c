/******************************************************************************
* Programa: Calculadora. Trabajo Practico N_1
*
* Objetivo:
*          Hacer una calculadora. Para ello el programa iniciará y contará con un menú de opciones:
*      1. Ingresar 1er operando (A=x)
*      2. Ingresar 2do operando (B=y)
*      3. Calcular todas las operaciones:
*       a) Calcular la suma (A+B)
*       b) Calcular la resta (A-B)
*       c) Calcular la division (A/B)
*       d) Calcular la multiplicacion (A*B)
*       e) Calcular el factorial (A!)
*
*      4. Informar resultados
*       a) “El resultado de A+B es: r”
*       b) “El resultado de A-B es: r”
*       c) “El resultado de A/B es: r” o “No es posible dividir por cero”
*       d) “El resultado de A*B es: r”
*       e) “El factorial de A es: r1 y El factorial de B es: r2”
*      5. Salir
*
* Alumno: Dellagiovanna Mauricio
* Comision: 1F
*******************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <conio.h>
#include "calculadora.h"

int main()
{
    system("color f0");

    //variables
    int a, b;

    char continuar = 'S';

    printf("  Bienvenido a la Calculadora  ");

    while(continuar == 'S')
    { /*  Mientras continuar sea igual a S mayuscula el programa
       *  continua ejecutandose
       */


       a = getInt("\n\nIngrese un valor para A -->  "); //Funcion declarada en calculadora.c. toma un valor dado por el usuario y lo almacena en 'a'
       b = getInt("\nIngrese un valor para B -->  ");

       // Imprime por pantalla las operaciones matematicas
       printSuma(a, b);
       printResta(a, b);
       printDivision(a, b);
       printMultiplicacion(a, b);
       printFactorial(a, b);


         do{ //Pregunta al usuario si desea correr el programa una vez mas.
            printf("\n\n\nRealizar otra Operacion?  S/N ");

            fflush(stdin); //win
            continuar = toupper(getch());

            if(continuar == 'S')
            {

                system("cls");
            }
         } while(continuar != 'S' && continuar != 'N');
    }

    return 0;
}
