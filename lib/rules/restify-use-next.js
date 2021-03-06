'use strict';
// We are searching for `next()` and here is the string constant
const NEXT = 'next';

// This is invoked by eslint and passes the eslint `context`
module.exports = function(context) {
    // Common error message shown by eslint
    const errMsg = [`${NEXT}() is not being called in the handler`];

    /**
     * This function checks if the current AST node is a valid sinatra style
     * handler function
     * @param {Object} node is the AST node
     * @returns {boolean}
     */
    function isHandlerFunction(node) {
        // All restify chain handlers are supposed to be like
        // (paramA, paramB, next) or (req, res, next)
        if (node && node.params && node.params.length === 3) {
            //eslint-disable-next-line no-unused-vars
            const [req, res, next] = node.params;
            // ignore req and res params, just focus on
            // next paramater
            return next.name === NEXT;
        } else {
            // it does not match the style
            return false;
        }
    }

    /**
     * This function checks if the current node is a return statement
     * and looks for any call for next() inside it. Returns true if we find a
     * valid call expression
     * @param {Object} node is the AST node
     * @returns {boolean}
     */
    function handleReturnStmt(node) {
        let found = false;
        if (node.type === 'ReturnStatement' && node.argument) {
            found = handleGenericFnCallExpression(node.argument, NEXT);
            if (!found) {
                found =
                    node.argument.callee && node.argument.callee.name === NEXT;
            }
        }
        return found;
    }

    /**
     * This function checks if the current node is `next()` statement
     * Returns true if we find a
     * valid `next()` expression
     * @param {Object} node is the AST node
     * @returns {boolean}
     */
    function handleNextCallExpression(node) {
        if (
            node.type === 'ExpressionStatement' &&
            node.expression &&
            node.expression.type === 'CallExpression'
        ) {
            const nextIdentifier = node.expression.callee;
            return nextIdentifier && nextIdentifier.name === NEXT;
        }
        return false;
    }

    /**
     * This function checks if the current node is a generalized function
     * statement which is an execution call and looks for any call for next() inside it.
     * Returns true if we find a valid call expression
     * @param {Object} node is the AST node
     * @returns {boolean}
     */
    function handleGenericFnCallExpression(node) {
        let found = false;
        if (node.type === 'CallExpression') {
            const listOfArguments = node.arguments;
            for (let i = 0; i < listOfArguments.length; i++) {
                const argumentNode = listOfArguments[i];
                if (
                    argumentNode.type === 'Identifier' &&
                    argumentNode.name === NEXT
                ) {
                    found = true;
                    break;
                } else if (
                    argumentNode.body &&
                    argumentNode.body.type === 'BlockStatement'
                ) {
                    found = handleBlockStatements(argumentNode.body);
                }
            }
        }
        return found;
    }

    /**
     * This function checks if the current node is an expression statement
     * and has an execution call expression and looks for any call for next()
     * inside it.
     * Returns true if we find a valid call expression
     * @param {Object} node is the AST node
     * @returns {boolean}
     */
    function handleFnCallExpression(node) {
        let found = false;
        if (
            node.type === 'ExpressionStatement' &&
            node.expression &&
            node.expression.type === 'CallExpression'
        ) {
            found = handleGenericFnCallExpression(node.expression, NEXT);
        }
        return found;
    }

    /**
     * This function checks if the current node is an IF Statement
     * and looks for any call for next() inside it.
     * Returns true if we find a valid call expression
     * @param {Object} node is the AST node
     * @returns {boolean}
     */
    function handleIfStatement(node) {
        let found = false;
        // is this an ifStatement?
        if (node.type === 'IfStatement') {
            let foundInConsequent = handleBlockStatements(node.consequent);
            if (node.alternate) {
                let foundInAlternate = handleBlockStatements(node.alternate);
                if (foundInConsequent && !foundInAlternate) {
                    errMsg.push(
                        `next() is not being called in the alternate block`
                    );
                } else if (!foundInConsequent && foundInAlternate) {
                    errMsg.push(
                        `next() is not being called in the consequent block`
                    );
                } else if (foundInConsequent && foundInAlternate) {
                    found = true;
                }
            } else {
                found = foundInConsequent;
            }
        }
        return found;
    }

    /**
     * This function handles a block of statements
     * looks for any call for next() inside it.
     * Returns true if we find a valid call expression
     * @param {Object} node is the AST node
     * @returns {boolean}
     */
    function handleBlockStatements(node) {
        let found = false;
        const bodyLines = node.body;
        bodyLines.forEach((lineItem) => {
            found = handleNextCallExpression(lineItem);
            if (!found) {
                found = handleFnCallExpression(lineItem);
            }
            if (!found) {
                found = handleIfStatement(lineItem);
            }
            if (!found) {
                found = handleReturnStmt(lineItem);
            }
        });
        return found;
    }

    /**
     * This function checks if the current node is a function declaration
     * looks for any call for next() inside it.
     * Reports if we found any `next()` call or not
     * @param {Object} node is the AST node
     * @returns {void}
     */
    function handleFunctionDeclaration(node) {
        if (isHandlerFunction(node)) {
            let found = false;
            const fnBlock = node.body;
            found = handleBlockStatements(fnBlock);

            if (!found) {
                context.report({
                    node,
                    message: errMsg.join(',')
                });
            }
        }
    }

    /**
     * This function checks if the current node is a Return statement
     * that returns a restify handler function and then
     * looks for any call for next() inside it.
     * Reports if we found any `next()` call or not
     * @param {Object} node is the AST node
     * @returns {void}
     */
    function handleReturnStatement(node) {
        if (node.argument && node.argument.type === 'FunctionExpression') {
            const fnNode = node.argument;
            if (isHandlerFunction(fnNode)) {
                let found = false;
                const fnBlock = fnNode.body;
                found = handleBlockStatements(fnBlock);

                if (!found) {
                    context.report({
                        node,
                        message: errMsg.join(',')
                    });
                }
            }
        }
    }

    // This return statement informs eslint that
    // anytime it encounters a function declaration, it should call the
    // mapping functions.
    // We rely on `FunctionDeclaration` and `ArrowFunctionExpression` events.
    return {
        // Rule methods - AST Node Type
        FunctionDeclaration: handleFunctionDeclaration,
        ArrowFunctionExpression: handleFunctionDeclaration,
        ReturnStatement: handleReturnStatement
    };
};
module.exports.scheme = [];
