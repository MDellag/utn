using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ejercicio_47
{
    public class Torneo<T> where T : Equipo
    {
        private List<T> equipos;
        private string nombre;
        static Random rnd = new Random();

        public Torneo(string nombre)
        {
            this.nombre = nombre;
            equipos = new List<T>();
        }

        public static bool operator ==(Torneo<T> t, Equipo p)
        {
            return t.equipos.Contains(p);
        }

        public static bool operator !=(Torneo<T> t, Equipo p)
        {
            return !(t == p);
        }

        public static Torneo<T> operator +(Torneo<T> t, T p)
        {
            if (t != p)
            {
                t.equipos.Add(p);
            }

            return t;
        }

        
        private string CalcularPartido(T a, T b)
        {
            StringBuilder calcPartido = new StringBuilder();
            
            calcPartido.AppendFormat("{0}:{1} - {2}:{3}", a.Nombre, rnd.Next(1,9), b.Nombre, rnd.Next(1, 9));

            return calcPartido.ToString();
        }

        public string JugarPartido
        {
            get
            {
                int a, b;
                if (equipos.Count > 0)
                {
                    a = rnd.Next(0, equipos.Count);

                    do
                    {
                        b = rnd.Next(0, rnd.Next(0, equipos.Count));
                    } while (a == b );

                    return CalcularPartido(equipos[a], equipos[b]);
                }
                else
                {
                    return "No hay suficientes Equipos para realizar un partido";
                }
            }
        }
    }
}
