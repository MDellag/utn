using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestParcial
{
    public class School
    {
        private static short schoolYear;
        private string name;
        private Dictionary<int, string> students;


        static School()
        {
            School.schoolYear = (short)DateTime.Now.Year;
        }

        private School()
        {
            this.students = new Dictionary<int, string>();
        }

        public School(string name)
            : this()
        {

        }

        public short SchoolYear
        {
            get { return School.schoolYear; }
        }


        public void AddStudent(string student)
        {
           // this.students = student;
        }


        // mal, la sobrecarga static esta mal respecto a la normal
       // public static void AddStudent(string student) { }
    }
}
