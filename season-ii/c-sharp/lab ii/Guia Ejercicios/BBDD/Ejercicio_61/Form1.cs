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

namespace Ejercicio_61
{ 
    public partial class Form1 : Form
    {
        //SqlDataReader readerDDBB; // lee los datos de sql

        public Form1()
        {
            this.StartPosition = FormStartPosition.CenterScreen;
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {


            RefreshDataTable();
            dataGridView1.ReadOnly = true;
            dataGridView1.RowHeadersVisible = false;
            dataGridView1.AllowUserToAddRows = false;
        }

        private void RefreshDataTable()
        {
            dataGridView1.DataSource = PersonaDAO.LeerDAO();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            if (textBox1.Text != null && textBox2.Text != null
                && textBox1.Text != string.Empty && textBox2.Text != string.Empty)
            {
                PersonaDAO.GuardarDAO(textBox1.Text, textBox2.Text);
                textBox1.Text = string.Empty;
                textBox2.Text = string.Empty;
                RefreshDataTable();
            }
            else
                MessageBox.Show("Hay datos incompletos, por favor completelos", "Error al ingresar nueva Persona", MessageBoxButtons.OK, MessageBoxIcon.Information);

        }

        private void button3_Click(object sender, EventArgs e)
        {
            Form2 delete = new Form2();

            delete.ShowDialog();
            
        }

        private void buttonRefresh_Click(object sender, EventArgs e)
        {
            RefreshDataTable();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            Form3 update = new Form3();
            update.ShowDialog();
        }
    }
}
