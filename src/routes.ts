import { FastifyInstance } from "fastify";
import { z } from "zod";

import { github } from "./lib/api";

interface UserQueryParamsRequest {
    since?: string
}

interface IUser {
    login: string
    id: number
    avatar_url: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    repos_url: string
}

export async function routes(fastify: FastifyInstance) {
    fastify.get('/users', async (request, reply) => {
        const { since } = request.query as UserQueryParamsRequest

        let urlToRequest = '/users';

        if(since) {
            if(isNaN(Number(since))) {
                return reply.status(400).send({
                    message: 'Since should be a number'
                });
            }

            urlToRequest += `?since=${since}`;
        }

        const response = await github.get(urlToRequest);
        const users: IUser[] = response.data;

        const nextPage = request.hostname + `/users?since=${users[users.length - 1].id}`;

        return { users, nextPage }
    })

    fastify.get('/users/:username/details', async (request, reply) => {
        const userParams = z.object({
            username: z.string()
        });

        const { username } = userParams.parse(request.params);

        const response = await github.get(`/users/${username}`)
        const user = response.data

        return { user }
    })

    fastify.get('/users/:username/repos', async (request, reply) => {
        const userParams = z.object({
            username: z.string()
        });

        const { username } = userParams.parse(request.params);

        const response = await github.get(`/users/${username}/repos`)
        const repos = response.data

        return { repos }
    })
}
