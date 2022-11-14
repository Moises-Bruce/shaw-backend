import Fastify from "fastify";
import cors from "@fastify/cors"
import { routes } from "./routes";

async function bootstrap() {
    const fastify = Fastify({
        logger: true
    });

    await fastify.register(cors, {
        origin: true
    })

    await fastify.register(routes);

    await fastify.listen({
        port: 3333
    });
}

bootstrap();
