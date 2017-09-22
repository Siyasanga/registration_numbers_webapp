# registration_numbers_webapp
Registration_numbers_webapp is used to store registration numbers from Cape Town, Paarl and Eastern Cape. 
## How to use the app
 * Enter registration number in the text
 * Press submit
 * Then the page refresh with the new number plate appended to the bottom of the list
 *Validation of the registration number*
 * If registration is not entered and submit is pressed, an error message will be flashed to the user
 * If the the registration number being entered already exists, a flash message will be displayed to the user
 * If the registration number is successfully saved, a success message will be displayed to the user as feedback

## *Known bugs*
 * Currently the app does not stop the user from entering registration numbers that we cannot filter for
 * Feel free to add this feature to the app.

## Installation
 ### *System software requirements*
 * Make sure you have:
    - At least node v4.2.6 installed and npm on your machine, if not you can install it using this link https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
    - MongoDB installed, if not 
 * Make a copy of the app by forking it to your repository
 * Now clone your own copy of registration_numbers_webapp repository to your local machine
 * On the termminal, change into the root folder registration_numbers_webapp then run 'npm install'. This will install all package dependencies that the app uses
 * Still on the root folder, create a file called .gitignore, open it add `node_modules/`
