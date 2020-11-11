import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ModalCardComponent } from '../app/modal-card/modal-card.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  board = [];
  connectedTo = [];
  count = 0;

  constructor(public dialog: MatDialog) {
    this.board = [
      {
        id: 'list-1',
        list: [
          {
            cardTitle: 'First Card', cardDescription: 'Description', comments: [
              { time: new Date(), text: 'This is the first Comment' },
              { time: new Date(), text: 'This is the Second Comment' }
            ], cardId: 1
          },
          { cardTitle: 'Second Card', cardDescription: 'Description', comments: [], cardId: 2 },
          { cardTitle: 'Third Card', cardDescription: 'Description', comments: [], cardId: 3 }
        ]
      }, {
        id: 'list-2',
        list: [
          {
            cardTitle: 'First Card', cardDescription: 'Description', comments: [
              { time: new Date(), text: 'This is the first Comment' },
              { time: new Date(), text: 'This is the Second Comment' }
            ], cardId: 4
          },
          { cardTitle: 'Second Card', cardDescription: 'Description', comments: [], cardId: 5 }
        ]
      }, {
        id: 'list-3',
        list: [
          {
            cardTitle: 'First Card', cardDescription: 'Description', comments: [
              { time: new Date(), text: 'This is the first Comment' },
              { time: new Date(), text: 'This is the Second Comment' }
            ], cardId: 6
          },
          { cardTitle: 'Second Card', cardDescription: 'Description', comments: [], cardId: 7 }
        ]
      }
    ];
    for (let list of this.board) {
      this.connectedTo.push(list.id);
    };
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onView(listItem,list) {
    const dialogRef = this.dialog.open(ModalCardComponent, {
      width: '600px',
      maxHeight: '450px',
      data: {
        listNumber: list.id, mode: 'view', cardTitle: listItem.cardTitle,
        cardDescription: listItem.cardDescription, comments: listItem.comments,
        cardId: listItem.cardId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action === "save") {
        this.board.forEach(list => {
          if (list.id === result.listNumber) {
            list.list.forEach(card => {
              if (card.cardId === result.cardId) {
                card.cardTitle = result.cardTitle,
                  card.cardDescription = result.cardDescription,
                  card.comments = result.comments
              }
            });
          }
        })
      } else if (result.action === "delete") {
        this.board.forEach(list => {
          if (list.id === result.listNumber) {
            list.list = list.list.filter(function (card) {return card.cardId != result.cardId})
          }
        })
      }
    })
  }

  addNewCard(listId) {
    const dialogRef = this.dialog.open(ModalCardComponent, {
      width: '600px',
      maxHeight: '450px',
      data: { listNumber: listId, mode: 'create', cardTitle: '', cardDescription: '', comments: [] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action === "create") {
        let count = 1;
        this.board.forEach(list => {
          count += list.list.length;
        })
        this.board.forEach(list => {
          if (list.id === listId) {
            list.list.push({
              cardTitle: result.cardTitle,
              cardDescription: result.cardDescription,
              comments: result.comments,
              cardId: count
            });
          }
        })
      }
    });
  }

  deleteList(listId) {
    this.count++;
    this.board = this.board.filter(function (list) { return list.id != listId });
  }
  addList() {
    let newList = { id: 'list-' + (this.board.length + 1 + this.count), list: [] };
    this.board.push(newList);
    for (let list of this.board) {
      this.connectedTo.push(list.id);
    };
  }
}