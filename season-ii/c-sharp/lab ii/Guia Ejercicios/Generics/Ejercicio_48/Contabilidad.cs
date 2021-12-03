using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ejercicio_48
{
    public class Contabilidad<T, U> where U : Documento, new() where T : Documento  
    {

        private List<T> egresos;
        private List<U> ingresos;

        public Contabilidad()
        {
            egresos = new List<T>();
            ingresos = new List<U>();
        }

        public static Contabilidad<T, U> operator +(Contabilidad<T, U> c, T egreso)
        {
            c.egresos.Add(egreso);
                return c;
        }

        public static Contabilidad<T, U> operator +(Contabilidad<T,U> c, U ingreso)
        {
            c.ingresos.Add(ingreso);
            return c;
        }

        public override string ToString()
        {
            StringBuilder inf = new StringBuilder();

            inf.AppendFormat("Cantidad Elementos: {0}\n\n", egresos.Count + ingresos.Count);

            foreach (T item in egresos)
            {
                inf.AppendFormat("{0}\n", item.Num);
            }

            foreach(U item in ingresos)
            {
                inf.AppendFormat("{0}\n", item.Num);
            }

            return inf.ToString();
        }
    }
}
