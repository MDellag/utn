using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ejercicio_61
{
    public class Persona
    {
        private int id;
        private string nombre;
        private string apellido;

        public Persona(string nombre, string apellido)
        {
            this.nombre = nombre;
            this.apellido = apellido;
        }

        public Persona(string nombre, string apellido, int id)
            : this(nombre, apellido)
        {
            this.id = id;
        }

        public static bool operator ==(Persona p1, Persona p2)
        {
            bool sonIguales = false;

            if (p1.nombre == p2.nombre && p1.apellido == p2.apellido)
            {
                sonIguales = true;
            }
            return sonIguales;
        }

        public static bool operator !=(Persona p1, Persona p2)
        {
            return !(p1 == p2);
        }
    }
}
