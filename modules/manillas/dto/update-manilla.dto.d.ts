import { CreateManillaDto } from './create-manilla.dto';
import { estadoManilla } from "../entities/manilla.entity";
import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
declare const UpdateManillaDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateManillaDto>>;
export declare class UpdateManillaDto extends UpdateManillaDto_base {
    estado: estadoManilla;
}
export declare class EditManillaDto {
    readonly contacto_de_emergencia: string;
    readonly telefono_de_emergencia: string;
    foto_portador: string;
    licencia: string;
    matricula_o_tarjeta: string;
    factura: string;
    seguro: string;
    tenencias: string;
}
export declare class EditManillaMoteroDto extends EditManillaDto {
    readonly nombre_portador: string;
    readonly marca: string;
    readonly cilindraje: number;
    readonly compañia_de_seguros: string;
    readonly genero: string;
    readonly placa: string;
    readonly rh: string;
    readonly alergias: string;
}
export declare class EditManillaAdulto_MayorDto extends EditManillaDto {
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
export declare class EditManillaNiñoDto extends EditManillaDto {
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
export declare class EditManillaMascotaDto extends EditManillaDto {
    readonly enfermedades: string;
    readonly raza: string;
    readonly nombre_mascota: string;
    readonly fecha_nacimiento_mascota: Date;
}
export {};
