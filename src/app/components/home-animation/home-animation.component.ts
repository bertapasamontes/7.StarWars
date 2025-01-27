import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-animation',
  imports: [],
  templateUrl: './home-animation.component.html',
  styleUrl: './home-animation.component.scss'
})
export class HomeAnimationComponent {
  constructor(private router: Router){}

//   byline = document.getElementById('byline');  	// Find the H2
//   bylineText = this.byline?.innerHTML;										// Get the content of the H2
//   bylineArr = this.bylineText?.split('');									// Split content into array
//   byline.innerHTML = '';														// Empty current content

// span: HTMLSpanElement | any;					// Create variables to create elements
// letter =  '';

// for(i=0,i<bylineArr.length,i++){									// Loop for every letter
//   span = document.createElement("span");					// Create a <span> element
//   letter = document.createTextNode(bylineArr[i]);	// Create the letter
//   if(bylineArr[i] == ' ') {												// If the letter is a space...
//     byline.appendChild(letter);					// ...Add the space without a span
//   } else {
// 		span.appendChild(letter);						// Add the letter to the span
//   	byline.appendChild(span); 					// Add the span to the h2
//   }
// }

  ngOnInit(): void {
    // Navega al componente B después de 5 segundos
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 5050); // 5000 milisegundos = 5 segundos
  }
}
