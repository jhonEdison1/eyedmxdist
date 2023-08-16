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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManillaSchema = exports.Manilla = exports.estadoManilla = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../../users/entities/user.entity");
const authentication_common_service_1 = require("../../iam/authentication/authentication.common.service");
var estadoManilla;
(function (estadoManilla) {
    estadoManilla["Solicitada"] = "Solicitada";
    estadoManilla["Aceptada"] = "Aceptada";
    estadoManilla["Rechazada"] = "Rechazada";
    estadoManilla["Enviada"] = "Enviada";
    estadoManilla["Entregada"] = "Entregada";
})(estadoManilla = exports.estadoManilla || (exports.estadoManilla = {}));
let Manilla = class Manilla extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_entity_1.User)
], Manilla.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "contacto_de_emergencia", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "telefono_de_emergencia", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Manilla.prototype, "tipo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "qrCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "qrdxf", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: estadoManilla.Solicitada }),
    __metadata("design:type", String)
], Manilla.prototype, "estado", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", Array)
], Manilla.prototype, "entradas", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "rh", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "alergias", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "marca", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", Number)
], Manilla.prototype, "cilindraje", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "compa\u00F1ia_de_seguros", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "genero", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "placa", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "enfermedades", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "recomendaiones", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "nombre_padre", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "nombre_madre", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "telefono_padre", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "telefono_madre", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "raza", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "nombre_mascota", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", Date)
], Manilla.prototype, "fecha_nacimiento_mascota", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], Manilla.prototype, "nombre_portador", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "foto_portador", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "licencia", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "matricula_o_tarjeta", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "factura", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "seguro", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Manilla.prototype, "tenencias", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Manilla.prototype, "numid", void 0);
Manilla = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Manilla);
exports.Manilla = Manilla;
exports.ManillaSchema = mongoose_1.SchemaFactory.createForClass(Manilla);
//# sourceMappingURL=manilla.entity.js.map