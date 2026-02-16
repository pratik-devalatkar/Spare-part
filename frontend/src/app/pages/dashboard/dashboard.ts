import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartService } from '../../services/part';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  parts: any[] = [];
  dashboard: any = {};
  history: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private partService: PartService) {}

  ngOnInit(): void {
    this.loadData();
  }

  // Load all required data
  loadData(): void {
    this.loading = true;

    // Get all parts
    this.partService.getAllParts().subscribe({
      next: (data) => {
        this.parts = data;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = "Error loading parts";
      }
    });

    // Get dashboard stats
    this.partService.getDashboard().subscribe({
      next: (data) => {
        this.dashboard = data;
      },
      error: (err) => {
        console.error(err);
      }
    });

    // Get stock history
    this.partService.getHistory().subscribe({
      next: (data) => {
        this.history = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  //  Check if part is low stock
  isLowStock(part: any): boolean {
    return part.quantity < part.minimumLevel;
  }

  //  Add Stock
  addStock(part: any): void {
    const qty = prompt("Enter quantity to add:");

    if (!qty || Number(qty) <= 0) {
      alert("Invalid quantity");
      return;
    }

    this.partService.addStock(part._id, Number(qty)).subscribe({
      next: () => {
        this.loadData(); // refresh data
      },
      error: (err) => {
        console.error(err);
        alert("Error adding stock");
      }
    });
  }

  // Remove Stock
  removeStock(part: any): void {
    const qty = prompt("Enter quantity to remove:");
    const reason = prompt("Reason (Used in Service / Damaged / Sold / Other):");

    if (!qty || Number(qty) <= 0 || !reason) {
      alert("Invalid input");
      return;
    }

    this.partService.removeStock(part._id, {
      quantity: Number(qty),
      reason: reason
    }).subscribe({
      next: () => {
        this.loadData(); // refresh data
      },
      error: (err) => {
        console.error(err);
        alert("Error removing stock");
      }
    });
  }
}
