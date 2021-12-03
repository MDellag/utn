using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Herramientas
{
    public class Animal
    {
        public enum Especie {  Perro, Gato, Huron}
        internal Especie especie;

        public Animal(Especie especie)
        {
            this.especie = especie;
        }

    }
}
