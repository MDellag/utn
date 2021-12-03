using CentralitaHerencia;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CentralTelefonicaForm
{
    public partial class FormLlamador : Form
    {
        private Centralita centrl;
        static Random rnd = new Random();
        

        /// <summary>
        /// Constructor del FORM LLAMADOR
        /// </summary>
        /// <param name="centr"></param>
        public FormLlamador(Centralita centr)
        {
            this.centrl = centr;
            this.StartPosition = FormStartPosition.CenterScreen;
            
            
            InitializeComponent();
        }


        /// <summary>
        /// Propiedad Get Central
        /// Retorna la centralita
        /// </summary>
       public Centralita Central
        {
            get { return this.centrl; }
        }



        /// <summary>
        /// Botones del Formulario
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnSalir_Click(object sender, EventArgs e)
        {

            this.Close();
        }

        #region Panel Numeral
        void PanelNumeral(int num)
        {
            if (txtNroDestino.Text == "Nro Destino")
            {
                txtNroDestino.Text = string.Empty;
                txtNroDestino.Text += num.ToString();
            }
            else
                txtNroDestino.Text += num.ToString();
        }

         void PanelNumeral(string num)
        {
            if (txtNroDestino.Text == "Nro Destino")
            {
                txtNroDestino.Text = string.Empty;
                txtNroDestino.Text += num;
            }
            else
                txtNroDestino.Text += num;
        }
        #endregion
        #region Panel Botones
        /* -------------- Comienzo Botones -------------- */

        private void btn1_Click(object sender, EventArgs e)
        {
            PanelNumeral(1);
        }

        private void btn2_Click(object sender, EventArgs e)
        {
            PanelNumeral(2);
        }

        private void btn3_Click(object sender, EventArgs e)
        {
            PanelNumeral(3);
        }

        private void btn4_Click(object sender, EventArgs e)
        {
            PanelNumeral(4);
        }

        private void btn5_Click(object sender, EventArgs e)
        {
            PanelNumeral(5);
        }

        private void btn6_Click(object sender, EventArgs e)
        {
            PanelNumeral(6);
        }

        private void btn7_Click(object sender, EventArgs e)
        {
            PanelNumeral(7);
        }

        private void btn8_Click(object sender, EventArgs e)
        {
            PanelNumeral(8);
        }

        private void btn9_Click(object sender, EventArgs e)
        {
            PanelNumeral(9);
        }

        private void btn0_Click(object sender, EventArgs e)
        {
            PanelNumeral(0);
        }

        private void btnAsterisc_Click(object sender, EventArgs e)
        {
            PanelNumeral("*");
        }

        private void btnNumeral_Click(object sender, EventArgs e)
        {
            PanelNumeral("#");
        }


        /* ------------------ Fin botones ------------------ */
        #endregion

        private void btnLimpiar_Click(object sender, EventArgs e)
        {
            txtNroDestino.Text = "Nro Destino";
            txtNroOrigen.Text = "Nro Origen";
        }


        /// <summary>
        /// Boton "Llamar" con el evento Click
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnLlamar_Click(object sender, EventArgs e)
        {
            float c = (float)rnd.Next(5, 56) / 10;
            float dur = (float)rnd.Next(1, 50);

            if (txtNroDestino.Text[0] != '#') {
                StringBuilder asd = new StringBuilder();

                try
                {
                    Local loc = new Local(txtNroOrigen.Text, dur, txtNroDestino.Text, c);
                    centrl.Llamadas.Add(loc);
                    asd.AppendFormat("Llamada Local realizada correctamente!\n Su duracion fue de {0}", dur.ToString());
                }
                catch (CentralitaException excep)
                {
                    asd.AppendFormat(excep.Message);
                }


                MessageBox.Show(asd.ToString());
            }
            else
            {
                //Carga el ComboBox con datos Enum ya declarados con anterioridad.
                cmbFranja.DataSource = Enum.GetValues(typeof(Provincial.Franja));
                StringBuilder asd = new StringBuilder();
                Provincial.Franja franj;
                Enum.TryParse<Provincial.Franja>(cmbFranja.SelectedValue.ToString(), out franj);

                try
                {
                    Provincial prov = new Provincial(txtNroOrigen.Text, txtNroDestino.Text, dur, franj);
                    centrl.Llamadas.Add(prov);
                    asd.AppendFormat("Llamada Provincial realizada correctamente!\n Su duracion fue de {0}", dur.ToString());
                }
                catch (CentralitaException excep)
                {
                    asd.AppendFormat(excep.Message);
                }


                MessageBox.Show(asd.ToString());
            }

            btnLimpiar_Click(sender, e);
        }

        private void txtNroDestino_TextChanged(object sender, EventArgs e)
        {
            if (txtNroDestino.Text != string.Empty)
            {
                if (txtNroDestino.Text[0] != '#')
                {
                    cmbFranja.Enabled = false;
                }
                else
                    cmbFranja.Enabled = true;
            }
        }
    }
}
