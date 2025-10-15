import {cognito} from '@trusquetta/aws-cognito';

/**
 * @param {import('aws-lambda').APIGatewayEvent} event
 * @returns {Promise<Auth|null>}
 */
export async function getAuth(event) {
	const {path, requestContext} = event;

	/** @type {'auth' | 'unauth'} */
	const authority = path.split('/').find(Boolean);
	if (authority !== 'auth') {
		return null;
	}

	const {
		cognitoIdentityId: identityId,
		cognitoAuthenticationProvider,
	} = requestContext.identity;
	if (!cognitoAuthenticationProvider) {
		const error = new Error('Unauthorized');
		error.statusCode = 401;
		throw error;
	}

	const sub = cognitoAuthenticationProvider.split(':')[2];
	const cognitoUser = await (async () => {
		const {Users} = await cognito.listUsers({
			Filter: `sub = "${sub}"`,
			Limit: 1,
		});
		return Users[0];
	})();
	if (!cognitoUser) {
		const error = new Error('Unauthorized');
		error.statusCode = 401;
		throw error;
	}

	const {
		Username: username,
		Attributes = [],
	} = cognitoUser;
	const email = Attributes.find(({Name}) => Name === 'email')?.Value || null;
	const name = Attributes.find(({Name}) => Name === 'name')?.Value || null;

	return {
		sub,
		identityId,
		username,
		name,
		email,
	};
}
