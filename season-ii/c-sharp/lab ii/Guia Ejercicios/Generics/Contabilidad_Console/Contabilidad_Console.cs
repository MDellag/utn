using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ejercicio_48;

namespace Contabilidad_Console
{
    class Contabilidad_Console
    {
        static void Main(string[] args)
        {
            Console.Title = "Ejercicio_48";


            Contabilidad<Factura, Recibo> contab = new Contabilidad<Factura, Recibo>();

            Factura fac1 = new Factura(22);
            Factura fac2 = new Factura(28);
            Factura fac3 = new Factura(23);

            Recibo rec1 = new Recibo(4);
            Recibo rec2 = new Recibo(5);
            Recibo rec3 = new Recibo(3);

            contab += fac1;
            contab += fac2;
            contab += fac3;

            contab += rec1;
            contab += rec2;
            contab += rec3;

            Console.WriteLine(contab.ToString());

            Console.ReadKey();
        }
    }
}
