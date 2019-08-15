import { Component } from '@angular/core';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  options = {
    title: 'My PDF'
  }
  constructor(private document: DocumentViewer) {

    this.document.viewDocument('assets/GenyaCV.pdf', 'application/pdf',this.options)
  }

}
