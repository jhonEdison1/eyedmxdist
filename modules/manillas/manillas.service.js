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
exports.ManillasService = void 0;
const common_1 = require("@nestjs/common");
const create_manilla_dto_1 = require("./dto/create-manilla.dto");
const class_validator_1 = require("class-validator");
const manilla_entity_1 = require("./entities/manilla.entity");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const authentication_common_service_1 = require("../iam/authentication/authentication.common.service");
const config_1 = require("../../config");
const qr = require("qrcode");
const AWS = require("aws-sdk");
const date_fns_1 = require("date-fns");
const entradas_service_1 = require("../entradas/entradas.service");
const mail_service_1 = require("../mail/mail.service");
const sharp = require("sharp");
let ManillasService = class ManillasService {
    constructor(configSerivce, manillaModel, entradaService, mailService) {
        this.configSerivce = configSerivce;
        this.manillaModel = manillaModel;
        this.entradaService = entradaService;
        this.mailService = mailService;
        this.s3 = new AWS.S3({
            accessKeyId: this.configSerivce.s3.accessKeyId,
            secretAccessKey: this.configSerivce.s3.secretAccessKey,
            region: this.configSerivce.s3.region
        });
    }
    async createManilla(createManillaDto, userId) {
        const errors = await (0, class_validator_1.validate)(createManillaDto);
        if (errors.length > 0) {
            throw new common_1.ConflictException('Datos inválidos');
        }
        if (createManillaDto.userId !== userId) {
            throw new common_1.UnauthorizedException('No tiene permisos para crear pulseras para otro usuario');
        }
        let manilla;
        switch (createManillaDto.tipo) {
            case authentication_common_service_1.Tipos.Motero:
                manilla = new create_manilla_dto_1.ManillaMoteroDto();
                break;
            case authentication_common_service_1.Tipos.Adulto_Mayor:
                manilla = new create_manilla_dto_1.ManillaAdulto_MayorDto();
                break;
            case authentication_common_service_1.Tipos.Niño:
                manilla = new create_manilla_dto_1.ManillaNiñoDto();
                break;
            case authentication_common_service_1.Tipos.Mascota:
                manilla = new create_manilla_dto_1.ManillaMascotaDto();
                break;
            default:
                throw new common_1.ConflictException('Tipo de pulsera no válido');
        }
        Object.assign(manilla, createManillaDto);
        const customErrors = await (0, class_validator_1.validate)(manilla);
        if (customErrors.length > 0) {
            throw new common_1.ConflictException('Datos inválidos para el tipo de pulsera' + customErrors);
        }
        const lastNumId = await this.findLastNumId();
        const newRecord = new this.manillaModel(manilla);
        newRecord.numid = lastNumId + 1;
        if (createManillaDto.foto_portador) {
            let dataD = createManillaDto.foto_portador;
            let extension = dataD.substring("data:".length, dataD.indexOf(";base64"));
            if (extension == 'application/pdf') {
                dataD = dataD.replace('data:application/pdf;base64,', '');
                extension = 'pdf';
            }
            else {
                dataD = dataD.replace(/^data:image\/\w+;base64,/, '');
                extension = 'png';
            }
            newRecord.foto_portador = await this.uploadBase64ToS3(newRecord._id.toString(), dataD, 'foto_portador', extension);
        }
        if (createManillaDto.licencia) {
            let dataD = createManillaDto.licencia;
            let extension = dataD.substring("data:".length, dataD.indexOf(";base64"));
            if (extension == 'application/pdf') {
                dataD = dataD.replace('data:application/pdf;base64,', '');
                extension = 'pdf';
            }
            else {
                dataD = dataD.replace(/^data:image\/\w+;base64,/, '');
                extension = 'png';
            }
            newRecord.licencia = await this.uploadBase64ToS3(newRecord._id.toString(), dataD, 'licencia', extension);
        }
        if (createManillaDto.matricula_o_tarjeta) {
            let dataD = createManillaDto.matricula_o_tarjeta;
            let extension = dataD.substring("data:".length, dataD.indexOf(";base64"));
            if (extension == 'application/pdf') {
                dataD = dataD.replace('data:application/pdf;base64,', '');
                extension = 'pdf';
            }
            else {
                dataD = dataD.replace(/^data:image\/\w+;base64,/, '');
                extension = 'png';
            }
            newRecord.matricula_o_tarjeta = await this.uploadBase64ToS3(newRecord._id.toString(), dataD, 'matricula_o_tarjeta', extension);
        }
        if (createManillaDto.factura) {
            let dataD = createManillaDto.factura;
            let extension = dataD.substring("data:".length, dataD.indexOf(";base64"));
            if (extension == 'application/pdf') {
                dataD = dataD.replace('data:application/pdf;base64,', '');
                extension = 'pdf';
            }
            else {
                dataD = dataD.replace(/^data:image\/\w+;base64,/, '');
                extension = 'png';
            }
            newRecord.factura = await this.uploadBase64ToS3(newRecord._id.toString(), dataD, 'factura', extension);
        }
        if (createManillaDto.seguro) {
            let dataD = createManillaDto.seguro;
            let extension = dataD.substring("data:".length, dataD.indexOf(";base64"));
            if (extension == 'application/pdf') {
                dataD = dataD.replace('data:application/pdf;base64,', '');
                extension = 'pdf';
            }
            else {
                dataD = dataD.replace(/^data:image\/\w+;base64,/, '');
                extension = 'png';
            }
            newRecord.seguro = await this.uploadBase64ToS3(newRecord._id.toString(), dataD, 'seguro', extension);
        }
        if (createManillaDto.tenencias) {
            let dataD = createManillaDto.tenencias;
            let extension = dataD.substring("data:".length, dataD.indexOf(";base64"));
            if (extension == 'application/pdf') {
                dataD = dataD.replace('data:application/pdf;base64,', '');
                extension = 'pdf';
            }
            else {
                dataD = dataD.replace(/^data:image\/\w+;base64,/, '');
                extension = 'png';
            }
            newRecord.tenencias = await this.uploadBase64ToS3(newRecord._id.toString(), dataD, 'tenencias', extension);
        }
        const newManilla = await newRecord.save();
        return newManilla;
    }
    async editManilla(id, editManillaDto, userId) {
        const manilla = await this.manillaModel.findById(id);
        if (!manilla) {
            throw new common_1.NotFoundException('No existe la pulsera');
        }
        if (manilla.userId.toString() !== userId) {
            throw new common_1.UnauthorizedException('No tiene permisos para editar esta pulsera');
        }
        const errors = await (0, class_validator_1.validate)(editManillaDto);
        if (errors.length > 0) {
            throw new common_1.ConflictException('Datos inválidos');
        }
        if (editManillaDto.foto_portador) {
            let dataD = editManillaDto.foto_portador;
            let extension = dataD.substring("data:".length, dataD.indexOf(";base64"));
            if (extension == 'application/pdf') {
                dataD = dataD.replace('data:application/pdf;base64,', '');
                extension = 'pdf';
            }
            else {
                dataD = dataD.replace(/^data:image\/\w+;base64,/, '');
                extension = 'png';
            }
            const resultado = await this.uploadBase64ToS3(manilla._id.toString(), dataD, 'foto_portador', extension);
            manilla.foto_portador = resultado;
            editManillaDto.foto_portador = resultado;
        }
        if (editManillaDto.licencia) {
            let dataD = editManillaDto.licencia;
            let extension = dataD.substring("data:".length, dataD.indexOf(";base64"));
            if (extension == 'application/pdf') {
                dataD = dataD.replace('data:application/pdf;base64,', '');
                extension = 'pdf';
            }
            else {
                dataD = dataD.replace(/^data:image\/\w+;base64,/, '');
                extension = 'png';
            }
            manilla.licencia = await this.uploadBase64ToS3(manilla._id.toString(), dataD, 'licencia', extension);
            editManillaDto.licencia = manilla.licencia;
        }
        if (editManillaDto.matricula_o_tarjeta) {
            let dataD = editManillaDto.matricula_o_tarjeta;
            let extension = dataD.substring("data:".length, dataD.indexOf(";base64"));
            if (extension == 'application/pdf') {
                dataD = dataD.replace('data:application/pdf;base64,', '');
                extension = 'pdf';
            }
            else {
                dataD = dataD.replace(/^data:image\/\w+;base64,/, '');
                extension = 'png';
            }
            manilla.matricula_o_tarjeta = await this.uploadBase64ToS3(manilla._id.toString(), dataD, 'matricula_o_tarjeta', extension);
            editManillaDto.matricula_o_tarjeta = manilla.matricula_o_tarjeta;
        }
        if (editManillaDto.factura) {
            let dataD = editManillaDto.factura;
            let extension = dataD.substring("data:".length, dataD.indexOf(";base64"));
            if (extension == 'application/pdf') {
                dataD = dataD.replace('data:application/pdf;base64,', '');
                extension = 'pdf';
            }
            else {
                dataD = dataD.replace(/^data:image\/\w+;base64,/, '');
                extension = 'png';
            }
            manilla.factura = await this.uploadBase64ToS3(manilla._id.toString(), dataD, 'factura', extension);
            editManillaDto.factura = manilla.factura;
        }
        if (editManillaDto.seguro) {
            let dataD = editManillaDto.seguro;
            let extension = dataD.substring("data:".length, dataD.indexOf(";base64"));
            if (extension == 'application/pdf') {
                dataD = dataD.replace('data:application/pdf;base64,', '');
                extension = 'pdf';
            }
            else {
                dataD = dataD.replace(/^data:image\/\w+;base64,/, '');
                extension = 'png';
            }
            manilla.seguro = await this.uploadBase64ToS3(manilla._id.toString(), dataD, 'seguro', extension);
            editManillaDto.seguro = manilla.seguro;
        }
        if (editManillaDto.tenencias) {
            let dataD = editManillaDto.tenencias;
            let extension = dataD.substring("data:".length, dataD.indexOf(";base64"));
            if (extension == 'application/pdf') {
                dataD = dataD.replace('data:application/pdf;base64,', '');
                extension = 'pdf';
            }
            else {
                dataD = dataD.replace(/^data:image\/\w+;base64,/, '');
                extension = 'png';
            }
            manilla.tenencias = await this.uploadBase64ToS3(manilla._id.toString(), dataD, 'tenencias', extension);
            editManillaDto.tenencias = manilla.tenencias;
        }
        Object.assign(manilla, editManillaDto);
        const manillaEditada = await this.manillaModel.findByIdAndUpdate(id, manilla, { new: true }).exec();
        return {
            message: 'informacion editada satisfactoriamente',
            manillaEditada
        };
    }
    async uploadBase64ToS3(id, base64Data, field, extension) {
        const buffer = Buffer.from(base64Data, 'base64');
        let content = '';
        if (extension == 'pdf') {
            content = 'application/pdf';
        }
        else {
            content = 'image/jpeg';
        }
        const uploadFolderPath = 'portador';
        const fileName = `portador/${id}/${field}`;
        const s3Params = {
            Bucket: this.configSerivce.s3.bucket,
            Key: fileName + '.' + extension,
            Body: buffer,
            ContentType: content
        };
        try {
            const uploadedObject = await this.s3.upload(s3Params).promise();
            const urlfoto = uploadedObject.Location;
            return urlfoto;
        }
        catch (error) {
            throw new Error(`Error al subir la imagen a S3: ${error.message}`);
        }
    }
    async findSolicitudes(params) {
        const [manillas, totalDocuments] = await Promise.all([
            this.manillaModel
                .find({ estado: manilla_entity_1.estadoManilla.Solicitada })
                .skip(params.offset)
                .limit(params.limit)
                .populate({ path: 'userId', select: 'name' })
                .exec(),
            this.manillaModel.countDocuments({ estado: manilla_entity_1.estadoManilla.Solicitada }).exec(),
        ]);
        return {
            manillas,
            totalDocuments,
        };
    }
    async findAceptadasHoy(params) {
        const horaInicio = new Date(new Date().setHours(0o0, 0o0, 0o0));
        const horaFin = new Date(new Date().setHours(23, 59, 59));
        const [manillas, totalDocuments] = await Promise.all([
            this.manillaModel
                .find({ estado: manilla_entity_1.estadoManilla.Aceptada, createdAt: { $gte: horaInicio, $lte: horaFin } })
                .skip(params.offset)
                .limit(params.limit)
                .populate({ path: 'userId', select: 'name' })
                .exec(),
            this.manillaModel.countDocuments({ estado: manilla_entity_1.estadoManilla.Aceptada, createdAt: { $gte: horaInicio, $lte: horaFin } }).exec(),
        ]);
        const [manillasResagadas, totalDocumentsResagadas] = await Promise.all([
            this.manillaModel
                .find({ estado: manilla_entity_1.estadoManilla.Aceptada, createdAt: { $lt: horaInicio } })
                .skip(params.offset)
                .limit(params.limit)
                .populate({ path: 'userId', select: 'name' })
                .exec(),
            this.manillaModel.countDocuments({ estado: manilla_entity_1.estadoManilla.Aceptada, createdAt: { $lt: horaInicio } }).exec(),
        ]);
        return {
            manillas,
            totalDocuments,
            manillasResagadas,
            totalDocumentsResagadas
        };
    }
    async findById(id) {
        try {
            const manilla = await this.manillaModel.findOne({ numid: id }).populate({ path: 'userId', select: 'name' });
            if (!manilla) {
                throw new common_1.NotFoundException('Pulsera no encontrada');
            }
            if (manilla.tipo === authentication_common_service_1.Tipos.Motero) {
                manilla.entradas = await this.entradaService.findByPlaca(manilla.placa);
            }
            return manilla;
        }
        catch (error) {
            throw new common_1.NotFoundException('Pulsera no encontrada' + error);
        }
    }
    async findAll(params) {
        const filters = {};
        const { limit, offset, estado, tipo } = params;
        if (params) {
            if (estado) {
                filters.estado = {
                    $regex: estado,
                    $options: "i",
                };
            }
            if (tipo) {
                filters.tipo = {
                    $regex: tipo,
                    $options: "i",
                };
            }
        }
        const [manillas, totalDocuments] = await Promise.all([
            this.manillaModel
                .find(filters)
                .skip(offset)
                .limit(limit)
                .populate({ path: 'userId', select: 'name' })
                .exec(),
            this.manillaModel.countDocuments(filters).exec(),
        ]);
        return {
            manillas,
            totalDocuments
        };
    }
    getEstados() {
        const estados = Object.keys(manilla_entity_1.estadoManilla).map((key) => ({
            name: key,
            value: manilla_entity_1.estadoManilla[key],
        }));
        return estados;
    }
    async aceptarManilla(id) {
        try {
            const exist = await this.manillaModel.findById(id).exec();
            if (!exist) {
                throw new common_1.NotFoundException('No existe la manilla');
            }
            const estado = exist.estado;
            if ([manilla_entity_1.estadoManilla.Aceptada, manilla_entity_1.estadoManilla.Entregada, manilla_entity_1.estadoManilla.Rechazada, manilla_entity_1.estadoManilla.Enviada].includes(estado)) {
                throw new common_1.ConflictException(`La manilla ya fue ${estado}`);
            }
            const idnum = exist.numid;
            const urlFront = this.configSerivce.frontend.url;
            const urlInfo = this.configSerivce.frontend.urlinfo;
            const url = `${urlFront}/${urlInfo}/${idnum}`;
            const qrData = url;
            const qrOptions = { type: 'svg', errorCorrectionLevel: 'high', scale: 8 };
            const qrCodeSvg = await qr.toString(qrData, qrOptions);
            const uploadFolderPath = 'uploads';
            const currentDate = new Date();
            const formattedDate = (0, date_fns_1.format)(currentDate, 'yyyy-MM-dd');
            const dailyFolderPath = `${uploadFolderPath}/${formattedDate}`;
            const fileName = `manilla_${id}.svg`;
            const s3Params = {
                Bucket: this.configSerivce.s3.bucket,
                Key: `${dailyFolderPath}/${fileName}`,
                Body: qrCodeSvg,
                ContentType: 'image/svg+xml',
            };
            const uploadedObject = await this.s3.upload(s3Params).promise();
            const urlqr = uploadedObject.Location;
            const imgPng = await this.svgToPng(qrCodeSvg);
            const params = {
                Bucket: this.configSerivce.s3.bucket,
                Key: `${dailyFolderPath}/${fileName}.png`,
                Body: imgPng,
                ContentType: 'image/png',
            };
            const uploadedObjectPng = await this.s3.upload(params).promise();
            const urlpng = uploadedObjectPng.Location;
            await exist.populate({ path: 'userId', select: 'name email' });
            const email = exist.userId.email;
            const name = exist.userId.name;
            await this.mailService.sendQrCodeEmail(email, urlpng, name);
            exist.estado = manilla_entity_1.estadoManilla.Aceptada;
            exist.qrCode = urlqr;
            const manilla = await exist.save();
            return {
                message: 'Manilla aceptada satisfactoriamente',
                manilla,
            };
        }
        catch (error) {
            throw new common_1.ConflictException('No se pudo aceptar la manilla: ' + error.message);
        }
    }
    async enviarManilla(id) {
        const exist = await this.manillaModel.findById(id).exec();
        if (!exist) {
            throw new common_1.NotFoundException('No existe la manilla');
        }
        const estado = exist.estado;
        if ([manilla_entity_1.estadoManilla.Entregada, manilla_entity_1.estadoManilla.Rechazada, manilla_entity_1.estadoManilla.Enviada].includes(estado)) {
            throw new common_1.ConflictException(`La manilla ya fue ${estado}`);
        }
        exist.estado = manilla_entity_1.estadoManilla.Enviada;
        const manilla = await exist.save();
        return {
            message: 'Manilla enviada satisfactoriamente',
            manilla,
        };
    }
    async cambiarEstadoManilla(id, estado) {
        if (![manilla_entity_1.estadoManilla.Entregada, manilla_entity_1.estadoManilla.Enviada, manilla_entity_1.estadoManilla.Rechazada].includes(estado)) {
            throw new common_1.ConflictException(`El estado ${estado} no es valido`);
        }
        const exist = await this.manillaModel.findById(id).exec();
        if (!exist) {
            throw new common_1.NotFoundException('No existe la manilla');
        }
        const estadoActual = exist.estado;
        if (estadoActual === estado) {
            throw new common_1.ConflictException(`La manilla ya fue ${estado}`);
        }
        exist.estado = estado;
        await exist.save();
        await exist.populate({ path: 'userId', select: 'name email' });
        const email = exist.userId.email;
        const name = exist.userId.name;
        if ([manilla_entity_1.estadoManilla.Enviada].includes(estado)) {
            await this.mailService.sendPulseraEnviada(email, name);
        }
        else if ([manilla_entity_1.estadoManilla.Entregada].includes(estado)) {
            await this.mailService.sendPulseraEntregada(email, name);
        }
        return {
            message: 'Estado de la pulsera cambiado satisfactoriamente',
            manilla: exist,
        };
    }
    async svgToPng(svgXml) {
        const width = 500;
        const height = 500;
        const pngBuffer = await sharp(Buffer.from(svgXml))
            .resize(width, height)
            .toFormat('png')
            .toBuffer();
        return pngBuffer;
    }
    async findLastNumId() {
        const lastManilla = await this.manillaModel.findOne().sort({ numid: -1 }).exec();
        if (!lastManilla) {
            return 0;
        }
        return lastManilla.numid;
    }
    async cambiarestadoVarias(ids, estado) {
        const manillas = [];
        const errores = [];
        for (const id of ids) {
            try {
                const manilla = await this.cambiarEstadoManilla(id, estado);
                manillas.push(manilla.manilla);
            }
            catch (error) {
                errores.push(`Error al enviar la Pulsera ${id}: ${error.message}`);
            }
        }
        return {
            manillas,
            errores,
        };
    }
    async aceptarVariasManillas(ids) {
        const aceptadas = [];
        const errores = [];
        for (const id of ids) {
            try {
                const manilla = await this.aceptarManilla(id);
                aceptadas.push(manilla.manilla);
            }
            catch (error) {
                errores.push(`Error al aceptar la Pulsera ${id}: ${error.message}`);
            }
        }
        return {
            aceptadas,
            errores,
        };
    }
    async aceptarTodasLasManillas() {
        const manillas = await this.manillaModel.find({ estado: manilla_entity_1.estadoManilla.Solicitada }).exec();
        if (!manillas) {
            throw new common_1.NotFoundException('No existen pulseras solicitadas');
        }
        const ids = manillas.map((manilla) => manilla._id.toString());
        const aceptadas = await this.aceptarVariasManillas(ids);
        return aceptadas;
    }
    async obtenerMisManillasAgrupadasPorTipo(userId, params) {
        try {
            const misManillas = await this.manillaModel.aggregate([
                { $match: { userId: userId } },
                { $group: { _id: '$tipo', manillas: { $push: '$$ROOT' }, } },
            ]);
            const totalDocuments = await this.manillaModel.countDocuments({ userId: userId }).exec();
            return {
                misManillas
            };
        }
        catch (error) {
            throw new common_1.ConflictException('Error al obtener las pulseras agrupadas por tipo' + error.message);
        }
    }
    async obtenerInfoMotoPorPlaca(placa, tallerid) {
        const manilla = await this.manillaModel.findOne({ placa: placa }).populate({ path: 'userId', select: 'name' });
        if (!manilla) {
            throw new common_1.NotFoundException('No existe ninguna pulsera asociada a la placa proporcionada');
        }
        const entradas = await this.entradaService.findByPlacaAndTaller(placa, tallerid);
        const infoRetorno = {
            placa: manilla.placa,
            marca: manilla.marca,
            cilindraje: manilla.cilindraje,
            conductor: manilla.userId.name,
            entradas: entradas,
        };
        return infoRetorno;
    }
    async crearEntradaManilla(placa, createEntradaManillaDto, userId) {
        const manilla = await (await this.manillaModel.findOne({ placa: placa }).populate({ path: 'userId', select: 'name' }));
        if (!manilla) {
            throw new common_1.NotFoundException('No existe ninguna pulsera asociada a la placa proporcionada');
        }
        const entrada = {
            taller: userId,
            observaciones: createEntradaManillaDto.observaciones,
            placa: placa,
            manilla: manilla._id
        };
        console.log('entrada', entrada);
        const entradaCreada = await this.entradaService.create(entrada);
        const entradas = await this.entradaService.findByPlacaAndTaller(placa, userId);
        const infoRetorno = {
            placa: manilla.placa,
            marca: manilla.marca,
            cilindraje: manilla.cilindraje,
            conductor: manilla.userId.name,
            entradas: entradas
        };
        return infoRetorno;
    }
    findOne(id) {
        return `This action returns a #${id} manilla`;
    }
    update(id, updateManillaDto) {
        return `This action updates a #${id} manilla`;
    }
    remove(id) {
        return `This action removes a #${id} manilla`;
    }
};
ManillasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.default.KEY)),
    __param(1, (0, mongoose_2.InjectModel)(manilla_entity_1.Manilla.name)),
    __metadata("design:paramtypes", [void 0, mongoose_1.Model,
        entradas_service_1.EntradasService,
        mail_service_1.MailService])
], ManillasService);
exports.ManillasService = ManillasService;
//# sourceMappingURL=manillas.service.js.map