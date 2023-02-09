import { Renderer2,Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AddscriptService {

  constructor(@Inject(DOCUMENT) private document:Document) {}

  public loadJsScript(renderer: Renderer2, src: string): HTMLScriptElement {
    const script = renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    renderer.appendChild(this.document.body, script);
    return script;
  }

  public setJsonLd(renderer: Renderer2, data: any): void {
    let script = renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = `${JSON.stringify(data)}`;
    renderer.appendChild(this.document.body, script);
  }

}
