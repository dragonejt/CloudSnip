// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const dotenv = require('dotenv').config({ path: "C:\\Users\\ejtung\\Documents\\VSFriends\\frontend\\.env" });
const vscode = require('vscode');


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	if (dotenv.error) {
		throw dotenv.error
	  }
	console.log(dotenv.parsed)
	
	console.log('Congratulations, your extension "vsfriends" is now active!');
	let isLoggedIn = false;
	let JSONWEBTOKEN = null;


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
			isLoggedIn = false;
			vscode.window.showInformationMessage("You have signed out. Thank you for using VSFriends.");
		}

	});
	

	context.subscriptions.push(login);
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


export class AuthViewProvider {

	viewType = 'vsfriends.profile';

	_view;

	_extensionUri;

	constructor(_extensionUri) {
		this._extensionUri = _extensionUri;
	 }

	resolveWebviewView(webviewView) {
		this._view = webviewView;
		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,

			localResourceRoots: [
				this._extensionUri
			]
		};

		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

	}
	 _getHtmlForWebview(webview) {
		
		return `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>VSFriends</title>
		</head>
		<body>
			<button style="color: blue">Login with GitHub</button>
		</body>
		</html>`;
		  }
}
