import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable({
  providedIn: "root"
})


export class DataService {
  public newsFeed: any = [];
  public ids:any = [];
  public marked: any = [];
  public markedIds: any = [];
  constructor(private db: AngularFirestore) {
    this.getNewsFeed()
  }

  async getNewsFeed() {
    const snapshot = await firebase.firestore().collection('NewsFeed').get()
    this.ids = snapshot.docs.map(doc => doc.id)
    this.newsFeed = snapshot.docs.map(doc => doc.data());

    for(var i = 0; i < this.ids.length;i++){
      this.newsFeed[i].ID = this.ids[i];
    }
    console.log(this.newsFeed);
    return this.newsFeed

}

async getReadLater() {
  const snapshot = await firebase.firestore().collection('NewsFeed').where("readLater", "==", true).get()
  this.markedIds = snapshot.docs.map(doc => doc.id)
  this.marked = snapshot.docs.map(doc => doc.data());

  for(var i = 0; i < this.markedIds.length;i++){
    this.marked[i].ID = this.ids[i];
  }
  console.log(this.marked);
  return this.marked

}

  updateStatus(update,id: string) {
    return firebase.firestore().collection('NewsFeed').doc(id).update(update);
  }

  // addTodo(todo: Todo) {
  //   return this.todosCollection.add(todo);
  // }

  filterItems(searchTerm) {
    return this.newsFeed.filter(item => {
      return item.status.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  
}