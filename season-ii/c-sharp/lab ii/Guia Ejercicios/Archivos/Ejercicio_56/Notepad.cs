using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Ejercicio_58;

namespace Ejercicio_56
{
    public partial class Notepad : Form
    {
        string openfile;
        public Notepad()
        {
            this.StartPosition = FormStartPosition.CenterScreen;
            this.Text = "Notepad";

            

            InitializeComponent();
        }

        private void rTBoxNotePad_TextChanged(object sender, EventArgs e)
        {
            //rTBoxNotePad.Size.Width = 400;
        }


        private void guardarToolStripMenuItem_Click(object sender, EventArgs e)
        {
            try
            {
                PuntoTxt txt = new PuntoTxt();
                txt.Guardar("T:\\ej56.txt", rTBoxNotePad.Text);
            }
            catch (Exception)
            {
                guardarComoToolStripMenuItem_Click(sender, e);
            }
        }

        private void abrirToolStripMenuItem_Click(object sender, EventArgs e)
        {
            OpenFileDialog op = new OpenFileDialog();

            //op.Filter = "txt files (*.txt) |*.txt|All files (*.*|*.*)";
            //string path;

            if (op.ShowDialog() == DialogResult.OK)
            {
                try
                {
                    PuntoTxt txt = new PuntoTxt();
                    rTBoxNotePad.Text = txt.Leer(op.FileName);
                }
                catch (Exception)
                {
                    MessageBox.Show(String.Format("El Archivo no Existe"), "Error al arbrir archivo", MessageBoxButtons.OK, MessageBoxIcon.Error);
                } 
            }
        }

        private void guardarComoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            SaveFileDialog sf = new SaveFileDialog();


            if (sf.ShowDialog() == DialogResult.OK)
            {
                PuntoTxt txt = new PuntoTxt();
                txt.GuardarComo(sf.FileName, rTBoxNotePad.Text);
            }
        }

        private void Notepad_Load(object sender, EventArgs e)
        {
            guardarComoToolStripMenuItem.ShortcutKeyDisplayString = "Ctrl+Alt+S";
            //guardarComoToolStripMenuItem.ShortcutKeys = Keys.Control;

            guardarToolStripMenuItem.ShortcutKeyDisplayString = "Ctrl+S";
            //guardarToolStripMenuItem.ShortcutKeys = Keys.Shift;

            abrirToolStripMenuItem.ShortcutKeyDisplayString = "Ctrl+A";
        }

        private void salirToolStripMenuItem_Click(object sender, EventArgs e)
        {
            
            if (openfile is null)
            {
                DialogResult diag;

                diag = MessageBox.Show("Desea Guardar los datos antes de salir?", "Cierre", MessageBoxButtons.YesNoCancel, MessageBoxIcon.Warning);

                if (diag == DialogResult.Yes)
                {
                    guardarToolStripMenuItem_Click(sender, e);
                    this.Close();
                }
                else if (diag == DialogResult.No)
                {
                    this.Close();
                }
                

            }
            else
            {
                this.Close();
            }
        }
    }
}
