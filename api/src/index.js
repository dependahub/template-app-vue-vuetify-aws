import {cognito} from '@trusquetta/aws-cognito';
import {bodyParser, getAction, getAuth} from './middlewares/index.js';
import {env} from './config.js';

cognito.configure({
  region: env.REGION,
  userPoolId: env.USERPOOLID,
});

/**
 * @type {import('aws-lambda').APIGatewayProxyHandler}
 */
export async function handler(event) {
	const {httpMethod, path, requestContext} = event;

	/** @type {import('aws-lambda').APIGatewayProxyResultV2} */
	const response = {
		headers: {
			'Access-Control-Allow-Credentials': false,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
			'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
		},
		statusCode: 200,
		body: null,
	};

	// Preflight Request -> ALL OK
	if (httpMethod === 'OPTIONS') {
		return response;
	}

	let auth = null;

	try {
		auth = await getAuth(event);
		const action = await getAction(event);
		const payload = bodyParser(event);
		const result = await action(payload, auth);
		response.body = JSON.stringify(result);
	} catch (error) {
		console.error(error);
		response.statusCode = error.statusCode || 500;
		response.body = JSON.stringify({
			name: error.name || 'UnhandledError',
			message: error.message,
		});
	}

	// Logging
	console.info({
		LogType: 'ACCESS_LOG',
		statusCode: response.statusCode,
		method: httpMethod,
		path,
		ip: requestContext.identity.sourceIp,
		userAgent: requestContext.identity.userAgent,
		userId: auth?.id || null,
		companyId: auth?.companyId || null,
		contractId: auth?.contractId || null,
	});

	return response;
}
