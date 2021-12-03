using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;

namespace Ejercicio_61
{
    public static class PersonaDAO
    {
        private static string stringConnection;
        private static SqlConnection connection;
        private static SqlCommand command;

        static PersonaDAO()
        {
            stringConnection = "Data Source = .\\SQLEXPRESS; Database = Personas; Trusted_Connection = True;";
            connection = new SqlConnection(stringConnection);
            command = new SqlCommand();

            command.Connection = connection;
            command.CommandType = CommandType.Text;
        }

        public static void GuardarDAO(string nombre, string apellido)
        {
            try
            {
                
                connection.Open();
                string datos = string.Format("INSERT INTO datos (nombre, apellido) " + "VALUES ('{0}', '{1}');", nombre, apellido);
                SqlCommand comando = new SqlCommand(datos, connection);
                                
                comando.ExecuteNonQuery();
            }
            finally
            {
                if (connection != null && connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }  
        }

        public static DataTable /*List<Persona>*/ LeerDAO()
        {
            
            connection.Open();
            string query = string.Format("SELECT * FROM datos");

            command.CommandType = CommandType.Text;
            command.CommandText = query;

            SqlDataReader reader = command.ExecuteReader();
            DataTable table = new DataTable();
            table.Load(reader);

            connection.Close();
            return table;

            #region lista
            //    List<Persona> personas = new List<Persona>();

            //while (reader.Read())
            //{
            //    int id = reader.GetInt32(0);
            //    string nombre = reader.GetString(1);
            //    string apellido = reader.GetString(2);

            //    Persona persona = new Persona(nombre, apellido, id);
            //    personas.Add(persona);
            //}
            //return personas;
            #endregion
        }

        public static void UpdateData(string id, string nombre, string apellido)
        {
            int idInt;
            bool success = int.TryParse(id, out idInt);

            if (success)
            {
                string query = string.Format("UPDATE datos SET nombre = '{0}', apellido = '{1}' WHERE id = {2}", nombre, apellido, idInt);
                connection.Open();

                command.CommandText = query;
                command.ExecuteNonQuery();
                connection.Close();
            }
        }

        public static void DeletePerson(string id)
        {
            int idInt;
            bool success = int.TryParse(id, out idInt);

            if (success)
            {
                string query = string.Format("DELETE FROM datos WHERE id = {0}", idInt);
                connection.Open();

                command.CommandText = query;
                command.ExecuteNonQuery();
                connection.Close();
            }
        }
    }
}
