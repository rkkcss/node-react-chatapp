"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express4_1 = require("@apollo/server/express4");
const express_session_1 = __importDefault(require("express-session"));
const index_1 = __importDefault(require("./resolvers/index"));
const typeDefs_1 = __importDefault(require("./typeDefs"));
const server_1 = require("@apollo/server");
const app = (0, express_1.default)();
const cookieParser = require('cookie-parser');
const httpServer = http_1.default.createServer(app);
const server = new server_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: index_1.default,
    plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })]
});
app.use(cookieParser());
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield server.start();
        app.use("/graphql", (0, cors_1.default)({
            origin: "http://localhost:5173",
            credentials: true
        }), express_1.default.json(), (0, express4_1.expressMiddleware)(server, {
            context: (_a) => __awaiter(this, [_a], void 0, function* ({ req, res }) {
                return { req, res };
            }),
        }));
        httpServer.listen(4000, () => {
            console.log("Server running at http://localhost:4000/graphql");
        });
        app.use((0, express_session_1.default)({
            secret: "your-secret-key", // Titkos kulcs a session titkosításához
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            },
        }));
    });
}
startServer();
