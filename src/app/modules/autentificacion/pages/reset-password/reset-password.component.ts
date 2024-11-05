import { Component } from '@angular/core';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetEmail: string = '';
 @ViewChild('responseMessage', { static: false }) responseMessage!: ElementRef; 

   async resetPassword() {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, this.resetEmail);
      Swal.fire({
        title: '¡Correo Enviado!',
        text: 'Revisa tu correo electrónico para restablecer la contraseña.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      //  manipular un elemento específico
      if (this.responseMessage) {
        this.responseMessage.nativeElement.innerText = 'Correo enviado exitosamente.';
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al enviar el correo: ' + error,
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo'
      });
    }
  }
}


