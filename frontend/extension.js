// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const dotenv = require('dotenv').config({ path: "C:\\Users\\ejtung\\Documents\\VSFriends\\frontend\\.env" });
const vscode = require('vscode');


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
let isLoggedIn;
let JSONWEBTOKEN;

function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	if (dotenv.error) {
		throw dotenv.error
	}
	console.log(dotenv.parsed)

	console.log('Congratulations, your extension "vsfriends" is now active!');
	isLoggedIn = false;
	JSONWEBTOKEN = null;
	JSONWEBTOKEN = context.globalState.get("JSON_WEB_TOKEN", null);

	if (JSONWEBTOKEN != null) {
		isLoggedIn = true;
	}
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let login = vscode.commands.registerCommand('vsfriends.login', () => {
		// The code you place here will be executed every time your command is executed
		if (isLoggedIn === false) {
			vscode.window.showInformationMessage("Redirecting to GitHub Authentication...");
			vscode.env.openExternal(vscode.Uri.parse(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`));
		}
		else {
			vscode.window.showWarningMessage('You are already logged in! To sign in again, please sign out first.');
		}
	});
	let logout = vscode.commands.registerCommand('vsfriends.logout', () => {
		// The code you place here will be executed every time your command is executed
		if (isLoggedIn === false) {
			vscode.window.showWarningMessage("You have not signed in yet! Please sign in before you can sign out.");
		}
		else {
			JSONWEBTOKEN = null;
			context.globalState.update("JSON_WEB_TOKEN", null);
			isLoggedIn = false;
			vscode.window.showInformationMessage("You have signed out. Thank you for using VSFriends.");
			//after this should come the instruction (function) to refresh the sidebar webview so that VSCode retrieves the information. For Issue #5.
		}

	});

	let authUri = vscode.window.registerUriHandler({
		handleUri(uri) {
			if (uri.path === "/auth") {
				vscode.window.showInformationMessage(`Authentication Succeeded. Your JSON Web Token is: ${uri.query}`);
				JSONWEBTOKEN = uri.query;
				context.globalState.update("JSON_WEB_TOKEN", JSONWEBTOKEN);
				//after this should come the instruction (function) to refresh the sidebar webview so that VSCode retrieves the information. For Issue #5.
			}
			else {
				vscode.window.showInformationMessage("Invalid URI for VSFriends. Did you perhaps mistype something?")
			}
		}
	});
	
	let friendsBar = vscode.window.registerWebviewViewProvider("vsfriends.friends", {
		resolveWebviewView(webviewView, context, token) {

		}
	})


	context.subscriptions.push(login);
	context.subscriptions.push(logout);
	context.subscriptions.push(authUri);
	context.subscriptions.push(friendsBar);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
	console.log("deactivating");
}

module.exports = {
	activate,
	deactivate
}