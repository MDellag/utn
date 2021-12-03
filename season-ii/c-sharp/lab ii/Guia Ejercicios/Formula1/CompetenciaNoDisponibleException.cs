using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Formula1
{
    public class CompetenciaNoDisponibleException : Exception
    {

        private string nombreClase;
        private string nombreMetodo;

        public string NombreClase
        {
            get { return this.nombreClase; }
        }

        public string NombreMetodo
        {
            get { return this.nombreMetodo; }
        }

        public CompetenciaNoDisponibleException(string mensaje, string clase, string metodo, Exception innerException)
            : base(mensaje, innerException)
        {
            this.nombreClase = clase;
            this.nombreMetodo = metodo;
        }

        public CompetenciaNoDisponibleException(string mensaje, string clase, string metodo)
            : this(mensaje, clase, metodo, null)
        {

        }

        public override string ToString()
        {
            StringBuilder inf = new StringBuilder();

            inf.AppendFormat($"Excepcion en el metodo {this.NombreMetodo} de la clase {this.nombreClase}\n");
            inf.AppendFormat($"{base.Message}\n");

            Exception ex = this.InnerException;
            while (ex.InnerException != null)
            {
                inf.AppendFormat($"{this.StackTrace.ToString()}\t");
                ex = ex.InnerException;
            }

            return inf.ToString();
        }
    }
}
