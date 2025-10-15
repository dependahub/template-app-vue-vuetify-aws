import test from 'ava';
import {cognito} from '@trusquetta/aws-cognito';
import {utils as utilsSDK} from '@trusquetta/tq-service-utils-sdk';

const ENV = 'dev';
const profile = `tq-${ENV}`;
const REGION = 'ap-northeast-1';
const AUTH_TQAPPADEF0BDAE7_USERPOOLID = 'ap-northeast-1_4yJ5Ag4La';

cognito.configure({
	profile,
	userPoolId: AUTH_TQAPPADEF0BDAE7_USERPOOLID,
	region: REGION,
});
utilsSDK.configure({
	profile,
	functionName: `tq-service-utils-${ENV}`,
});

const sub = '67d41a48-a071-7029-4df8-8152ec49d236';
const username = 'dev@trusquetta.co.jp';

/**
 * Subでは UserNotFoundException になる。
 */
test('cognito:adminGetUser', async t => {
	const cognitoUser = await cognito.adminGetUser(username);
	t.is(cognitoUser.Username, username);
});

test('cognito:listUsers', async t => {
	const {Users} = await cognito.listUsers({
		Filter: `sub = "${sub}"`,
		Limit: 1,
	});
	const cognitoUser = Users[0];
	t.is(cognitoUser.Username, username);
});

test('screenshot', async t => {
	t.timeout(30_000);
	const {bucket, key} = await utilsSDK.screenshot('https://trusquetta.net/sample-lp/shinka/');
	t.log({bucket, key});
	t.pass();
});
