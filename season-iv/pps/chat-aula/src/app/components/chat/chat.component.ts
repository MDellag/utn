import {
    Component,
    ElementRef,
    OnInit,
    Renderer2,
    ViewChild,
} from '@angular/core'
import { IMessage } from 'src/app/interfaces/imessage'
import { AuthService } from 'src/app/services/auth.service'
import { MessagesService } from 'src/app/services/messages.service'

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
    @ViewChild('message') message: ElementRef
    @ViewChild('inputMensaje') inputMensaje: ElementRef
    mensajes: any[] = []
    me = ''
    mensaje: string = ''
    public static style2 = ''
    public static curso = ''
    public style = ''

    constructor(
        private renderer: Renderer2,
        private messageService: MessagesService
    ) {
        this.me = AuthService.user.name
        this.style = ChatComponent.style2
        ChatComponent.style2 = ''
    }

    sendMessage() {
        const date = new Date()
        const timestamp = date.toLocaleTimeString('pt-BR')
        const mensajeToSend: IMessage = {
            name: AuthService.user.name,
            message: this.mensaje,
            timestamp: timestamp,
            curso: ChatComponent.curso,
        }

        this.messageService.sendMessage(mensajeToSend)
        this.mensaje = ''
    }

    ngOnInit() {
        this.messageService.getObservableMessages().subscribe((data: any) => {
            this.mensajes = []
            data.forEach((mensj) => {
                if (
                    !this.mensajes.find(
                        (e) =>
                            e.name === mensj.name &&
                            e.timestamp === mensj.timestamp
                    ) &&
                    mensj.curso === ChatComponent.curso
                ) {
                    this.mensajes.push(mensj)
                }
            })

            this.mensajes = this.mensajes.sort(function (a, b) {
                return ('' + a.timestamp).localeCompare(b.timestamp)
            })
        })
    }

    ngOnViewCreated() {
        // this.renderer.setAttribute(
        //     this.message.nativeElement,
        //     'style',
        //     ChatComponent.style
        // )
        // this.renderer.setAttribute(
        //     this.inputMensaje.nativeElement,
        //     'style',
        //     ChatComponent.style
        // )
    }
}
