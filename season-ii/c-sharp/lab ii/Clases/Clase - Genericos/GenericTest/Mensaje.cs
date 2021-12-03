using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericTest
{
    public class Mensaje<T>
    {
        private List<T> msj = new List<T>();

        public T this[int index]
        {
            get
            {
                return this.msj[index];
            }
            set
            {
                msj.Add(value);
            }
        }


        public int Length
        {
            get { return msj.Count(); }
        }

    }
}
