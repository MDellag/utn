#ifndef UTN_H_INCLUDED
#define UTN_H_INCLUDED

int getInt(char *msj, char *errorMsj, int minimo, int maximo, int *input);

int getFloat(char *msj, char *errorMsj, float minimo, float maximo, float *input);

int getChar(char *msj, char *errorMsj, char minimo, char maximo, char *input);

int getString(char* msj, char* errorMsj, int minimo, int maximo, char* input);

#endif // UTN_H_INCLUDED
