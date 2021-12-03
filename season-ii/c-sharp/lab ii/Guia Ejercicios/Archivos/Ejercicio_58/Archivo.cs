using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using ArchivoException;

namespace Ejercicio_58
{
    public abstract class Archivo
    {
        protected abstract bool ValidarArchivo(string ruta, bool validaExistencia);
        
    }
}
