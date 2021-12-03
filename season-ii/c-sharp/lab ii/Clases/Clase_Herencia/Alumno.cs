using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clase_Herencia
{
    public class Alumno : Persona
    {
        private int matricula;
        private string carrera;
        public Alumno(string nombre, int dni)
            :base(nombre, dni) // Base toma el constructor de la clase padre
        {

        }
    }
}
