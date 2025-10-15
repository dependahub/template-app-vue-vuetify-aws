
/**
 * [確認用] エラーを返します
 */
export async function error403() {
	const error = new Error('権限がありません');
	error.name = 'ForbiddenError';
	error.statusCode = 403;
	throw error;
}
