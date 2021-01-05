# VSFriends
**A VS Code extension for adding friends and seeing what they're up to.**

## Installation
Currently, **VSFriends is not available for installation in the Visual Studio Marketplace**. However, stay tuned for when we do publish this extension!

## Usage
1. Install VSFriends, and a sidebar icon should show up.
2. Clicking on the sidebar will reveal a list of friend requests and friends, if you are signed in. If you are not signed in, please sign in first.
3. Authentication requires that you have a GitHub Account. To sign in, please open the Command Pallete (Ctrl/CMD + Shift + P) and search for the command `VSFriends: Sign In with GitHub`.
4. You will be redirected to GitHub OAuth, which will then redirect you to our backend server, which then redirects back to VSCode, but with a JSON Web Token.
5. Upon re-opening VSCode, the VSFriends sidebar should now display a list of your friend requests and friends.
6. If you wish to sign out, please open the Command Pallete (Ctrl/CMD + Shift + P) and search for the command `VSFriends: Sign Out`.
7. The VSFriends sidebar will now reload, and you will return to an un-authenticated state.

## Questions/Suggestions
Please ask any questions or provide any suggestions you have by creating a new issue in the Issues tab!
