using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ejercicio_47
{
    public abstract class Equipo
    {
        private string nombre;
        private DateTime fechaCreacion;

        public Equipo(string nombre, DateTime fechaCreacion)
        {
            this.nombre = nombre;
            this.fechaCreacion = fechaCreacion;
        }

        public static bool operator ==(Equipo a, Equipo b)
        {
            if (a.nombre == b.nombre && a.fechaCreacion == b.fechaCreacion)
                return true;
            
            else
                return false;
        }

        public static bool operator !=(Equipo a, Equipo b)
        {
            return !(a == b);
        }

        public string Nombre
        {
            get { return this.nombre; }
        }

        public string Ficha()
        {
            StringBuilder inf = new StringBuilder();

            inf.AppendFormat("{0} fundado el {1}", this.nombre, this.fechaCreacion);

            return inf.ToString();
        }
    }
}
