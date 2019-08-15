import { Component } from '@angular/core';
import { DataService } from "../services/data.service";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private dataService: DataService) {
    
  }

  callService(){
    console.log('serviceCalled')
    this.dataService.getReadLater();
  }
}
