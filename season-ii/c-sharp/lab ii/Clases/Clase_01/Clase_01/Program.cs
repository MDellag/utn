using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clase_01
{
    class Program
    {
        static void Main(string[] args)
        {
            string[] anyName = new string[3] { "Asd", "EQW", "ptt" };


            foreach (var item in anyName)
            {
                Console.WriteLine(item);
            }

            float e = (float)10.476; 
            // El ###.000 los 0 representan los decimales luego de la coma.
            Console.WriteLine("{0,10:###,###.000} {1,10}", e, 15.355);

            Console.ReadKey();
        }
    }
}
