import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
export declare class CreateManillaDto {
    userId: string;
    readonly contacto_de_emergencia: string;
    readonly telefono_de_emergencia: string;
    tipo: string;
    readonly foto_portador: string;
    readonly licencia: string;
    readonly matricula_o_tarjeta: string;
    readonly factura: string;
    readonly seguro: string;
    readonly tenencias: string;
}
export declare class ManillaMoteroDto extends CreateManillaDto {
    readonly nombre_portador: string;
    readonly marca: string;
    readonly cilindraje: number;
    readonly compañia_de_seguros: string;
    readonly genero: string;
    readonly placa: string;
    readonly rh: string;
    readonly alergias: string;
}
export declare class ManillaAdulto_MayorDto extends CreateManillaDto {
    readonly nombre_portador: string;
    readonly genero: string;
    readonly enfermedades: string;
    readonly recomendaciones: string;
    readonly rh: string;
    readonly alergias: string;
}
export declare class AtLeastOneIsRequiredConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function AtLeastOneIsRequired(fields: string[], validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export declare class ManillaNiñoDto extends CreateManillaDto {
    readonly nombre_portador: string;
    readonly genero: string;
    readonly enfermedades: string;
    readonly recomendaciones: string;
    readonly nombre_padre: string;
    readonly nombre_madre: string;
    readonly telefono_padre: string;
    readonly telefono_madre: string;
    atLeastOneNameIsRequired: string;
    atLeastOnePhoneIsRequired: string;
    readonly rh: string;
    readonly alergias: string;
}
export declare class ManillaMascotaDto extends CreateManillaDto {
    readonly enfermedades: string;
    readonly raza: string;
    readonly nombre_mascota: string;
    readonly fecha_nacimiento_mascota: Date;
}
