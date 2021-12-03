

int suma(int a, int b)
{  /*
  * \brief   Realiza la Suma de A y B
  * \parametro  A, B. Numeros ingresados por el usuario
  * \Return. Devuelve la Suma entre A y B.
  */

    return a + b;
}



int resta(int a, int b)
{  /*
  * \brief   Realiza la Resta de A y B
  * \parametro  A, B. Numeros ingresados por el usuario
  * \Return. Devuelve la Resta entre A y B.
  */

    return a - b;
}



int multiplicacion(int a, int b)
{ /*
  * \brief   Realiza la multiplicacion de A y B
  * \parametro  A, B. Numeros ingresados por el usuario
  * \Return. Devuelve la Multiplicacion entre A y B.
  */

    return a * b;
}



float division(float a, float b)
{ /*
  * \brief   Realiza la Division de A y B
  * \parametro  A, B. Numeros ingresados por el usuario
  * \Return. Devuelve la Division entre A y B.
  */

      return a/b;

}



int factorial(int x)
{ /*
  * \brief   Realiza el factorial de X
  * \parametro  X. Numero ingresado por el usuario
  * \Return. Devuelve el factorial de X.
  */
  int respuesta;
  int num;

  respuesta = 1;

  for(num = 1 ; num <= x ; ++num)
  {
    respuesta *= num;
  }

   return respuesta;
}



float getFloat(char mensaje[])
{/*
  * \brief Solicita un numero al usuario y devuelve el resultado
  * \parametro mensaje. Es el mensaje a ser mostrado
  * \Return El numero ingresado por el usuario
  */

    float auxiliar;

    printf("%s", mensaje);
    scanf("%f", &auxiliar);
    return auxiliar;
}


int getInt(char mensaje[])
{/*
  * \brief Solicita un numero al usuario y devuelve el resultado
  * \parametro mensaje. Es el mensaje a ser mostrado
  * \Return El numero ingresado por el usuario
  */

    int auxiliar;

    printf("%s", mensaje);
    scanf("%i", &auxiliar);
    return auxiliar;
}


void printSuma(int a, int b)
{/*
  * \brief   Imprime por consola la suma entre A y B
  * \parametro    A y B. Necesario para realizar la Suma()
  */

    printf("\nEl resultado de A+B es: %i \n\n\n", suma(a, b));
}


void printResta(int a, int b)
{/*
  * \brief   Imprime por consola la Resta entre A y B
  * \parametro    A y B. Necesario para realizar la Resta()
  */

    printf("\nEl resultado de A-B es: %i \n\n\n", resta(a, b));
}


void printMultiplicacion(int a, int b)
{/*
  * \brief   Imprime por consola la Multiplicacion entre A y B
  * \parametro    A y B. Necesario para realizar la Multiplicacion()
  */

    printf("\nEl resultado de A*B es: %i \n\n\n", multiplicacion(a, b));
}


void printDivision(float a, float b)
{/*
  * \brief   Imprime por consola la Division entre A y B, si B es 0,
  * imprime por pantalla que no es posible dividir por 0
  * \parametro    A y B. Necesario para realizar la Division()
  */
    if(b == 0)
    {
        printf("\nNo es posible dividir por cero. \n\n\n");

    }
    else {

    printf("\nEl resultado de A/B es: %.2f \n\n\n", division(a, b));

    }
}


void printFactorial(int a, int b)
{/*
  * \brief   Imprime por consola el Factorial de  A y B
  * \parametro    A y B. Necesario para realizar el Factorial()
  */

    printf("\nEl Factorial de A es: %i   \nEl Factorial de B es: %i \n\n\n", factorial(a), factorial(b));
}
