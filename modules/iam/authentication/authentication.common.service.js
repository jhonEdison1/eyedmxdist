"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationCommonService = exports.Tipos = void 0;
const common_1 = require("@nestjs/common");
const errors_service_1 = require("../../errors/errors.service");
const hashing_service_1 = require("../../../providers/hashing/hashing.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("../../users/entities/user.entity");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../../../config");
var Tipos;
(function (Tipos) {
    Tipos["Motero"] = "Motero";
    Tipos["Adulto_Mayor"] = "Adulto_Mayor";
    Tipos["Ni\u00F1o"] = "Ni\u00F1o";
    Tipos["Mascota"] = "Mascota";
})(Tipos = exports.Tipos || (exports.Tipos = {}));
let AuthenticationCommonService = class AuthenticationCommonService {
    constructor(configSerivce, userModel, errorService, hashingService, jwtService) {
        this.configSerivce = configSerivce;
        this.userModel = userModel;
        this.errorService = errorService;
        this.hashingService = hashingService;
        this.jwtService = jwtService;
    }
    async isAcepted(id) {
        try {
            const user = await this.userModel.findById(id).exec();
            if (!user) {
                throw new common_1.ConflictException('El usuario no existe');
            }
            return user.aceptado;
        }
        catch (error) {
            this.errorService.createError(error);
        }
    }
    generateJwtAccessToken(payload) {
        try {
            const accessToken = this.jwtService.signAsync(payload, {
                secret: this.configSerivce.session.jwtAccessTokenSecret,
                expiresIn: this.configSerivce.session.jwtAccessTokenExpiresTime,
            });
            return accessToken;
        }
        catch (error) {
            this.errorService.createError(error);
        }
    }
    generateJwtRefreshoken(payload) {
        try {
            const refreshToken = this.jwtService.signAsync(payload, {
                secret: this.configSerivce.session.jwtRefreshTokenSecret,
                expiresIn: this.configSerivce.session.jwtRefreshTokenExpiresTime,
            });
            return refreshToken;
        }
        catch (error) {
            this.errorService.createError(error);
        }
    }
    async findUserToAuthenticate(payload) {
        try {
            const user = await this.userModel.findOne({ email: payload.email.trim() }).exec();
            if (!user) {
                throw new common_1.ConflictException("Por favor ingrese un email y/o contraseña válida");
            }
            const isPasswordMatched = await this.hashingService.compare(payload.password.trim(), user.password);
            if (!isPasswordMatched) {
                throw new common_1.ConflictException("Por favor ingrese un email y/o contraseña válida");
            }
            return user;
        }
        catch (error) {
            this.errorService.createError(error);
        }
    }
    async findUserAutenticated(id) {
        try {
            return await this.userModel.findById(id);
        }
        catch (error) {
            this.errorService.createError(error);
        }
    }
    getFields(type) {
        switch (type) {
            case Tipos.Motero:
                return [
                    {
                        name: "nombre_portador",
                        type: "text",
                        description: "Nombre del portador de la pulsera",
                    },
                    {
                        name: "foto_portador",
                        type: "file",
                        description: "Foto del portador de la pulsera",
                        required: true
                    },
                    {
                        name: "marca",
                        type: "text",
                        description: "Marca de la moto",
                        required: true
                    },
                    {
                        name: "cilindraje",
                        type: "number",
                        description: "Cilindraje de la moto",
                        required: true
                    },
                    {
                        name: "compañia_de_seguros",
                        type: "text",
                        description: "Compañia de seguros",
                        required: true
                    },
                    {
                        name: "genero",
                        type: "select",
                        description: "Genero del portador de la pulsera",
                        opciones: ["Masculino", "Femenino", "Otro"],
                        required: true
                    },
                    {
                        name: "placa",
                        type: "text",
                        description: "Placa de la moto",
                        required: true
                    },
                    {
                        name: "rh",
                        type: "select",
                        description: "Rh del portador de la pulsera",
                        opciones: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
                        required: true
                    },
                    {
                        name: "alergias",
                        type: "text",
                        description: "Alergias del portador de la pulsera",
                        required: false
                    },
                    {
                        name: "contacto_de_emergencia",
                        type: "text",
                        description: "Contacto de emergencia",
                        required: true
                    },
                    {
                        name: "telefono_de_emergencia",
                        type: "telefono",
                        description: "Telefono de emergencia",
                        required: true
                    }, {
                        name: "licencia",
                        type: "file",
                        description: "licencia de conduccion",
                        required: false
                    },
                    {
                        name: "matricula_o_tarjeta",
                        type: "file",
                        description: "Matricula o tarjeta de circulación",
                        required: false
                    },
                    {
                        name: "factura",
                        type: "file",
                        description: "factura de la moto",
                        required: false
                    },
                    {
                        name: "seguro",
                        type: "file",
                        description: "seguro de la moto",
                        required: false
                    },
                    {
                        name: "tenencias",
                        type: "file",
                        description: "tenencias de la moto",
                        required: false
                    },
                ];
                break;
            case Tipos.Adulto_Mayor:
                return [
                    {
                        name: "nombre_portador",
                        type: "text",
                        description: "Nombre del portador de la pulsera",
                    },
                    {
                        name: "genero",
                        type: "select",
                        description: "Genero del portador de la pulsera",
                        opciones: ["Masculino", "Femenino", "Otro"],
                        required: true
                    },
                    {
                        name: "enfermedades",
                        type: "text",
                        description: "Enfermedades del adulto mayor",
                        required: true
                    },
                    {
                        name: "recomendaciones",
                        type: "textarea",
                        description: "Recomendaciones del adulto mayor",
                        required: false
                    },
                    {
                        name: "rh",
                        type: "select",
                        description: "Rh del portador de la pulsera",
                        opciones: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
                        required: true
                    },
                    {
                        name: "alergias",
                        type: "text",
                        description: "Alergias del portador de la pulsera",
                        required: false
                    },
                    {
                        name: "contacto_de_emergencia",
                        type: "text",
                        description: "Contacto de emergencia",
                        required: true
                    },
                    {
                        name: "telefono_de_emergencia",
                        type: "telefono",
                        description: "Telefono de emergencia",
                        required: true
                    },
                    {
                        name: "foto_portador",
                        type: "file",
                        description: "Foto del portador de la pulsera",
                        required: true
                    },
                ];
                break;
            case Tipos.Niño:
                return [
                    {
                        name: "nombre_portador",
                        type: "text",
                        description: "Nombre del portador de la pulsera",
                    },
                    {
                        name: "foto_portador",
                        type: "file",
                        description: "Foto del portador de la pulsera",
                        required: true
                    },
                    {
                        name: "genero",
                        type: "select",
                        description: "Genero del portador de la pulsera",
                        opciones: ["Masculino", "Femenino", "Otro"],
                        required: true
                    },
                    {
                        name: "enfermedades",
                        type: "text",
                        description: "Enfermedades del niño",
                        required: false
                    },
                    {
                        name: "recomendaciones",
                        type: "textarea",
                        description: "Recomendaciones del niño",
                        required: false
                    },
                    {
                        name: "nombre_padre",
                        type: "text",
                        description: "Nombre del padre",
                        required: false
                    },
                    {
                        name: "nombre_madre",
                        type: "text",
                        description: "Nombre de la madre",
                        required: false
                    },
                    {
                        name: "telefono_padre",
                        type: "telefono",
                        description: "Telefono del padre",
                        required: false
                    },
                    {
                        name: "telefono_madre",
                        type: "telefono",
                        description: "Telefono de la madre",
                        required: false
                    },
                    {
                        name: "rh",
                        type: "select",
                        description: "Rh del portador de la pulsera",
                        opciones: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
                        required: true
                    },
                    {
                        name: "alergias",
                        type: "text",
                        description: "Alergias del portador de la pulsera",
                        required: false
                    },
                    {
                        name: "contacto_de_emergencia",
                        type: "text",
                        description: "Contacto de emergencia",
                        required: true
                    },
                    {
                        name: "telefono_de_emergencia",
                        type: "telefono",
                        description: "Telefono de emergencia",
                        required: true
                    }
                ];
                break;
            case Tipos.Mascota:
                return [
                    {
                        name: "enfermedades",
                        type: "text",
                        description: "Enfermedades de la mascota",
                        required: false
                    },
                    {
                        name: "fecha_nacimiento_mascota",
                        type: "Date",
                        description: "Fecha de nacimiento de la mascota",
                        required: false
                    },
                    {
                        name: "raza",
                        type: "text",
                        description: "Raza de la mascota",
                        required: false
                    },
                    {
                        name: "nombre_mascota",
                        type: "text",
                        description: "Nombre de la mascota",
                        required: true
                    },
                    {
                        name: "contacto_de_emergencia",
                        type: "text",
                        description: "Contacto de emergencia",
                        required: true
                    },
                    {
                        name: "telefono_de_emergencia",
                        type: "telefono",
                        description: "Telefono de emergencia",
                        required: true
                    },
                    {
                        name: "foto_portador",
                        type: "file",
                        description: "Foto del portador de la pulsera",
                        required: true
                    },
                ];
        }
    }
    getTypes() {
        return [
            {
                name: Tipos.Motero,
                description: "Motero"
            },
            {
                name: Tipos.Adulto_Mayor,
                description: "Adulto Mayor"
            },
            {
                name: Tipos.Niño,
                description: "Niño"
            },
            {
                name: Tipos.Mascota,
                description: "Mascota"
            }
        ];
    }
};
AuthenticationCommonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.default.KEY)),
    __param(1, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [void 0, mongoose_2.Model,
        errors_service_1.ErrorsService,
        hashing_service_1.HashingService,
        jwt_1.JwtService])
], AuthenticationCommonService);
exports.AuthenticationCommonService = AuthenticationCommonService;
//# sourceMappingURL=authentication.common.service.js.map