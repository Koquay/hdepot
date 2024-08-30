import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRating]',
  standalone: true
})
export class RatingDirective {
  @Input() set appRating(rating:any) {
    this.createRating(rating)
  }

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer:Renderer2) { }

  private createRating = (rating:any) => {    

    const nativeElement: HTMLElement = this.el.nativeElement;
    let clonedNode;

    // Array.from(nativeElement.childNodes).forEach(node => {
    //   clonedNode = node.cloneNode(true);
    //   console.log('clonedNode', clonedNode)
    //   Array.from(clonedNode.childNodes).forEach(childNode => {        
    //     this.renderer.removeChild(clonedNode, childNode);
    //   })             
    // })
        

    clonedNode = nativeElement.childNodes[0].cloneNode(true);          
      const ratingSpan = this.renderer?.createElement('span');

    for(let i = 0; i < rating; i++) {
      const ratingIcon = this.renderer?.createElement('i');
      this.renderer.addClass(ratingIcon, "fa")
      this.renderer.addClass(ratingIcon, "fa-star")
      this.renderer.addClass(ratingIcon, "primary-color")      

      this.renderer?.appendChild(ratingSpan, ratingIcon);    
    
    }

    for(let i = 0; i < (5-rating); i++) {
      const ratingIcon = this.renderer?.createElement('i');
      this.renderer.addClass(ratingIcon, "fa")
      this.renderer.addClass(ratingIcon, "fa-star")
      this.renderer.setStyle(ratingIcon, "color", "#888898");      

      this.renderer?.appendChild(ratingSpan, ratingIcon);    
    
    }
    

    clonedNode.appendChild(ratingSpan);

    this.renderer.appendChild(nativeElement, clonedNode)
  }

}
