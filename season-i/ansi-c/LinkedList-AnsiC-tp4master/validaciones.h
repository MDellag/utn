#ifndef VALIDACIONES_H_INCLUDED
#define VALIDACIONES_H_INCLUDED

void intIsValid(int *value, int min, int max, char* msjError);
void floatIsValid(float flotante, char* msjError, float min, float max);
void charIsvalid(char *character, char *msjError, char min, char max);

#endif // VALIDACIONES_H_INCLUDED
