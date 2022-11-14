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

    const port = process.env.PORT || 3333
    const host = process.env.HOST || '127.0.0.1'

    await fastify.listen({
        host,
        port: Number(port)
    });
}

bootstrap();
