export const env = {
	apiKey: (import.meta.env.VITE_APIKEY as string) || '',
	uri: (import.meta.env.VITE_URI as string) || 'http://localhost:3000/',
	production: import.meta.env.PROD
};
