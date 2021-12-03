using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.Windows.Forms;

namespace test_Thrading
{
    public partial class Form1 : Form
    {
        Thread t;
        Thread t2;

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            //Este codigo si lo dejo aca, no puedo volver a ejecutarlo, en cambio
            // si lo pongo en un boton por ej, puedo ejecutarlo cada vez que de click al boton

            //ParameterizedThreadStart pts = new ParameterizedThreadStart(AlterarLabel);
            //this.t = new Thread(pts);

            
          //  ThreadStart ts = new ThreadStart(ActualizarHora);
        }

        delegate void DelegadoParaAlterarLabel(object textoo);
        delegate void DelegadoActualizarHoraa();

        public void AlterarLabel(object textoo)
        {
            if (this.label1.InvokeRequired)
            {
                // Esto es el metodo predefinido arriba como delegate void.. recibe como parametro el puntero a este mismo metodo
                DelegadoParaAlterarLabel del = new DelegadoParaAlterarLabel(AlterarLabel);

                //aca el parametro se asigna al array de object Esto es necesario solo si recibo argumentos..
                object[] obj = new object[] { textoo };

                //llama al hilo principal, y le pasa el delegado, y el paquete (objeto)
                this.Invoke(del, obj);
            }
            else
            label1.Text = textoo.ToString();
        }


        public void ActualizarHora()
        {
            //DateTime a = new DateTime();
            if (label2.InvokeRequired)
            {
                DelegadoActualizarHoraa delHora = new DelegadoActualizarHoraa(ActualizarHora);
                this.Invoke(delHora);
            }
            else
            {
                this.label2.Text = string.Format($"{DateTime.Now}");

                //Con un DoWHile se cuelga..

                //do
                //{
                //    this.label2.Text = string.Format($"{DateTime.Now}");
                //     Thread.Sleep(100);
                //} while (true);
                
            }
        }

        public void ActLabel()
        {
            do
            {
                ActualizarHora();
                Thread.Sleep(100);

            } while (true);
        }


        private void button1_Click(object sender, EventArgs e)
        {
            //ParameterizedThred... permite solo un metodo con un solo argumento
            ParameterizedThreadStart pts = new ParameterizedThreadStart(AlterarLabel);

            this.t = new Thread(pts);
            //el Start crea un hilo secundario, iniciando el metodo "alterarLabel"
            //asignado en el Form_Load
            this.t.Start("Vaca");

            ThreadStart ts = new ThreadStart(ActLabel);
            this.t2 = new Thread(ts);
            t2.Start();
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            t2.Abort();
        }
    }
}
