#ifndef CALCULADORA_H_INCLUDED
#define CALCULADORA_H_INCLUDED

int suma(int a, int b);
int resta(int a, int b);
float division(float a, float b);
int multiplicacion(int a, int b);
int factorial(int x);

float getFloat(char mensaje[]);
int getInt(char mensaje[]);

void printSuma(int a, int b);
void printResta(int a, int b);
void printMultiplicacion(int a, int b);
void printDivision(float a, float b);
void printFactorial(int a, int b);

#endif // CALCULADORA_H_INCLUDED



