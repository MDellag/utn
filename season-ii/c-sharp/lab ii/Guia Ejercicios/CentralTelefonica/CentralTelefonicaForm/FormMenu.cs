using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml.Schema;
using CentralitaHerencia;
using EntidadesDAO;


namespace CentralTelefonicaForm
{
    public partial class FormMenu : Form
    {
        
        private Centralita central;
        FormLlamador llamador;
        

        public Centralita Central
        {
            get { return this.central; }
            set { this.central = value; }
        }

        /// <summary>
        /// Inicializa central y llamador
        /// Centraliza la app en el centro de la pantalla
        /// Inicialzia componentes
        /// </summary>
        public FormMenu()
        {
            this.StartPosition = FormStartPosition.CenterScreen;        
            central = new Centralita();
            llamador = new FormLlamador(Central);
            InitializeComponent();
        }

        private void btnSalir_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        /// <summary>
        /// Boton para Generar Llamada
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnGenerarLlamada_Click(object sender, EventArgs e)
        {
            llamador.ShowDialog();
        }

        /// <summary>
        /// Boton de Facturacion Total
        /// Evento Click
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnFacturacionTotal_Click(object sender, EventArgs e)
        {
            if (Central.Llamadas.Count > 0)
            {
                FrmMostrar formMostrar = new FrmMostrar(Central);
                
                    this.Central = llamador.Central;
                    formMostrar.Tipo = Llamada.TipoLlamada.Todas;

                    formMostrar.ShowDialog();  
            }
            else
            {
                MessageBox.Show(String.Format("Aun no hay Llamadas Registradas!"), "Error" ,MessageBoxButtons.OK);
            }
        }

        /// <summary>
        /// Boton Facturacion Local
        /// Evento Click
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnFacturacionLocal_Click(object sender, EventArgs e)
        {
            if (Central.Llamadas.Count > 0)
            {
                FrmMostrar formMostrar = new FrmMostrar(central);
                Central = llamador.Central;
                formMostrar.Tipo = Llamada.TipoLlamada.Local;

                formMostrar.ShowDialog();
            }
            else
            {
                MessageBox.Show(String.Format("Aun no hay Llamadas Registradas!"), "Error", MessageBoxButtons.OK);
            }
        }

        /// <summary>
        /// Boton Facturacion Provincial
        /// Evento Click
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnFacturacionProvincia_Click(object sender, EventArgs e)
        {
            if (Central.Llamadas.Count > 0)
            {
                FrmMostrar formMostrar = new FrmMostrar(central);
                Central = llamador.Central;
                formMostrar.Tipo = Llamada.TipoLlamada.Provincial;

                formMostrar.ShowDialog();
            }
            else
            {
                MessageBox.Show(String.Format("Aun no hay Llamadas Registradas!"), "Error", MessageBoxButtons.OK);
            }
        }

        /// <summary>
        /// Boton Para Guardar Datos
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnGuardar_Click(object sender, EventArgs e)
        {
            #region File Save
            /* SaveFileDialog save = new SaveFileDialog();

             if (save.ShowDialog() == DialogResult.OK)
             {
                 Central.RutaArchivo = save.FileName;

                 Central.Guardar(Central);
             }*/
            #endregion

            List<Llamada> listLlam = new List<Llamada>();
            listLlam = LocalDAO.LeerDBLlamadas();
            bool isNot = true;

            foreach (Llamada item in Central.Llamadas)
            {
                foreach (Llamada llamada  in listLlam)
                {
                    if (llamada == item)
                    {
                        isNot = false;
                        break;
                    }
                }

                if (isNot)
                {
                    LocalDAO.GuardarLlamadaDB((int)item.Duracion, item.NroOrigen, item.NroDestino);
                }
                isNot = true;
            }

            

        }

        /// <summary>
        /// Boton para Cargar Datos
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnCargar_Click(object sender, EventArgs e)
        {
            //Mira todo el quilombo que hay q hacer porq no quieren que ponga un set {}
            // En la propiedad ListaLlamadas de centralita..
            List<Llamada> listaAux = LocalDAO.LeerDBLlamadas();
            bool isOnIt = false; 
            try
            {
                foreach (Llamada item in listaAux)
                {
                    foreach (Llamada call in Central.Llamadas)
                    {
                        if (call == item)
                        {
                            isOnIt = true;
                            break;
                        }
                    }

                    if (!isOnIt)
                        Central += item;
                    
                    isOnIt = false;
                }
            }
            catch(Exception p)
            {
                MessageBox.Show(p.Message, "Error", MessageBoxButtons.OK);
            }
        }
    }
}
