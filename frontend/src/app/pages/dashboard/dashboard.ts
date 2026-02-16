import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartService } from '../../services/part';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  parts: any[] = [];
  dashboard: any = {};
  history: any[] = [];

  // Modal control
  showModal: boolean = false;
  selectedPart: any = null;
  actionType: 'add' | 'remove' = 'add';

  stockQuantity: number = 0;
  removeReason: string = '';

  // Button loading state
  isSubmitting: boolean = false;

  // Toast
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';
  showToast: boolean = false;

  constructor(
    private partService: PartService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.loadData();
  }

  // Load all dashboard data
  loadData(): void {
    this.partService.getAllParts().subscribe(data => this.parts = data);
    this.partService.getDashboard().subscribe(data => this.dashboard = data);
    this.partService.getHistory().subscribe(data => this.history = data);
  }

  // Low stock check
  isLowStock(part: any): boolean {
    return part.quantity < part.minimumLevel;
  }

  // Open modal
  openModal(part: any, type: 'add' | 'remove'): void {
    this.selectedPart = part;
    this.actionType = type;
    this.stockQuantity = 0;
    this.removeReason = '';
    this.showModal = true;
  }

  // Close modal
  closeModal(): void {
  this.showModal = false;
  this.isSubmitting = false;
  this.cdr.detectChanges();  
}

  // Main submit function
  submitStockAction(): void {

    if (this.stockQuantity <= 0) {
      this.showToastMessage("Invalid quantity", "error");
      return;
    }

    if (this.actionType === 'add') {
      this.handleAddStock();
    }

    if (this.actionType === 'remove') {
      this.handleRemoveStock();
    }
  }

  // Add stock handler
  handleAddStock(): void {

    this.isSubmitting = true;

    this.partService.addStock(this.selectedPart._id, this.stockQuantity)
      .subscribe({
        next: () => {
          this.showToastMessage("Stock Added Successfully", "success");
          this.closeModal();
          this.loadData();
        },
        error: (err) => {
          this.showToastMessage(
            err.error?.message || "Error Adding Stock",
            "error"
          );
          this.isSubmitting = false;
        }
      });
  }

  // Remove stock handler
  handleRemoveStock(): void {

    if (!this.removeReason) {
      this.showToastMessage("Select reason", "error");
      return;
    }

    this.isSubmitting = true;

    this.partService.removeStock(this.selectedPart._id, {
      quantity: this.stockQuantity,
      reason: this.removeReason
    }).subscribe({
      next: () => {
        this.showToastMessage("Stock Removed Successfully", "success");
        this.isSubmitting = false;
        this.closeModal();
        this.loadData();
      },
      error: (err) => {
        this.showToastMessage(
          err.error?.message || "Not enough stock",
          "error"
        );

        this.isSubmitting = false;

        this.cdr.detectChanges();
      }
    });
  }


  // Toast display
  showToastMessage(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
