using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Herramientas
{
    public class Persona
    {
        private Mascota[] mascotas = new Mascota[3];
        private int dni;

        public Persona(int dni)
        {
            this.dni = dni;
        }

        public Persona()
        {
            //Constructor por defecto
        }

        public virtual int Id
        {
            get
            {
                return this.dni;
            }
        }

        public Animal this[int i]
        {
            set
            {
                if(value is Mascota)
                {
                    this.mascotas[i] = (Mascota)value;
                }
            }
        }

        public override string ToString()
        {
            StringBuilder inf = new StringBuilder();

            inf.AppendFormat($"{mascotas[0].Nombre}\n");
            inf.AppendFormat($"{mascotas[1].Nombre}\n");
            inf.AppendFormat($"{mascotas[2].Nombre}\n");
            return inf.ToString();
        }
    }
}
