"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.prisma = void 0;
const client_1 = require("@prisma/client");
// Prisma kliens inicializálása
exports.prisma = new client_1.PrismaClient();
// Felhasználó modell elérése
exports.User = exports.prisma.user;
