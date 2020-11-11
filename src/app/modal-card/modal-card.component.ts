import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-card',
  templateUrl: './modal-card.component.html',
  styleUrls: ['./modal-card.component.scss']
})
export class ModalCardComponent implements OnInit{
  cardTitle: string = '';
  cardDescription: string = '';
  mode: string = '';
  showAddComment: boolean;
  comments = [];
  commentData: string;

  constructor(
    public dialogRef: MatDialogRef<ModalCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.cardTitle = this.data.cardTitle;
    this.cardDescription = this.data.cardDescription;
    this.comments = [...this.data.comments];
  }
    OnAddComment(): void {
    this.showAddComment = true;
  }

  onCommentSubmit(): void {
    this.showAddComment = !this.showAddComment;
    this.comments.push({ time: new Date(), text: this.commentData })
    this.commentData='';
  }

  onCreate(): void {
    this.dialogRef.close({
      cardTitle: this.cardTitle,
      cardDescription: this.cardDescription,
      comments: this.comments,
      listNumber: this.data.listNumber,
      mode: this.data.mode,
      action: 'create'
    });
  }

  onSave(): void {
    this.dialogRef.close({
      cardTitle: this.cardTitle,
      cardDescription: this.cardDescription,
      comments: this.comments,
      listNumber: this.data.listNumber,
      mode: this.data.mode,
      action: 'save',
      cardId: this.data.cardId
    });
  }

  onDelete(): void {
    this.dialogRef.close({
      action: 'delete',
      listNumber: this.data.listNumber,
      cardId: this.data.cardId
    });
  }
  onClose(): void {
    this.dialogRef.close({
      action: 'close'
    });
  }

}
