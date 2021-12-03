using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;
using System.Threading.Tasks;

namespace Herramientas
{
    public class Mascota : Animal
    {
        private string name;

        public Mascota(string name, Especie especie)
            :base(especie)
        {
            this.name = name;
        }

        
        public String Nombre
        {
            get { return this.name; }
        }
    }
}
