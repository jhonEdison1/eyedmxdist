/// <reference types="node" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateManillaDto } from './dto/create-manilla.dto';
import { EditManillaDto, UpdateManillaDto } from './dto/update-manilla.dto';
import { Manilla, estadoManilla } from './entities/manilla.entity';
import { Model, Types } from 'mongoose';
import { FilterManillaDto } from './dto/filter-manilla.dto';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { EntradasService } from '../entradas/entradas.service';
import { CreateEntradaDto } from '../entradas/dto/create-entrada.dto';
import { MailService } from '../mail/mail.service';
export declare class ManillasService {
    private readonly configSerivce;
    private readonly manillaModel;
    private readonly entradaService;
    private readonly mailService;
    private readonly s3;
    constructor(configSerivce: ConfigType<typeof config>, manillaModel: Model<Manilla>, entradaService: EntradasService, mailService: MailService);
    createManilla(createManillaDto: CreateManillaDto, userId: string): Promise<import("mongoose").Document<unknown, {}, Manilla> & Manilla & {
        _id: Types.ObjectId;
    }>;
    editManilla(id: string, editManillaDto: EditManillaDto, userId: string): Promise<{
        message: string;
        manillaEditada: import("mongoose").Document<unknown, {}, Manilla> & Manilla & {
            _id: Types.ObjectId;
        };
    }>;
    uploadBase64ToS3(id: string, base64Data: string, field: string, extension: string): Promise<string>;
    findSolicitudes(params?: FilterManillaDto): Promise<{
        manillas: Omit<import("mongoose").Document<unknown, {}, Manilla> & Manilla & {
            _id: Types.ObjectId;
        }, never>[];
        totalDocuments: number;
    }>;
    findAceptadasHoy(params?: FilterManillaDto): Promise<{
        manillas: Omit<import("mongoose").Document<unknown, {}, Manilla> & Manilla & {
            _id: Types.ObjectId;
        }, never>[];
        totalDocuments: number;
        manillasResagadas: Omit<import("mongoose").Document<unknown, {}, Manilla> & Manilla & {
            _id: Types.ObjectId;
        }, never>[];
        totalDocumentsResagadas: number;
    }>;
    findById(id: number): Promise<import("mongoose").Document<unknown, {}, Manilla> & Manilla & {
        _id: Types.ObjectId;
    }>;
    findAll(params?: FilterManillaDto): Promise<{
        manillas: Omit<import("mongoose").Document<unknown, {}, Manilla> & Manilla & {
            _id: Types.ObjectId;
        }, never>[];
        totalDocuments: number;
    }>;
    getEstados(): {
        name: string;
        value: any;
    }[];
    aceptarManilla(id: string): Promise<{
        message: string;
        manilla: import("mongoose").Document<unknown, {}, Manilla> & Manilla & {
            _id: Types.ObjectId;
        };
    }>;
    enviarManilla(id: string): Promise<{
        message: string;
        manilla: import("mongoose").Document<unknown, {}, Manilla> & Manilla & {
            _id: Types.ObjectId;
        };
    }>;
    cambiarEstadoManilla(id: string, estado: estadoManilla): Promise<{
        message: string;
        manilla: import("mongoose").Document<unknown, {}, Manilla> & Manilla & {
            _id: Types.ObjectId;
        };
    }>;
    svgToPng(svgXml: string): Promise<Buffer>;
    findLastNumId(): Promise<number>;
    cambiarestadoVarias(ids: string[], estado: estadoManilla): Promise<{
        manillas: any[];
        errores: string[];
    }>;
    aceptarVariasManillas(ids: string[]): Promise<{
        aceptadas: any[];
        errores: string[];
    }>;
    aceptarTodasLasManillas(): Promise<{
        aceptadas: any[];
        errores: string[];
    }>;
    obtenerMisManillasAgrupadasPorTipo(userId: string, params?: FilterManillaDto): Promise<{
        misManillas: any[];
    }>;
    obtenerInfoMotoPorPlaca(placa: string, tallerid: string): Promise<{
        placa: string;
        marca: string;
        cilindraje: number;
        conductor: string;
        entradas: Omit<import("mongoose").Document<unknown, {}, import("../entradas/entities/entrada.entity").Entrada> & import("../entradas/entities/entrada.entity").Entrada & {
            _id: Types.ObjectId;
        }, never>[];
    }>;
    crearEntradaManilla(placa: string, createEntradaManillaDto: CreateEntradaDto, userId: string): Promise<{
        placa: string;
        marca: string;
        cilindraje: number;
        conductor: string;
        entradas: Omit<import("mongoose").Document<unknown, {}, import("../entradas/entities/entrada.entity").Entrada> & import("../entradas/entities/entrada.entity").Entrada & {
            _id: Types.ObjectId;
        }, never>[];
    }>;
    findOne(id: number): string;
    update(id: number, updateManillaDto: UpdateManillaDto): string;
    remove(id: number): string;
}
