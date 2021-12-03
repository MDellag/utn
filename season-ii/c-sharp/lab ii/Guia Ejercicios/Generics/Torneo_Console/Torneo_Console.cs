using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ejercicio_47;

namespace Torneo_Console
{
    class Torneo_Console
    {
        static void Main(string[] args)
        {
            DateTime date = new DateTime();
            EquipoBasket b1 = new EquipoBasket("Nikes", date.Date);
            EquipoBasket b2 = new EquipoBasket("NBA", date.Date);
            EquipoBasket b3 = new EquipoBasket("Jaguar", date.Date);

            EquipoFutbol f1 = new EquipoFutbol("Japon", date.Date);
            EquipoFutbol f2 = new EquipoFutbol("Francia", date.Date);
            EquipoFutbol f3 = new EquipoFutbol("Brasil", date.Date);

            Torneo<EquipoFutbol> t1 = new Torneo<EquipoFutbol>("Torneo Futbol");
            Torneo<EquipoBasket> t2 = new Torneo<EquipoBasket>("Torneo Basket");

            t1 += f1;
            t1 += f2;
            t1 += f3;

            t2 += b1;
            t2 += b2;
            t2 += b3;

            Console.WriteLine(t1.JugarPartido);
            Console.WriteLine(t2.JugarPartido);

            //Console.WriteLine(b1.Ficha());
            //Console.WriteLine(b2.Ficha());
            //Console.WriteLine(b3.Ficha());
            //Console.WriteLine(f1.Ficha());
            //Console.WriteLine(f2.Ficha());
            //Console.WriteLine(f3.Ficha());

            

            Console.ReadKey();
        }
    }
}
