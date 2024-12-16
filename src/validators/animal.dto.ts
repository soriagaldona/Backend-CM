import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsIn,
  MaxLength,
} from "class-validator";

export class CreateAnimalDto {
  @IsNotEmpty({ message: "El campo IDE es obligatorio." })
  @IsString({ message: "El campo IDE debe ser una cadena de texto." })
  IDE!: string;

  @IsNotEmpty({ message: "El campo IDV es obligatorio." })
  @IsString({ message: "El campo IDV debe ser una cadena de texto." })
  IDV!: string;

  @IsOptional()
  @IsString({ message: "El campo Raza debe ser una cadena de texto." })
  @MaxLength(100, { message: "El campo Raza no debe exceder los 100 caracteres." })
  Raza?: string;

  @IsOptional()
  @IsString({ message: "El campo Pelo debe ser una cadena de texto." })
  @MaxLength(50, { message: "El campo Pelo no debe exceder los 50 caracteres." })
  Pelo?: string;

  @IsOptional()
  @IsString({ message: "El campo Grupo debe ser una cadena de texto." })
  @MaxLength(100, { message: "El campo Grupo no debe exceder los 100 caracteres." })
  Grupo?: string;

  @IsOptional()
  @IsString({ message: "El campo Categoria debe ser una cadena de texto." })
  @IsIn(["Vaca", "Toro", "Novillo", "Vaquilla"], {
    message: "La categoría debe ser 'Vaca', 'Toro', 'Novillo' o 'Vaquilla'.",
  })
  Categoria?: string;

  @IsOptional()
  @IsDateString({}, { message: "El campo Fecha debe tener formato de fecha válido (YYYY-MM-DD)." })
  Fecha?: string;

  @IsOptional()
  @IsString({ message: "El campo Hora debe ser una cadena de texto." })
  Hora?: string;
}
