import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.css"],
})
export class ConfirmDialogComponent implements OnInit {
  @Output() cancelClick: EventEmitter<void> = new EventEmitter();
  @Output() confirmClick: EventEmitter<void> = new EventEmitter();

  @Input() message: string = "";

  onCancelClick(): void {
    this.cancelClick.emit();
  }

  onConfirmClick(): void {
    this.confirmClick.emit();
  }

  constructor() {}

  ngOnInit(): void {}
}
