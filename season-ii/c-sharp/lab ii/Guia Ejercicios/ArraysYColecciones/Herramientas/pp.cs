using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;


namespace Herramientas
{
    public class pp
    {
        private static short schoolYear;
        public static int ed;

        static pp()
        {
            ed = 1;
        }

        public pp()
        {
            schoolYear = (short)DateTime.Now.Year;
        }


        public short SchoolYear
        {
            get { return pp.schoolYear; }
        }

        public void asd(string asd)
        {

        }

        public  void asd(out string asd)
        {
            asd = "";
        }

        public override string ToString()
        {
            return "Metodo ToString() Sobrecargado";
        }

        public override bool Equals(object obj)
        {
            return obj is pp;
        }

        public override int GetHashCode()
        {
            return 123456789;
        }
    }
}
