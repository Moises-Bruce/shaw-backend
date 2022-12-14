import Fastify from "fastify";
import cors from "@fastify/cors"
import { routes } from "./routes";

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
        trustProxy: true
    });

    await fastify.register(cors, {
        origin: true
    })

    await fastify.register(routes);

    const port = process.env.PORT || 3333

    await fastify.listen({
        port: Number(port),
        host: '0.0.0.0'
    });
}

bootstrap();
