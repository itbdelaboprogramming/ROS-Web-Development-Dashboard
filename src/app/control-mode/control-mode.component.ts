import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-control-mode",
  templateUrl: "./control-mode.component.html",
  styleUrls: ["./control-mode.component.css"],
})
export class ControllModeComponent implements OnInit {
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
