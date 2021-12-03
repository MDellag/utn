using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestParcial
{
    class Program
    {
        static void Main(string[] args)
        {
            School escuela = new School("as");
            School escuela2 = new School("as");
            Console.WriteLine(escuela.SchoolYear);

            SortedList<int, School> sListEscul = new SortedList<int, School>();

            sListEscul[0] = escuela;
            sListEscul[1] = escuela2;

            for (int i = 0; i < 2; i++)
            {
                Console.WriteLine(sListEscul[i].SchoolYear);
            }


            Console.ReadKey();
        }
    }
}
