using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Text;

namespace Formula1
{
    public class Competencia<T> where T : VehiculoDeCarrera
    {
        private short cantidadCompetidores;
        private short cantidadVueltas;
        private List<T> competidores;
        private TipoCompetencia tipo;

        private Competencia()
        {
            competidores = new List<T>();
        }

        public Competencia(short cantidadVueltas, short cantidadCompetidores, TipoCompetencia tipo)
            : this()

        {
            this.cantidadCompetidores = cantidadCompetidores;
            this.cantidadVueltas = cantidadVueltas;
            this.Tipo = tipo;
        }

        public List<T> Competidores
        {
            get { return this.competidores; }
        }

        public short CantidadCompetidores
        {
            get { return this.cantidadCompetidores; }
            set
            {
                if (value > 1)
                {
                    this.cantidadCompetidores = value;
                }
                else
                    this.cantidadCompetidores = 2;
            }
        }

        public short CantidadVueltas
        {
            get { return this.cantidadVueltas; }
            set
            {
                if (value > 0)
                {
                    this.cantidadVueltas = value;
                }
                else
                {
                    this.cantidadVueltas = 1;
                }
            }
        }

        public TipoCompetencia Tipo
        {
            get { return this.tipo; }
            set { this.tipo = value; }
        }

        public VehiculoDeCarrera this[int i]
        {
            get { return this.competidores[i]; }
            set { if (i < competidores.Count) this.competidores[i] = (T)value; }
        }

        static Random rnd = new Random();

        #region Operador + Booleano
        //public static bool operator +(Competencia c, VehiculoDeCarrera a)
        //{
        //    int combustible = rnd.Next(15, 100);
        //    bool success = false;

        //    try
        //    {
        //        if (c.competidores.Count < c.cantidadCompetidores &&
        //                c != a)
        //        {
        //            if (c.Tipo == TipoCompetencia.MotoCross && a is Motocross/*a.GetType() == typeof(Motocross)*/)
        //            {
        //                c.competidores.Add(a);
        //                a.EnCompetencia = true;
        //                a.CantidadCombustible = (short)combustible;
        //                a.VueltasRestantes = c.cantidadVueltas;
        //                success = true;
        //            }
        //            else if (c.Tipo == TipoCompetencia.F1 && a is AutoF1)
        //            {
        //                c.competidores.Add(a);
        //                a.EnCompetencia = true;
        //                a.CantidadCombustible = (short)combustible;
        //                a.VueltasRestantes = c.cantidadVueltas;
        //                success = true;
        //            }
        //        }
        //    }
        //    catch (CompetenciaNoDisponibleException e)
        //    {

        //        throw new CompetenciaNoDisponibleException("Competencia Incorrecta", "Competencia", "Operator +", e);
        //    }
        //    return success;
        //}
        #endregion

        #region Operador + Competencia 
        public static Competencia<T> operator +(Competencia<T> c, T a)
        {
            int combustible = rnd.Next(15, 100);
            //No hizo falta declarar otra clase Competencia = new Competencia();

            try
            {
                if (c.competidores.Count < c.cantidadCompetidores &&
                        c != a)
                {

                    if (c.Tipo == TipoCompetencia.MotoCross && a is Motocross/*a.GetType() == typeof(Motocross)*/)
                    {
                        c.competidores.Add(a);
                        a.EnCompetencia = true;
                        a.CantidadCombustible = (short)combustible;
                        a.VueltasRestantes = c.cantidadVueltas;
                    }
                    else if (c.Tipo == TipoCompetencia.F1 && a is AutoF1)
                    {
                        c.competidores.Add(a);
                        a.EnCompetencia = true;
                        a.CantidadCombustible = (short)combustible;
                        a.VueltasRestantes = c.cantidadVueltas;
                    }


                }
            }
            catch (CompetenciaNoDisponibleException e)
            {

                throw new CompetenciaNoDisponibleException("Competencia Incorrecta", "Competencia", "Operator +", e);
            }
            return c;
        }
        #endregion

        public static bool operator -(Competencia<T> c, T a)
        {
            bool succes = false;
            if (c == a)
            {
                c.competidores.Remove(a);
                a.EnCompetencia = false;
                succes = true;
            }
            return succes;
        }

        public static bool operator ==(Competencia<T> c, T a)
        {
            // recordar que antes de todo este codigo fue hecho con un simple c.competencia.Contains(a);
            bool retorno = false;

            if ((c.tipo == TipoCompetencia.F1 && a is Motocross) || (c.tipo == TipoCompetencia.MotoCross && a is AutoF1))
            {
                throw new CompetenciaNoDisponibleException("El vehiculo no corresponde a la competencia", "Competencia", "Operador ==");
            }
            foreach (VehiculoDeCarrera auxvehiculo in c.competidores)
            {
                if (auxvehiculo == a)
                {
                    retorno = true;
                    break;
                }
            }

            return retorno;
        }

        public static bool operator !=(Competencia<T> c, T a)
        {
            return !(c == a);
        }

        public string MostrarDatos()
        {
            StringBuilder info = new StringBuilder();

            info.Append($"Cantidad de Competidores: {this.cantidadCompetidores}\n");
            info.Append($"Cantidad de Vueltas     : {this.cantidadVueltas}\n\n");

            foreach (T item in competidores)
            {
                info.Append(item.MostrarDatos());
            }

            return info.ToString();
        }


        public enum TipoCompetencia
        {
            F1,
            MotoCross
        }
    }
}
