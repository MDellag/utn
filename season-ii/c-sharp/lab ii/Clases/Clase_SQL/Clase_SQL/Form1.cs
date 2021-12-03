using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient;

namespace Clase_SQL
{
    public partial class Form1 : Form
    {
        SqlConnection conexion;          //Nos permite conectarnos con la BBDD
        SqlCommand comando;             //Conecto sql command con el objeto de SqlConnection
        SqlDataReader miBaseDatos;      //Lee los datos de sql

        DataTable mitabla; 
        public Form1()
        {
            comando = new SqlCommand();
            conexion = new SqlConnection("Data Source = DESKTOP-EVKR5JV\\SQLEXPRESS; Database = utnfra; trusted_connection = true;");
            mitabla = new DataTable();
            //conexion.ConnectionString = " ";

            //comando.Connection = conexion; //Conecto sql command con el objeto de SqlConnection
            //comando.CommandType = CommandType.Text;
            //comando.CommandText = "SELECT * FROM Alumnos";

            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            try
            {
                comando.Connection = conexion;           //Conecto sql command con el objeto de SqlConnection
                comando.CommandType = CommandType.Text;
                comando.CommandText = "SELECT * FROM Alumnos WHERE curso = @cursoAFiltrar";
                comando.Parameters.Add(new SqlParameter("cursoAFiltrar", 1));


                conexion.Open();
                miBaseDatos = comando.ExecuteReader();

                mitabla.Load(miBaseDatos);

                dataGridView1.DataSource = mitabla;
                dataGridView1.ReadOnly = true;
                dataGridView1.RowHeadersVisible = false;
                dataGridView1.AllowUserToAddRows = false;

                //while (miBaseDatos.)
                //{

                //}
            }
            catch (Exception ee)
            {

                rtxtSQL.Text = ee.Message;
            }

            
        }
    }
}
