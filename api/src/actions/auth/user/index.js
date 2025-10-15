
/**
 * ユーザー情報
 * @param {null} _ - 未使用
 * @param {Auth} auth - 認証情報
 * @returns {Auth} 認証情報
 */
export async function user(_, auth) {
	return auth;
}
