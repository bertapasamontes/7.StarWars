import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('asTitulo', { static: true }) titulo!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void { 
    const text = this.titulo.nativeElement.textContent;
    // this.titulo.nativeElement.textContent = ''; // Limpia el contenido original.

    // Itera sobre cada carácter y envuélvelo en un span.
    // text.split('').forEach((caracter: string) => {
    //   const span = this.renderer.createElement('span');
    //   const letrita = this.renderer.createText(caracter);

    //   this.renderer.appendChild(span, letrita);
    //   this.renderer.addClass(span, 'efecto-rechulon');
    //   this.renderer.appendChild(this.titulo.nativeElement, span);
    // });
  }
}
