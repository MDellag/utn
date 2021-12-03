#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "LinkedList.h"


static Node* getNode(LinkedList* this, int nodeIndex);

static int addNode(LinkedList* this, int nodeIndex,void* pElement);


/** \brief Crea un nuevo LinkedList en memoria de manera dinamica
 *
 *  \param void
 *  \return LinkedList* Retorna (NULL) en el caso de no conseguir espacio en memoria
 *                      o el puntero al espacio reservado
 */
LinkedList* ll_newLinkedList(void)
{
    LinkedList* this= NULL;

    this = (LinkedList*)malloc(sizeof(LinkedList));

    if(this != NULL)
    {
        this->size = 0;
        this->pFirstNode = NULL;
    }

    return this;
}

/** \brief Retorna la cantidad de elementos de la lista
 *
 * \param this LinkedList* Puntero a la lista
 * \return int Retorna (-1) si el puntero es NULL o la cantidad de elementos de la lista
 *
 */
int ll_len(LinkedList* this)
{
    int returnAux = -1;

    if(this != NULL)
    {
        returnAux = this->size;
    }

    return returnAux;
}


/** \brief  Obtiene un nodo de la lista
 *
 * \param this LinkedList* Puntero a la lista
 * \param nodeIndex int: Indice del nodo a obtener
 * \return Node* Retorna  (NULL) Error: si el puntero a la lista es NULL o (si el indice es menor a 0 o mayor al len de la lista)
                        (pNode) Si funciono correctamente
 *
 */
static Node* getNode(LinkedList* this, int nodeIndex)
{
    int a;
    Node* node = NULL;
    if(this != NULL && nodeIndex >= 0 && nodeIndex < ll_len(this))
    {
        node = this->pFirstNode;
        for(a = 0; a < nodeIndex; a++)//cuando nodeindex sea 0 el primer nodo va a sguir siendo el primero que en este caso es null porque la lista esta vacia
        {
            node = node->pNextNode;//cuando a!=0 pNode apunta al que sigue hasta que no se pueda iterar mas el ultimo ya se que es null

        }
    }

    return node;
}

/** \brief  Permite realizar el test de la funcion getNode la cual es privada
 *
 * \param this LinkedList* Puntero a la lista
 * \param index int Indice del nodo a obtener
 * \return Node* Retorna  (NULL) Error: si el puntero a la lista es NULL o (si el indice es menor a 0 o mayor al len de la lista)
                        (pElement) Si funciono correctamente
 *
 */
Node* test_getNode(LinkedList* this, int nodeIndex)
{
    return getNode(this, nodeIndex);
}


/** \brief Agrega y enlaza un nuevo nodo a la lista
 *
 * \param this LinkedList* Puntero a la lista
 * \param nodeIndex int Ubicacion donde se agregara el nuevo nodo
 * \param pElement void* Puntero al elemento a ser contenido por el nuevo nodo
 * \return int Retorna  (-1) Error: si el puntero a la lista es NULL o (si el indice es menor a 0 o mayor al len de la lista)
 *                      ( 0) Si funciono correctamente
 *
 */
static int addNode(LinkedList* this, int nodeIndex, void* pElement)
{
    int returnAux = -1;
    Node* newNode;
    Node* node;

    if(this != NULL && nodeIndex >= 0 && nodeIndex <= ll_len(this))
    {
        newNode = (Node*) malloc(sizeof(Node)); //newNode recibe espacion en memoria del tama�o NODE(struct)
        if(newNode != NULL)
        {
            newNode->pElement = pElement;  //Asigna al elemento de newNode la direccion de memoria del elemento pasado por parametro

            if(nodeIndex == 0) //Verifica si nodeIndex (pasado por parametro) es igual a 0 (osea el primer nodo, nunca se agrego otro nodo)
            {
                if(this->pFirstNode == NULL)
                {
                    newNode->pNextNode = NULL;  // Si el primer nodo de la lista pasada por parametro es NULL el siguiente Nodo del newNodo se setea como NULL
                }
                else if(this->pFirstNode != NULL)
                {
                    newNode->pNextNode = this->pFirstNode; // Si el primer nodo de la lista pasada por parametro es diferente de NULL, el valor que contenga este sera asignado al proximo nodo de newNode
                }

                this->pFirstNode = newNode;
            }
            else
            {
                node = getNode(this, nodeIndex - 1);    //node ahora posee los elementos del nodo anterior al indexado
                newNode->pNextNode = node->pNextNode;   // el siguiente Nodo de newNode ahora tiene almacenado el siguiente nodo del anterior
                node->pNextNode = newNode;              //el siguiente nodo de Node ahora es newNode
            }
            this->size++;

        }

        returnAux = 0;
    }

    return returnAux;
}

/** \brief Permite realizar el test de la funcion addNode la cual es privada
 *
 * \param this LinkedList* Puntero a la lista
 * \param nodeIndex int Ubicacion donde se agregara el nuevo nodo
 * \param pElement void* Puntero al elemento a ser contenido por el nuevo nodo
  * \return int Retorna  (-1) Error: si el puntero a la lista es NULL o (si el indice es menor a 0 o mayor al len de la lista)
                        ( 0) Si funciono correctamente
 *
 */
int test_addNode(LinkedList* this, int nodeIndex,void* pElement)
{
    return addNode(this,nodeIndex,pElement);
}


/** \brief  Agrega un elemento a la lista
 * \param this LinkedList* Puntero a la lista
 * \param pElement void* Puntero al elemento a ser agregado
 * \return int Retorna  (-1) Error: si el puntero a la lista es NULL
                        ( 0) Si funciono correctamente
 *
 */
int ll_add(LinkedList* this, void* pElement)
{
    int returnAux = -1;
    int index;
    if(this != NULL)
    {
        index = ll_len(this);
        addNode(this, index, pElement );

        returnAux = 0;
    }


    return returnAux;
}

/** \brief Permite realizar el test de la funcion addNode la cual es privada
 *
 * \param this LinkedList* Puntero a la lista
 * \param nodeIndex int Ubicacion del elemento a obtener
 * \return void* Retorna    (NULL) Error: si el puntero a la lista es NULL o (si el indice es menor a 0 o mayor al len de la lista)
                            (pElement) Si funciono correctamente
 *
 */
void* ll_get(LinkedList* this, int index)
{
    void* returnAux = NULL;
    Node* node; //Utilizado para almacenar y devolver la direccion de memoria que conlleva al elemento requerido

    if(this != NULL && index >= 0 && index <= ll_len(this))
    {
        node = getNode(this, index);

        if(node != NULL)
        returnAux = node->pElement;     //Asigna a la variable return aux el elemento del nodo especificado
    }

    return returnAux;
}


/** \brief Modifica un elemento de la lista
 *
 * \param this LinkedList* Puntero a la lista
 * \param nodeIndex int Ubicacion del elemento a modificar
 * \param pElement void* Puntero al nuevo elemento
 * \return int Retorna  (-1) Error: si el puntero a la lista es NULL o (si el indice es menor a 0 o mayor al len de la lista)
                        ( 0) Si funciono correctamente
 *
 */
int ll_set(LinkedList* this, int index, void* pElement)
{
    int returnAux = -1;
    Node* node;

    if(this != NULL && index >= 0 && index < ll_len(this) )
    {
        node = getNode(this, index);

        if(node != NULL)
        {
            node->pElement = pElement;
            returnAux = 0;
        }


    }


    return returnAux;
}


/** \brief Elimina un elemento de la lista
 *
 * \param this LinkedList* Puntero a la lista
 * \param nodeIndex int Ubicacion del elemento a eliminar
 * \return int Retorna  (-1) Error: si el puntero a la lista es NULL o (si el indice es menor a 0 o mayor al len de la lista)
                        ( 0) Si funciono correctamente
 *
 */
int ll_remove(LinkedList* this, int index)
{
    int returnAux = -1;
    Node* nodeIndex = NULL;
    Node* previousNode = NULL;

    if(this != NULL && index >= 0 && index < ll_len(this))
    {
       if(index > 0)
       {
           nodeIndex = getNode(this, index);
           previousNode = getNode(this, index - 1);
           if(nodeIndex != NULL)
           {
                   previousNode->pNextNode = nodeIndex->pNextNode; //almaceno el siguiente nodo del nodo actual en el siguiente nodo del nodoAnterior
           }
       }
       else{
           this->pFirstNode = getNode(this, index + 1 );
       }

        free(nodeIndex);
        this->size--;
        returnAux = 0;
    }

    return returnAux;
}


/** \brief Elimina todos los elementos de la lista
 *
 * \param this LinkedList* Puntero a la lista
 * \return int Retorna  (-1) Error: si el puntero a la lista es NULL
                        ( 0) Si funciono correctamente
 *
 */
int ll_clear(LinkedList* this)
{
    int returnAux = -1;
    int a;

    if(this != NULL)
    {
        for (a = 0; a < ll_len(this) ; a++) { //recorre Nodo por Nodo de la Lista y borra uno por uno

            ll_remove(this, a);
        }
        returnAux = 0;
    }

    return returnAux;
}


/** \brief Elimina todos los elementos de la lista y la lista
 *
 * \param this LinkedList* Puntero a la lista
 * \return int Retorna  (-1) Error: si el puntero a la lista es NULL
                        ( 0) Si funciono correctamente
 *
 */
int ll_deleteLinkedList(LinkedList* this)
{
    int returnAux = -1;

    if(this != NULL)
    {
        ll_clear(this);
        free(this);
        returnAux = 0;
    }

    return returnAux;
}

/** \brief Busca el indice de la primer ocurrencia del elemento pasado como parametro
 *
 * \param this LinkedList* Puntero a la lista
 * \param pElement void* Puntero al elemento
 * \return int Retorna  (-1) Error: si el puntero a la lista es NULL
                        (indice del elemento) Si funciono correctamente
 *
 */
int ll_indexOf(LinkedList* this, void* pElement)    //Salio de casualidad, no se que hace..
{
    int returnAux = -1;
    int a;

    Node* node = NULL;

    if(this != NULL)
    {
        for (a = 0; a < ll_len(this) ; a++) {
            node = getNode(this, a);

            if(node->pElement == pElement)
                returnAux = a;
                break;
        }
    }

    return returnAux;
}

/** \brief Indica si la lista esta o no vacia
 *
 * \param this LinkedList* Puntero a la lista
 * \return int Retorna  (-1) Error: si el puntero a la lista es NULL
                        ( 0) Si la lista NO esta vacia
                        ( 1) Si la lista esta vacia
 *
 */
int ll_isEmpty(LinkedList* this)
{
    int returnAux = -1;

    if(this != NULL)
    {
        if(ll_len(this) == NULL){
            returnAux = 1;
        }else   returnAux = 0;

    }


    return returnAux;
}

/** \brief Inserta un nuevo elemento en la lista en la posicion indicada
 *
 * \param this LinkedList* Puntero a la lista
 * \param nodeIndex int Ubicacion donde se agregara el nuevo elemento
 * \param pElement void* Puntero al nuevo elemento
 * \return int Retorna  (-1) Error: si el puntero a la lista es NULL o (si el indice es menor a 0 o mayor al len de la lista)
                        ( 0) Si funciono correctamente
 *
 */
int ll_push(LinkedList* this, int index, void* pElement)
{
         int returnAux = -1;                                     //Se agrega un elemento nuevo a la lista, pero en lugar de la ult posicion, se hace en una posicion deseada..
                                                                    // Moviendo asi otro elemento hacia delante o atras

    if( this != NULL && index >= 0 && index <= ll_len(this) )
    {
        addNode(this, index, pElement);
        returnAux = 0;
    }

    return returnAux;
}


/** \brief Elimina el elemento de la posicion indicada y retorna su puntero
 *
 * \param this LinkedList* Puntero a la lista
 * \param nodeIndex int Ubicacion del elemento eliminar
 * \return void* Retorna    (NULL) Error: si el puntero a la lista es NULL o (si el indice es menor a 0 o mayor al len de la lista)
                            (pElement) Si funciono correctamente
 *
 */
void* ll_pop(LinkedList* this, int index)       //dentro de ll_get() se encuenta getNode y se pasa por return la direccion de memoria del pElement del nodo asignado
{
    void* returnAux = NULL;
    Node* node;

    if(this != NULL && index >= 0 && index < ll_len(this))
    {
        node = ll_get(this, index);
        returnAux = node;

        ll_remove(this, index);
    }

    return returnAux;
}


/** \brief  Determina si la lista contiene o no el elemento pasado como parametro
 *
 * \param this LinkedList* Puntero a la lista
 * \param pElement void* Puntero del elemento a verificar
 * \return int Retorna  (-1) Error: si el puntero a la lista es NULL
                        ( 1) Si contiene el elemento
                        ( 0) si No contiene el elemento
*/
int ll_contains(LinkedList* this, void* pElement)
{
    int returnAux = -1;
    int a;
    Node* node = NULL;

    if(this != NULL )
    {
        for(a = 0; a <= ll_len(this); a++){

            node = getNode(this, a);
            if( node != NULL && node->pElement == pElement )
            {
                returnAux = 1;
                break;
            } else{
                returnAux = 0;
             }
        }
    }
    return returnAux;
}

/** \brief  Determina si todos los elementos de la lista (this2)
            estan contenidos en la lista (this)
 *
 * \param this LinkedList* Puntero a la lista
 * \param this2 LinkedList* Puntero a la lista
 * \return int Retorna  (-1) Error: si alguno de los punteros a las listas son NULL
                        ( 1) Si los elementos de (this2) estan contenidos en la lista (this)
                        ( 0) si los elementos de (this2) NO estan contenidos en la lista (this)
*/
int ll_containsAll(LinkedList* this, LinkedList* this2)
{
    int returnAux = -1;
    int a;
    void* pElement;         //Recordar que void* se puede usar cuando se necesita un elemento y no se lo tiene..

    if(this != NULL && this2 != NULL)
    {
        returnAux = 1;      //por que aca si pongo 0 y en el if lo equivalo a 1 y retornoaux en el if retorno 1 me da error el test?
        for (a = 0; a < ll_len(this); a++) {

            pElement = ll_get(this2, a);
            if(ll_contains(this, pElement) == 0)
            {
                returnAux = 0;
                break;
            }
        }
    }
    return returnAux;
}

/** \brief Crea y retorna una nueva lista con los elementos indicados
 *
 * \param pList LinkedList* Puntero a la lista
 * \param from int Indice desde el cual se copian los elementos en la nueva lista
 * \param to int Indice hasta el cual se copian los elementos en la nueva lista (no incluido)
 * \return LinkedList* Retorna  (NULL) Error: si el puntero a la listas es NULL
                                o (si el indice from es menor a 0 o mayor al len de la lista)
                                o (si el indice to es menor o igual a from o mayor al len de la lista)
                         (puntero a la nueva lista) Si ok
*/
LinkedList* ll_subList(LinkedList* this, int from, int to)
{
    LinkedList* cloneArray = NULL;
    int a;
    void* pElement;

    if(this != NULL && from >= 0 && from <= ll_len(this) && to >= from && to <= ll_len(this))
    {
        cloneArray = ll_newLinkedList();
        for(a = from; a <= to; a++)
        {
            pElement = ll_get(this, a);
            ll_add(cloneArray, pElement);
        }

    }

    return cloneArray;
}



/** \brief Crea y retorna una nueva lista con los elementos de la lista pasada como parametro
 *
 * \param pList LinkedList* Puntero a la lista
 * \return LinkedList* Retorna  (NULL) Error: si el puntero a la listas es NULL
                                (puntero a la nueva lista) Si ok
*/
LinkedList* ll_clone(LinkedList* this)
{
    LinkedList* cloneArray = NULL;
    void* pElement;
    int a;

    if(this != NULL )
    {
        cloneArray = ll_newLinkedList();
        for(a = 0; a <= ll_len(this); a++)
        {
            pElement = ll_get(this, a);
            ll_add(cloneArray, pElement);
        }
    }

    return cloneArray;
}


/** \brief Ordena los elementos de la lista utilizando la funcion criterio recibida como parametro
 * \param pList LinkedList* Puntero a la lista
 * \param pFunc (*pFunc) Puntero a la funcion criterio
 * \param order int  [1] Indica orden ascendente - [0] Indica orden descendente
 * \return int Retorna  (-1) Error: si el puntero a la listas es NULL
                                ( 0) Si ok
 */
int ll_sort(LinkedList* this, int (*pFunc)(void* ,void*), int order)
{
     int returnAux = -1;

     int a;
     int cambio;
     void* pElementA;       //variable para almacenar los elementos de la lista
     void* pElementB;       //variable para almacenar el siguiente elemento de la lista

    if (this != NULL && (order == 0 || order == 1) && pFunc != NULL)
    {
        while(cambio)
        {
            cambio = 0;
            for ( a = 0; a < ll_len(this)  - 1; a++)  //ll_len(this) se le resta 1 para que no explote el pElementB
            {
                pElementA = ll_get(this, a);    //el primer elemento de la lista this
                pElementB = ll_get(this, a + 1);    // el siguiente elemento de la lista list respecto a pElementA


                if ( ((pFunc(pElementA,pElementB) > 0) && order == 1) || ((pFunc(pElementA,pElementB) < 0) && order == 0))
                {                                               // 1 ascendente, 0 descendente
                    cambio = 1;
                    ll_set(this, a, pElementB);
                    ll_set(this, a+1, pElementA);
                }else continue;
            }
        }
        returnAux = 0;
    }

    return returnAux;

}


/**
 * @brief mappea los elementos de la lista utilizando la funcion criterio recibida como parametro
 * @param this
 * @param pFunc
 *
 * @return void.
 */
void ll_map(LinkedList* this, void (*pFunc)(void *))
{
    int a;

    if(this != NULL && pFunc != NULL)
    {
        for (a = 0; a < ll_len(this) ; a++) {
            pFunc(ll_get(this, a));
        }
    }
}


/**
 * @brief Filtra elementos de la lista pasada por parametro, utilizando la funcion criterio recibida como parametro
 * @param this
 * @param pFunc
 *
 * @return filterList: Lista con elementos filtrados
 */
LinkedList* ll_filter(LinkedList* this, int (*pFunc)(void*))
{
     LinkedList* filterList;
     int a;

     if(this != NULL && pFunc != NULL)
     {
         filterList = ll_newLinkedList();

         if(filterList != NULL)
         {
             for (a = 0; a < ll_len(this) ; a++)
             {
                if(pFunc(ll_get(this, a)))
                {
                    ll_add(filterList, ll_get(this, a));
                }
             }
         }
     }
     return filterList;
}
