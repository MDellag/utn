using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using ArchivoException;

namespace Ejercicio_58
{
    public class PuntoTxt : Archivo, IArchivo<string>
    {
        protected override bool ValidarArchivo(string ruta, bool validaExistencia)
        {
            if (validaExistencia == true )
            {
                if (File.Exists(ruta) && Path.GetExtension(ruta) == ".txt")
                {

                }
                else
                    throw new ArchivoIncorrectoException("El archivo no existe.");
            }

            return validaExistencia;
        }


        public bool Guardar(string ruta, string objeto)
        {
            bool success = false;

            if (!ValidarArchivo(ruta, false))
            {
                StreamWriter writer = new StreamWriter(ruta);

                writer.Write(objeto);
                writer.Close();
                success = true;
            }

            return success;
        }

        public bool GuardarComo(string ruta, string objeto)
        {
            bool success = false;

            if (ValidarArchivo(ruta, true))
            {
                Guardar(ruta + "1", objeto);
                success = true;
            }

            return success;
        }

        public string Leer(string ruta)
        {
            string inf = string.Empty;

            if (ValidarArchivo(ruta, true))
            {
                StreamReader reader = new StreamReader(ruta);
                inf = reader.ReadToEnd();
                reader.Close();
            }
            return inf;
        }




    }
}
