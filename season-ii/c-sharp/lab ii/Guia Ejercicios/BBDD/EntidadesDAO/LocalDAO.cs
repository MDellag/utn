using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using CentralitaHerencia;

namespace EntidadesDAO
{
    public static class LocalDAO
    {
       private static SqlConnection conexion;
       private static SqlCommand command;
      
       private static DataTable table;
       private static string connectionString;

        static LocalDAO()
        {
            connectionString = "Data Source = .\\SQLEXPRESS; Database = Centralita; Trusted_Connection = true;";
            conexion = new SqlConnection(connectionString);
            command = new SqlCommand();

            command.Connection = conexion;
        }

        public static void GuardarLlamadaDB(int duracion, string origen, string destino)
        {
            try
            {
                conexion.Open();
                string insertar = string.Format("INSERT INTO Llamadas (Duracion, Origen, Destino) " +
                                            "VALUES ('{0}', '{1}', '{2}');", duracion, origen, destino);

                command.CommandText = insertar;
                command.ExecuteNonQuery();
            }
            finally
            {
                if (conexion != null && conexion.State == System.Data.ConnectionState.Open)
                {
                    conexion.Close();
                }
            }
        }

        public static List<Llamada> LeerDBLlamadas()
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                string comando = "SELECT Id, Duracion, Origen, Destino FROM Llamadas";
                SqlCommand com = new SqlCommand(comando, connection);
                connection.Open();
                SqlDataReader bbdd = com.ExecuteReader();

                List<Llamada> auxLlamada = new List<Llamada>();

                while (bbdd.Read())
                {
                    int id = bbdd.GetInt32(0);  //el 0 representa la columna
                    int duracion = bbdd.GetInt32(1);
                    string origen = bbdd.GetString(2);
                    string destino = bbdd.GetString(3);

                    Local llamad = new Local(origen, duracion, destino, 22);

                    auxLlamada.Add(llamad);
                }

                return auxLlamada;
            }
        }
    }
}
