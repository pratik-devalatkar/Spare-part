import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PartService } from '../../services/part';

@Component({
  selector: 'app-add-part',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-part.html',
  styleUrl: './add-part.css'
})
export class AddPartComponent {

  part = {
    partName: '',
    quantity: 0,
    minimumLevel: 0,
    unitPrice: 0
  };

  message = '';

  constructor(private partService: PartService, private router: Router) {}

  onSubmit() {
    this.partService.addPart(this.part).subscribe(() => {
      this.message = "Part added successfully!";
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1000);
    });
  }
}
