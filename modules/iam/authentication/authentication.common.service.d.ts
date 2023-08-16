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
import { SignInDto } from './dto/signin-auth.dto';
import { ErrorsService } from 'src/modules/errors/errors.service';
import { HashingService } from 'src/providers/hashing/hashing.service';
import { User } from 'src/modules/users/entities/user.entity';
import { Model } from 'mongoose';
import { PayloadToken } from '../models/token.model';
import { JwtService } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
export declare enum Tipos {
    Motero = "Motero",
    Adulto_Mayor = "Adulto_Mayor",
    Niño = "Ni\u00F1o",
    Mascota = "Mascota"
}
export declare class AuthenticationCommonService {
    private readonly configSerivce;
    private readonly userModel;
    private readonly errorService;
    private readonly hashingService;
    private readonly jwtService;
    constructor(configSerivce: ConfigType<typeof config>, userModel: Model<User>, errorService: ErrorsService, hashingService: HashingService, jwtService: JwtService);
    isAcepted(id: string): Promise<Boolean>;
    generateJwtAccessToken(payload: PayloadToken): Promise<string>;
    generateJwtRefreshoken(payload: PayloadToken): Promise<string>;
    findUserToAuthenticate(payload: SignInDto): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findUserAutenticated(id: string): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getFields(type: string): ({
        name: string;
        type: string;
        description: string;
        required?: undefined;
        opciones?: undefined;
    } | {
        name: string;
        type: string;
        description: string;
        required: boolean;
        opciones?: undefined;
    } | {
        name: string;
        type: string;
        description: string;
        opciones: string[];
        required: boolean;
    })[];
    getTypes(): {
        name: Tipos;
        description: string;
    }[];
}
