using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;



namespace Clase_MetodosExtension
{
    public static class MetodosExtension
    {
        public enum Estaciones
        {
            Verano,
            Primavera,
            Invierno,
            Otonio
        }

        public static string ObtenerPlacaCronica(this DateTime instance, Estaciones estacion)
        {
            Dictionary<Estaciones, DateTime> fechasDeInicioEstacion = new Dictionary<Estaciones, DateTime>()
            {
                {Estaciones.Invierno, new DateTime(instance.Year, 06, 21) },
                {Estaciones.Primavera, new DateTime(instance.Year, 09, 21) },
                {Estaciones.Verano, new DateTime(instance.Year, 12, 21) },
                {Estaciones.Otonio, new DateTime(instance.Year, 03, 21) }
            };

            DateTime fechaInicioEstacion = new DateTime();
            fechasDeInicioEstacion.TryGetValue(estacion, out fechaInicioEstacion);

            if (fechaInicioEstacion < instance)
            {
                fechaInicioEstacion = fechaInicioEstacion.AddYears(1);
            }

            int cantidadDias = (int)(fechaInicioEstacion - instance).TotalDays;

            return $"Faltan {cantidadDias} días para {(estacion == Estaciones.Primavera ? "la" : "el")} {estacion}";
        }
    }
}
