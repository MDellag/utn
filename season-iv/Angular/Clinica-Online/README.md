# TpILabiv

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.2.

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:4200/`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Link to Firebase: https://clinicaonline-6f782.web.app/perfil

## Tipos de Usuario

- Admin
- Paciente
- Especialista

## Rutas

- /login -> permite ingresar al sistema con un **Email valido** y una password. Una vez ingresado al sistema se redirige al **/perfil**

- /perfil -> muestra los datos y fotos del perfil. Para los Pacientes, ademas se muestra el historial de turnos finalizados. Para los Especialistas, se les
             permite cambiar su disponibilidad horaria, para que los pacientes puedan solicitar turnos en la franja horaria especificada.

- /registro -> permite crear una cuenta en el sistema para poder ingresar y operar en el. 
              El mail debe ser **Valido**, ya que hay que validar el mail para poder ingresar en el sistema

- /usuarios -> Solo para Perfiles **ADMIN** permite ver todos los usuarios en el sistema, aceptarlos en caso de que sean 
              **Especialistas** o darlos de baja

- /mis-turnos -> Solo para Perfiles **Pacientes / Especialistas** Muestran los turnos que tiene asignado c/u. Los **Especialistas**
                  pueden aceptar los turnos, ademas de rechazarlos y cancelarlos. Deben ingresar una nota del por que se rechazo o cancelo
                  y una reseña en caso de que el turno este finalizado ademas de una serie de datos sobre el paciente.
                  Por otro lado el **Paciente** solo puede cancelar el turno y debe ingresar una nota del por que. Si el turno se finalizo, el Paciente puede
                  realizar una encuesta.

- /solicitar-turno -> Solo para Perfiles **ADMIN / Pacientes** pueden solicitar un turno con un especialista. Al elegir la especialidad se  filtrara 
                      automaticamente entre los Especialistas que poseen esa Especialidad. Mismo con los dias y horarios, si es que se encuentran disponibles o 
                        no. Para el **Admin** ademas de los datos del turno, debe seleccionar alguno de los pacientes registrados en el sistema

- /turnos ->   Solo para Perfiles **ADMIN** pueden revisar todos los turnos solicitados en el sistema, su estado, reseñas, etc. Tambien puede cancelar turnos.

- /pacientes -> Solo para Perfiles **Especialistas** permite ver los pacientes que el Especialista atendio almenos una vez, en el sistema. 

- /informes  -> Solo para Perfiles **Admin**. Pueden ver un registro de Login del sistema dia y hora de cuando se ingreso. Ademas de poder descargarlos en formato 
                CSV. Tambien se muestran Graficos de la cantidad de turnos por especialidad. Cantidad de Turnos por dia, Y ingresando un rango de Fechas, se  
                habilitaran 2 graficos mas de cantidad de turnos x Medico, y Cantidad de turnos finalizados por Medico. **Clickeando** cualquiera de los graficos
                Permite al **Administrador** descargar el grafico clickeado en formato CSV. 
