import process from 'node:process';
import fs from 'node:fs/promises';

const __dirname = new URL('.', import.meta.url).pathname;
const [_nodePath, _filePath, json] = process.argv;

console.log(json);

const Outputs = JSON.parse(json);
// eslint-disable-next-line unicorn/no-array-reduce
const outputMap = Outputs.reduce((accumulator, {OutputKey, OutputValue}) => {
	accumulator[OutputKey] = OutputValue;
	return accumulator;
}, {});

const {
	Region,
	UserPoolId,
	UserPoolClientId,
	IdentityPoolId,
	S3Bucket,
	ApiEndpoint: _ApiEndpoint,
} = outputMap;
// const env = ApiEndpoint.split('/').pop();

// カスタムドメイン対応
let ApiEndpoint = _ApiEndpoint;
if (ApiEndpoint.includes('wed8rftj85')) {
	ApiEndpoint = 'https://aflac.api.trusquetta.com';
}

const amplifyconfigurationJson = `
{
  "aws_project_region": "${Region}",
  "aws_cloud_logic_custom": [
    {
      "name": "TqApiAdRestApi",
      "endpoint": "${ApiEndpoint}",
      "region": "${Region}"
    },
		{
      "name": "UnauthApi",
      "endpoint": "${ApiEndpoint}/unauth",
      "region": "${Region}"
    },
		{
      "name": "AuthApi",
      "endpoint": "${ApiEndpoint}/auth",
      "region": "${Region}"
    },
		{
      "name": "UnauthApiV2",
      "endpoint": "${ApiEndpoint}/v2/unauth",
      "region": "${Region}"
    },
		{
      "name": "AuthApiV2",
      "endpoint": "${ApiEndpoint}/v2/auth",
      "region": "${Region}"
    }
  ],
  "aws_cognito_identity_pool_id": "${IdentityPoolId}",
  "aws_cognito_region": "${Region}",
  "aws_user_pools_id": "${UserPoolId}",
  "aws_user_pools_web_client_id": "${UserPoolClientId}",
  "aws_cognito_username_attributes": [],
  "aws_cognito_social_providers": [],
  "aws_cognito_signup_attributes": [],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": [],
  "aws_cognito_password_protection_settings": {
    "passwordPolicyMinLength": 6,
    "passwordPolicyCharacters": []
  },
  "aws_cognito_verification_mechanisms": [
    "EMAIL"
  ],
  "aws_user_files_s3_bucket": "${S3Bucket}",
  "aws_user_files_s3_bucket_region": "${Region}"
}
`.trim();

await fs.mkdir(`${__dirname}../src`, {recursive: true});
await fs.writeFile(`${__dirname}../src/amplifyconfiguration.json`, amplifyconfigurationJson);

console.info('✅ Build Successflly: src/amplifyconfiguration.json');
console.info(amplifyconfigurationJson);
