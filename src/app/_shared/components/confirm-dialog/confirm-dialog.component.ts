import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  styleUrls: ['./confirm-dialog.component.scss'],
  template: `
    <ng-container>
      <h3 class="message">{{ messageText }}</h3>
      <br />
      <div class="fx-row">
        <button mat-raised-button (click)="onConfirmClicked()">
          {{ confirmText }}
        </button>
        <button (click)="onCancelClicked()">
          {{ cancelText }}
        </button>
      </div>
    </ng-container>
  `,
})
export class ConfirmDialogComponent {
  public messageText = 'Delete ';
  public confirmText = 'Yes';
  public cancelText = 'No';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
  ) {
    if (this.data.message) {
      this.messageText = this.data.message;
    }
  }

  onConfirmClicked(): void {
    this.dialogRef.close(true);
  }

  onCancelClicked(): void {
    this.dialogRef.close(null);
  }
}
