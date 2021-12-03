using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace ATalCliente
{
    public class Negocio
    {
        private PuestoAtencion caja;
        private Queue<Cliente> clientes;
        private string nombre;

        public Cliente Clientes
        {
            get { return this.clientes.Dequeue(); }
            set { bool reutilizar = this + value;   } // ???
        }

        
        #region Constructores
        private Negocio()
        {
            caja = new PuestoAtencion(Puesto.Caja1);
            clientes = new Queue<Cliente>();
        }

        public Negocio(string nombre)
            : this()
        {
            this.nombre = nombre;
        }
        #endregion

        #region Operadores
        public static bool operator +(Negocio n, Cliente c)
        {
            bool agregado = false;
            if (n != c)
            {
                n.Clientes = c;
                agregado = true;
            }
            return agregado;
        }

        public static bool operator ==(Negocio n, Cliente c)
        {
            bool estaEnCola = false;
            if (n.Clientes == c)
            {
                estaEnCola = true;
            }
            return estaEnCola;
        }


        public static bool operator !=(Negocio n, Cliente c)
        {
            return !(n == c);
        }

        public static bool operator ~(Negocio n)
        {
            bool atendido = false;
            if (!(n is null))
            {
                Cliente aux = n.Clientes;
                if (!(aux is null))
                {
                    if (n.caja.Atender(aux))
                    {
                        atendido = true;
                    }
                }
            }
            return atendido;
        }
        #endregion
    }
}
