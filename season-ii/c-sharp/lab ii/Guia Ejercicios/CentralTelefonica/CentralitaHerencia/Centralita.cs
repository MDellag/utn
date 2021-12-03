using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;

namespace CentralitaHerencia
{
    [Serializable]
    public class Centralita : IGuardar<Centralita>
    {
        private List<Llamada> listaDeLlamadas;
        protected string razonSocial;
        private string rutaDeArchivo;

        public Centralita()
        {
            listaDeLlamadas = new List<Llamada>();
        }

        public Centralita(string nombreEmpresa)
            : this()
        {
            razonSocial = nombreEmpresa;
        }

        #region Gets
        public float GananciasPorLocal
        {
            get { return CalcularGanancia(Llamada.TipoLlamada.Local); }
        }

        public float GananciasPorProvincia
        {
            get { return CalcularGanancia(Llamada.TipoLlamada.Provincial); }
        }

        public float GananciasPorTotal
        {
            get { return CalcularGanancia(Llamada.TipoLlamada.Todas); }
        }

        public List<Llamada> Llamadas
        {
            get { return this.listaDeLlamadas; }
           // set { this.listaDeLlamadas = value; }
        }
        #endregion


        private float CalcularGanancia(Llamada.TipoLlamada tipo)
        {
            float ganancia = 0;


            //Recordar este tipo de condicion por si hay que usarlo en un futuro no muy lejano
            foreach (Llamada item in this.listaDeLlamadas)
            {
                if ((Llamada.TipoLlamada.Local == tipo || tipo == Llamada.TipoLlamada.Todas) && item is Local)
                {
                    ganancia += ((Local)item).CostoLlamada;
                }
                if ((Llamada.TipoLlamada.Provincial == tipo || tipo == Llamada.TipoLlamada.Todas) && item is Provincial)
                {
                    ganancia += ((Provincial)item).CostoLlamada;
                }
            }
            return ganancia;
        }


        //public string Mostrar()
        //{
        //    StringBuilder info = new StringBuilder();

        //    info.AppendFormat($"Razon Social: {this.razonSocial}\n");
        //    info.AppendFormat($"Ganancia Total: {this.GananciasPorTotal}\n");
        //    info.AppendFormat($"Ganancia Provincial: {this.GananciasPorProvincia}\n");
        //    info.AppendFormat($"Ganancia por Locales: {this.GananciasPorLocal}\n\n");
        //    info.AppendFormat($"--- Registro Llamada --- \n ");

        //    return info.ToString();
        //}

        public override string ToString()
        {
            StringBuilder info = new StringBuilder();

            info.AppendFormat($"--------Central -------------\n");
            info.AppendFormat($"Razon Social: {this.razonSocial}\n");
            info.AppendFormat($"Ganancia Total: {this.GananciasPorTotal.ToString("C2")}\n");
            info.AppendFormat($"Ganancia Provincial: {this.GananciasPorProvincia.ToString("C2")}\n");
            info.AppendFormat($"Ganancia por Locales: {this.GananciasPorLocal.ToString("C2")}\n\n");
            info.AppendFormat($"--- Registro Llamadas --- \n ");

            foreach (Llamada item in Llamadas)
            {
                info.AppendFormat($"{item}"); //Si no anda poner item.tostring()
            }

            return info.ToString();
        }

        public void OrdenarLlamadas()
        {
            this.listaDeLlamadas.Sort(Llamada.OrdenarPorDuracion);
        }

        private void AgregarLlamada(Llamada nuevaLlamada)
        {
            listaDeLlamadas.Add(nuevaLlamada);
        }

        public static bool operator ==(Centralita c, Llamada l)
        {
            bool contiene = false;

            foreach (Llamada item in c.Llamadas)
            {
                if (item == l)
                {
                    contiene = true;
                }
            }
            return contiene;
        }

        public static bool operator !=(Centralita c, Llamada l)
        {
            return !(c == l);
        }

        public static Centralita operator +(Centralita c, Llamada l)
        {
            if (c != l)
            {
                c.AgregarLlamada(l);
            }
            else
            {
                throw new CentralitaException("Llamada ya agregada", "Centralita", "Operator +");
            }
            return c;
        }

        #region Interface IGuardar<T>
        public bool Guardar(Centralita l)
        {
            Stream stream = new FileStream(RutaArchivo, FileMode.Create);
            IFormatter writer = new BinaryFormatter();

            writer.Serialize(stream, l);
            stream.Close();

            return true;
        }

        public string RutaArchivo
        {
            get { return this.rutaDeArchivo; }
            set { this.rutaDeArchivo = value; }
        }

       // public string RutaArchivo { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public Centralita Leer()
        {
            Stream str = new FileStream(RutaArchivo, FileMode.Open, FileAccess.Read);
            IFormatter reader = new BinaryFormatter();

            Centralita a =(Centralita)reader.Deserialize(str);
            str.Close();
            return a;
        }

        //public bool Guardar(T )
        //{
        //    throw new NotImplementedException();
        //}
        #endregion
    }
}
