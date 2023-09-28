import { Component, OnInit } from "@angular/core";
import { trigger, style, animate, transition } from "@angular/animations";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  animations: [
    trigger("fade", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
      transition(":leave", [
        style({ opacity: 1 }),
        animate(500, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  showUtilSection = false; // Inisialisasi dengan false agar elemen tidak ditampilkan

  showConfirmSection = false;

  // Fungsi ini akan dipanggil saat tombol "Proceed" ditekan
  onProceedButtonClick() {
    this.showUtilSection = true; // Menampilkan elemen .util_section
  }

  onCloseButtonClick() {
    this.showConfirmSection = true; // Menampilkan elemen .util_section
  }

  onCancelClick() {
    this.showConfirmSection = false; // Menutup dialog konfirmasi
  }

  constructor() {}

  ngOnInit(): void {}
}
