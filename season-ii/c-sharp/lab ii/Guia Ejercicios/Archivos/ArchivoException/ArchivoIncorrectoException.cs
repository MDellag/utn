using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchivoException
{
    public class ArchivoIncorrectoException : Exception
    {
        public ArchivoIncorrectoException(string mensaje, Exception innerException)
            :base(mensaje, innerException)
        { }

        public ArchivoIncorrectoException(string mensaje)
        : this(mensaje, null)
        {

        }
    }
}
