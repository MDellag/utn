using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArchivoException;
using System.Runtime.Serialization;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;

namespace Ejercicio_58
{
    public class PuntoDat : Archivo, IArchivo<PuntoDat>
    {
        protected override bool ValidarArchivo(string ruta, bool validaExistencia)
        {
            if (validaExistencia == true)
            {
                if (File.Exists(ruta) && Path.GetExtension(ruta) == ".dat")
                {

                }
                else
                    throw new ArchivoIncorrectoException("El archivo no existe.");
            }

            return validaExistencia;
        }


        public bool Guardar(string ruta, PuntoDat objeto)
        {
            bool success = false;

            if (ValidarArchivo(ruta, true))
            {
                Stream stream = new FileStream(ruta, FileMode.Create);
                BinaryFormatter serializer = new BinaryFormatter();

                serializer.Serialize(stream, objeto);
                stream.Close();
                success = true;
            }

            return success;
        }

        public bool GuardarComo(string ruta, PuntoDat objeto)
        {
            bool success = false;

            if (ValidarArchivo(ruta, true))
            {
                Guardar(ruta + "1", objeto);
                success = true;
            }

            return success;
        }

        public PuntoDat Leer(string ruta)
        {
            PuntoDat obj = null;

            if (ValidarArchivo(ruta, true))
            {
                Stream reader = new FileStream(ruta, FileMode.Open);
                BinaryFormatter deserializer = new BinaryFormatter();

                obj = (PuntoDat)deserializer.Deserialize(reader);
                reader.Close();
            }
            return obj;
        }
    }
}
