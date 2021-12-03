using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ATalCliente
{
    public enum Puesto
    {
        Caja1, Caja2
    }
    public class PuestoAtencion
    {
        private static int numeroActual;
        private Puesto puesto;

        
        public static int NumeroActual
        {
            get { return ++numeroActual; }
        }

        #region Constructores
        private PuestoAtencion()
        {
            numeroActual = 0;
        }

        public PuestoAtencion(Puesto puesto)
            : this()
        {
            this.puesto = puesto;
        }
        #endregion

        public bool Atender(Cliente c)
        {
            bool atendido = false;

            if (PuestoAtencion.NumeroActual == c.Numero)
            {
                Thread.Sleep(5000);
                atendido = true;
            }

            return atendido;
        }
    }
}
