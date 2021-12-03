using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Herramientas
{
    public class Alumno : Persona
    {
        private int legajo;

        public Alumno(int dni, int legajo)
            :base(dni)
        {
            this.legajo = legajo;
        }

        public override int Id
        {
            get
            {
                return this.legajo;
            }
        }
    }
}
