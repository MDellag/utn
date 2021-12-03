using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clase_Enum
{
    class Program
    {
        //Enumeraciones
        /** Las enumeraciones son un tipo que agrupan constantes numericas con nombres
         */ 
        public enum Cargo
        {
            //Poner las variables con primera letra en Mayuscula
           Auditor, Secretario, Jefe
        }

        
        static void Main(string[] args)
        {
            Console.Title = "Clase Enumeraciones";


            Console.WriteLine(Cargo.Jefe);

            Console.ReadKey();
        }
    }
}
