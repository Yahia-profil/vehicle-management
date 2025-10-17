import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../services/vehicle.service';

interface VehicleStatistics {
  totalVehicles: number;
  vehiclesByType: { [key: string]: number };
  vehiclesByStatus: { [key: string]: number };
}

@Component({
  selector: 'app-vehicle-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-statistics.html',
  styleUrls: ['./vehicle-statistics.css']
})
export class VehicleStatisticsComponent implements OnInit {
  statistics: VehicleStatistics | null = null;
  loading = true;
  error: string | null = null;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.getStatistics().subscribe({
      next: (stats) => {
        this.statistics = stats;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load statistics';
        this.loading = false;
      }
    });
  }
} 