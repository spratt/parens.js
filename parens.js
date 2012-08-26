/******************************************************************************
* parens.js                                                                   *
* by Simon David Pratt                                                        *
*                                                                             *
* Lexes and parses a lisp-like tree, returning the equivalent JSON.           *
******************************************************************************/
var parens = parens || {};

parens.lex = function(tree_str) {
	var token_list = [];
	var running_str = '';
	var in_comment = false;
	for(var i in tree_str) {
		// skip anything within a comment
		if(in_comment) {
			if(tree_str[i] == '\n') {
				in_comment = false;
			}
			continue;
		}
		// parse non-comments normally
		switch(tree_str[i]) {
		case ';': // start comment
			in_comment = true;
			break;
		case '(': // nested
		case ')':
			if(running_str != '')
				token_list.push(running_str);
			running_str = '';
			token_list.push(tree_str[i]);
			break;
		case '\n': // whitespace
		case '\t':
		case ' ':
			if(running_str != '')
				token_list.push(running_str);
			running_str = '';
			break;
		default: // string
			running_str += tree_str[i];
			break;
		}
	}
	return token_list;
};