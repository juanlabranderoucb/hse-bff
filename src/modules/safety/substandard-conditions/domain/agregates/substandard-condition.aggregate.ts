import { NotAcceptableException } from "@nestjs/common";
import { SubstandardConditionImpactEntity } from "../entities/substandard-condition-impact.entity";

export class SubstandardCondition {
  constructor(
    private readonly id: number,
    private description: string,
    private location: string,
    private date: Date,
    private impacts: SubstandardConditionImpactEntity[],
  ) {}

  elapsed(): string {
    const now = new Date();
  
    const elapsedMilliseconds = now.getTime() - this.date.getTime(); // Diferencia en milisegundos
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000); // Convertir a segundos
    const elapsedMinutes = Math.floor(elapsedSeconds / 60); // Convertir a minutos
    const elapsedHours = Math.floor(elapsedMinutes / 60); // Convertir a horas
    const elapsedDays = Math.floor(elapsedHours / 24); // Convertir a días
  
    if (elapsedDays > 0) {
      return `hace ${elapsedDays % 60} días`;
    } else if (elapsedHours > 0) {
      return `hace ${elapsedHours % 60} horas`;
    } else if (elapsedMinutes == 1) {
      return `hace 1 minuto`;
    } else if (elapsedMinutes > 1) {
      return `hace ${elapsedMinutes % 60} minutos`;
    } else {
      return 'ahora';
    }
  };

  addImpact(impact: SubstandardConditionImpactEntity) {
    this.impacts.push(impact);
  }

  removeImpact(impact: SubstandardConditionImpactEntity) {
    this.impacts = this.impacts.filter((i) => i.id !== impact.id);
  }

  getId() {
    return this.id;
  }
  getDescription() {
    return this.description;
  }
  getLocation() {
    return this.location;
  }

  setDescription(description: string) {
    this.description = description;
  }
  setLocation(location: string) {
    this.location = location;
  }

  validate() {
    if (this.id == 0)
      throw new NotAcceptableException('Condicion subestandar no encontrado');
  }
}
