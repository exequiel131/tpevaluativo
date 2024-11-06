import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent {

  constructor() { }

  aplicarTransicion() {

    const secciones = document.querySelectorAll(".seccion");

    secciones.forEach((seccion) => {

      const rect = seccion.getBoundingClientRect();

      const estaVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      if (estaVisible) {
        seccion.classList.add("visible");
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.aplicarTransicion();
  }

  ngOnInit() {
    // Llama a `aplicarTransicion` al cargar la página para que funcione también al inicio
    this.aplicarTransicion();
  }

}
