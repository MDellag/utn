#ifndef VALIDACIONES_H_INCLUDED
#define VALIDACIONES_H_INCLUDED

int stringIsValid(char* string);

void sexIsValid(char sex);

void floatIsValid(float* flotante, char* msjError, float min, float max);

void intIsValid(int* value, int min, int max, char* msjError);

int isValidChar(char input, char min, char max);


void yearIsValid(int year);

void monthIsValid(int month);

void dayIsValid(int month, int day);


#endif // VALIDACIONES_H_INCLUDED
