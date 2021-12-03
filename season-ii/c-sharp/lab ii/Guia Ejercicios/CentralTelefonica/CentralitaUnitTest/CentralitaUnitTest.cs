using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using CentralitaHerencia;

namespace CentralitaUnitTest
{
    [TestClass]
    public class CentralitaUnitTest
    {
        [TestMethod]
        public void TestListaInstanciadaDeCentralita()
        {
            Centralita centralita = new Centralita();
            bool success = false;

            if (centralita.Llamadas != null)
            {
                success = true;
            }
            Assert.IsTrue(success);
        }

        [TestMethod]
        public void TestLlamadaAgendadaLocalRepetida()
        {
            bool success = false;
            Centralita central = new Centralita();
            Local llamada = new Local("55656",12, "33535", 35);

            try
            {
                central += llamada;
                central += llamada;
            }
            catch (CentralitaException)
            {
                success = true;
            }

            Assert.IsTrue(success);
        }

        [TestMethod]
        public void TestLlamadaAgendadaProvincialRepetida()
        {
            bool success = false;
            Centralita central = new Centralita();
            Provincial prov = new Provincial("23242", "6464", 23,Provincial.Franja.Franja_1);
            try
            {
                central += prov;
                central += prov;
            }
            catch (CentralitaException)
            {
                success = true;
            }

            Assert.IsTrue(success);
        }
    }
}
