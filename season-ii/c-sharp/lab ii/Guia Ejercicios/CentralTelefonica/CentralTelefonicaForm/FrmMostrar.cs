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
    public partial class FrmMostrar : Form
    {
        private Llamada.TipoLlamada tipo;
        private Centralita central;

        public Llamada.TipoLlamada Tipo
        {
            set { this.tipo = value; }
        }

        public FrmMostrar(Centralita central)
        {
            this.central = central;
            this.StartPosition = FormStartPosition.CenterScreen;
            InitializeComponent();
        }

        private void rchTxtMostrar_TextChanged(object sender, EventArgs e)
        {
                      
        }

        private void FrmMostrar_Load(object sender, EventArgs e)
        {
            switch (tipo)
            {
                case Llamada.TipoLlamada.Local:
                    Centralita loc = new Centralita();
                    foreach (Llamada item in central.Llamadas)
                    {
                        if (item is Local)
                        {
                            loc.Llamadas.Add(item);
                        }
                    }

                    rchTxtMostrar.Text = loc.ToString();
                    break;
                case Llamada.TipoLlamada.Provincial:
                    Centralita provinc = new Centralita();
                    foreach (Llamada item in central.Llamadas)
                    {
                        if (item is Provincial)
                        {
                            provinc.Llamadas.Add(item);
                        }
                    }

                    rchTxtMostrar.Text = provinc.ToString();
                    break;
                case Llamada.TipoLlamada.Todas:
                    rchTxtMostrar.Text = central.ToString();
                    break;
                default:
                    break;
            }
        }
    }
}
