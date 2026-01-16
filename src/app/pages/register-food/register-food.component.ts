import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-register-food',
  imports: [
    CommonModule, 
    FormsModule, 
    ButtonModule, 
    InputTextModule, 
    InputNumberModule, 
    DropdownModule,
    FloatLabelModule
  ],
  templateUrl: './register-food.component.html',
  styleUrl: './register-food.component.scss'
})
export class RegisterFoodComponent {
  mealTypes = [
    { name: 'Café da Manhã', code: 'BREAKFAST' },
    { name: 'Almoço', code: 'LUNCH' },
    { name: 'Lanche', code: 'SNACK' },
    { name: 'Jantar', code: 'DINNER' }
  ];

  selectedMeal: any;
  foodName: string = '';
  calories: number | null = null;
  protein: number | null = null;
  carbs: number | null = null;
  fat: number | null = null;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

  save() {
    // Aqui montamos o objeto para enviar de volta
    const data = {
      mealType: this.selectedMeal?.code,
      foodName: this.foodName,
      calories: this.calories,
      macros: { p: this.protein, c: this.carbs, f: this.fat }
    };

    // Fecha o modal e envia os dados para quem chamou (Dashboard)
    this.ref.close(data);
  }

  cancel() {
    this.ref.close(); // Fecha sem passar dados, então nada acontece na Dashboard
  }

}
