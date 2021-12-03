#ifndef INPUT_H_INCLUDED
#define INPUT_H_INCLUDED

int getInt(char *msj, char *errorMsj, int minimo, int maximo, int *input);
int getFloat(char *msj, char *errorMsj, float minimo, float maximo, float *input);
int getString(char* msj, char* msjError, int minimo, int maximo, char* input);
int getChar(char *msj, char *msjError, char minimo, char maximo, char *input);


#endif // INPUT_H_INCLUDED
