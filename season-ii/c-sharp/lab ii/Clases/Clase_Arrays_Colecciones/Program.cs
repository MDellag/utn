using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clase_Arrays_Colecciones
{
    class Program
    {
        //Ejemplo para el List.Sort();
        public static int ordenar(string s1, string s2)
        {
            int aux;
            if (s1.CompareTo(s2) == 1)
            {
                aux = 1;
            }
            else if (s1.CompareTo(s2) == -1)
            {
                aux = -1;
            }
            else
            {
                aux = 0;
            }
            return -aux;
        }

        static void Main(string[] args)
        {
            //Coleciones Genericas
            //List  | Que tenga las llaves <type> quiere decir que es generico

            List<string> lista = new List<string>();
            lista.Add("Ejemplo de List.add");
            lista.Add("Ejemplo de add 2");
            lista.Add("Ejemplo de add 11");
            lista.Add("Ejemplo de add 7");
            lista.Add("Ejemplo de add 4");

            //Ejemplos de Remover, por nombre o por indice
            lista.Remove("Ejemplo de add 2");
            lista.RemoveAt(0); //Remueve el indice 0 osea el 1er elemento


            //Sort | ordena segun el tipo | averiguar como ordea para objetos creados por el desarrollador
            //      se le pasa como argumento el puntero al metodo, si se le pone los parentesis (), en cambio, se llama al metodo.
            lista.Sort(Program.ordenar);

            foreach (string item in lista)
            {
                //Ejemplo de Imprimir una Lista.
                Console.WriteLine(item);
            }



            //Dictionary

            Dictionary<int, string> diccionario = new Dictionary<int, string>();

            diccionario.Add(1, "Juli");
            diccionario.Add(2, "Sergio");
            diccionario.Add(3, "Migue");

            //recorrer Dictionary
            foreach (KeyValuePair<int, string> item in diccionario)
            {
                Console.WriteLine("{0} : {1}", item.Key, item.Value);
            }

            foreach (string item in diccionario.Values)
            {
                //recorre solo los values
                Console.WriteLine("{0}", item);
            }

            foreach (int item in diccionario.Keys)
            {
                //recorre solo los keys
                Console.WriteLine("{0}", item);
            }

            //Remove | se utiliza la Key para remover.
            diccionario.Remove(1); //borra juli porq tiene key 1



            //Queue  // Colas | Queue : primero en entrar, primero en salir
            Queue<string> cola = new Queue<string>();

            cola.Enqueue("Valor1Queue");
            cola.Enqueue("Valor2Queue");
            cola.Enqueue("Valor4Queue");
            cola.Enqueue("Valor3Queue");

            //Una forma opcional de recorrer una cola.
            while (cola.Count > 0)
            {
                //dequeue quita un elemento de la cola y ademas devuelve el valor.
                Console.WriteLine(cola.Dequeue());
            }



            //Stack

            Stack<int> pila = new Stack<int>();
            //Push ingresa un valor
            pila.Push(515);
            pila.Push(333);
            pila.Push(124);
            pila.Push(723);

            while (pila.Count > 0)
            {
                // STACK | PILAS  : Ultimo en entrar, primero en salir
                Console.WriteLine(pila.Pop());
            }



            /* ----- NO Genericas ----- */

            //queue ej * Para lo demas es identico
            System.Collections.Queue colaNoGenerica = new System.Collections.Queue();

            colaNoGenerica.Enqueue(2);
            colaNoGenerica.Enqueue("Tutu");
            colaNoGenerica.Enqueue(new Persona(1));
            colaNoGenerica.Enqueue(1.5);

            foreach (object item in colaNoGenerica)
            {
                Console.WriteLine(item);
            }

            while (colaNoGenerica.Count > 0)
            {
                Console.WriteLine(colaNoGenerica.Dequeue());
            }

            Console.ReadKey();
        }

        
    }
}
