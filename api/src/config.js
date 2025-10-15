import process from 'node:process';

const {
	ENV = 'dev',
	REGION = 'ap-northeast-3',
	USERPOOLID,
	USERBUCKET,
} = process.env;

export const env = {
	ENV,
	REGION,
	USERPOOLID,
	USERBUCKET,
};
