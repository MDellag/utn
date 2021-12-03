using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CentralitaHerencia
{
    public interface IGuardar <T>
    {
        string RutaArchivo { get; set; }

        bool Guardar(T c);

        T Leer();
    }
}
