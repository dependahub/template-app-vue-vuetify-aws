/**
 * @param {import('aws-lambda').APIGatewayProxyEvent} event
 * @returns {any}
 */
export function bodyParser(event) {
	const {body} = event;
	try {
		return JSON.parse(body);
	} catch {
		return body;
	}
}
