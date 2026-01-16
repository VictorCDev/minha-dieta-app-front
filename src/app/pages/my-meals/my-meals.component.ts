import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { MealConfig } from '../../models/meal.model';


@Component({
  selector: 'app-my-meals',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, CardModule, TooltipModule],
  templateUrl: './my-meals.component.html',
  styleUrl: './my-meals.component.scss'
})
export class MyMealsComponent implements OnInit{

  myMeals: MealConfig[] = [
    { id: 1, name: 'Café da Manhã', time: '07:30', targetCalories: 400 },
    { id: 2, name: 'Almoço', time: '12:00', targetCalories: 600 },
    { id: 3, name: 'Lanche da Tarde', time: '16:00', targetCalories: 250 },
    { id: 4, name: 'Jantar', time: '20:00', targetCalories: 450 }
  ];

  constructor() {}

  ngOnInit(): void {
    // Futuramente: this.loadMealsFromBackend();
  }

  addMeal() {
    console.log('Abrir modal de Nova Refeição');
  }

  editMeal(meal: MealConfig) {
    console.log('Editando:', meal.name);
  }

  deleteMeal(meal: MealConfig) {
    console.log('Excluindo:', meal.name);
  }

}
