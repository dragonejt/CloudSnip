// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	const authProvider = new AuthViewProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider("vsfriends.profile", authProvider));

	vscode.window.registerUriHandler({
		handleUri(uri) {
			vscode.window.showInformationMessage(uri.path + uri.query);
		}
	})

	vscode.window.showInformationMessage("Hello");

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vsfriends.helloWorld', function () {
		// The code you place here will be executed every time your command is executed
		vscode.window.showInformationMessage(context.extensionUri.toString());
		vscode.window.showInformationMessage("Hello");
		// Display a message box to the user
		
	});
	

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
	vscode.window.showInformationMessage("Hello");
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
