"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEntradaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_entrada_dto_1 = require("./create-entrada.dto");
class UpdateEntradaDto extends (0, mapped_types_1.PartialType)(create_entrada_dto_1.CreateEntradaDto) {
}
exports.UpdateEntradaDto = UpdateEntradaDto;
//# sourceMappingURL=update-entrada.dto.js.map