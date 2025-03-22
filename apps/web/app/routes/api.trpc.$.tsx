import type { LoaderFunctionArgs } from '@remix-run/node';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter, createContext } from 'api';

export const loader = async ({ request }: LoaderFunctionArgs) => {
	return fetchRequestHandler({
		endpoint: '/api/trpc',
		req: request,
		router: appRouter,
		createContext,
	});
};

export const action = async ({ request }: LoaderFunctionArgs) => {
	return fetchRequestHandler({
		endpoint: '/api/trpc',
		req: request,
		router: appRouter,
		createContext,
	});
};
