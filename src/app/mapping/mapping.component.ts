import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-mapping",
  templateUrl: "./mapping.component.html",
  styleUrls: ["./mapping.component.css"],
})
export class MappingComponent implements OnInit {
  status: string = "On Progress"; // Initial status
  activeButton: string = "play"; // Initial active button

  showUtilSection = false; // Inisialisasi dengan false agar elemen tidak ditampilkan

  showConfirmSection = false;
  showConfirmStopSection = false;

  // Fungsi ini akan dipanggil saat tombol "Proceed" ditekan
  onProceedButtonClick() {
    this.showUtilSection = true; // Menampilkan elemen .util_section
  }

  onCloseButtonClick() {
    this.showConfirmSection = true; // Menampilkan elemen .util_section
  }

  onStopButtonClick(){
    this.showConfirmStopSection = true;
  }

  onCancelClick() {
    this.showConfirmSection = false;
    this.showConfirmStopSection = false; // Menutup dialog konfirmasi
  }

  // Function to toggle the active button and update status
  toggleButton(button: string) {
    if (button == "pause") {
      // If the same button is clicked again, toggle it off
      this.activeButton = button;
      this.status = "Idle";
    } else if (button == "play") {
      // Toggle the active button to the clicked button
      this.activeButton = button;
      this.status = "On Progress"; // or any other status
    }
  }

  statusBackgroundColor() {
    // Return the background color based on the status value
    return this.status === "Idle" ? "#0567A6" : ""; // Change this to the desired color
  }

  progressBackgroundColor() {
    // Return the background color based on the status value
    return this.status === "Idle" ? "#345D7D" : ""; // Change this to the desired color
  }

  constructor() {}

  ngOnInit(): void {}
}
