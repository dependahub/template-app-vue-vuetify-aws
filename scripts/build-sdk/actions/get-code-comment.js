import {parseModule} from 'esprima-next';

/**
 * 元コードから関数宣言上部のコメントを抽出
 * @param {string} code - 元コード
 * @returns {string} comment
 */
export function getCodeComment(code) {
	let comment = '';
	const ast = parseModule(code, {
		range: true,
		comment: true,
	});

	if (ast.comments && ast.comments.length > 0) {
		const functionNode = ast.body.find(node =>
			node.type === 'ExportNamedDeclaration'
		&& node.declaration
		&& node.declaration.type === 'FunctionDeclaration');
		const functionStart = functionNode.range[0];
		// 直前のコメントを探す
		const precedingComments = ast.comments.filter(c => c.range[1] <= functionStart);
		if (precedingComments.length > 0) {
			const lastComment = precedingComments.at(-1);
			comment = code.slice(lastComment.range[0], lastComment.range[1]) + '\n';
			// authパラメーターを削除
			comment = comment.replace(' * @param {Auth} auth\n', '');
			// 最後の改行を削除
			comment = comment.trimEnd();
		}
	}

	return comment;
}
