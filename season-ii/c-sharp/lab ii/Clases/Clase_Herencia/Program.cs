using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clase_Herencia
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Title = "Clase_Herencia";

            Persona a = new Alumno("Ena", 2);

            Console.Write("Es alumno? {0}\n", a is Alumno ? "Si" : "No");
            Console.Write("Es alumno? {0}\n", a is String ? "Si" : "No");
            Console.Write("Es alumno? {0}", a is Persona ? "Si" : "No");
            Console.ReadKey();
        }
    }
}
