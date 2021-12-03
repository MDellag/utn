using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericTest
{
    class Program
    {
        static void Main(string[] args)
        {
            //Mensaje<String> msj = new Mensaje<string>();

            //msj[0] = "Hola";

            //for (int i = 0; i < msj.Length; i++)
            //{
            //    Console.WriteLine(msj[0]);
            //}

            Dictionary<int, int> dic = new Dictionary<int, int>();
            Stack pila = new Stack();

            dic.Add(111, 333);
            dic.Add(222, 444);
            dic.Add(333, 555);

            foreach (KeyValuePair<int, int> item in dic)
            {
                pila.Push(item.Key);
            }

            Console.WriteLine(pila.Pop());

        }


       
        public void a(string a, int b)
        {

        }

        public void a(int c, string d)
        {

        }

        public void a()
        {

        }

    }
}
