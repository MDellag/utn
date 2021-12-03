using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Formula1;
namespace Test_Comp
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            bool pudo = false;
            Competencia<VehiculoDeCarrera> comp = new Competencia<VehiculoDeCarrera>(15, 10, Competencia<VehiculoDeCarrera>.TipoCompetencia.MotoCross);
            AutoF1 lamb = new AutoF1(01, "Lamborghini");

            comp += lamb;

            if (comp.Competidores.Count > 0)
            {
                pudo = true;
            }
            Assert.IsFalse(pudo);
        }
    }
}
