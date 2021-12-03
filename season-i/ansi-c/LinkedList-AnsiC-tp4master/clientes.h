#ifndef CLIENTES_H_INCLUDED
#define CLIENTES_H_INCLUDED

typedef struct {

     int id;
    char descripcion[200];
     int precio;
     int idTipo;
}eComputer;



eComputer* device_newParametros(char* idStr, char* descripcionStr, char* precioStr, char* idTipoStr);
eComputer* device_new();

int device_setId(eComputer* this, int id);
int device_setPrecio(eComputer* this, int precio);
int device_setDescripcion(eComputer* this, char* descripcion);
int device_setIdTipo(eComputer* this, int idTipo);

int device_getId(eComputer* this);
int device_getIdTipo(eComputer* this);
int device_getPrecio(eComputer* this);
int device_getDescripcion(eComputer* this, char* descripcion);



#endif // CLIENTES_H_INCLUDED
