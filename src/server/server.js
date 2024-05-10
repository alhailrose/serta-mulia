import Hapi from "@hapi/hapi";
import { routes } from "./routes.js";
import dotenv from "dotenv";
import { loadModel } from "../services/loadModel.js";
import InputError from "../exceptions/InputError.js";

dotenv.config();

(async () => {
    const server = Hapi.server({
        port: 3000,
        host: "0.0.0.0",
        routes: {
            cors: {
                origin: ["*"],
            },
        },
    });

    const model = await loadModel();
    server.app.model = model;
    server.route(routes);

    server.ext("onPreResponse", (request, h) => {
        const response = request.response;
        if (response instanceof InputError) {
            const newResponse = h.response({
                status: "fail",
                message: `${response.message} Silahkan gunakan foto lain`,
            });
            newResponse.code(response.statusCode);
            return newResponse;
        }
        if (response.isBoom) {
            const newResponse = h.response({
                status: "fail",
                message: response.message,
            });
            newResponse.code(response.statusCode);
            return newResponse;
        }

        return h.continue;
    });

    await server.start();
    console.log("Server running on %s", server.info.uri);
})();
