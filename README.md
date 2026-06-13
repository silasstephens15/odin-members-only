This project follows the Odin Project's Member's Only project.
It is a simple Express web page to demonstrate capability to use authentication of users.
Passport-local is used for authentication, and postgresql for the database.
Anyone that creates an account can add messages to the message board, but you must be a full member to view certain pieces of information such as a message's author. The member password is just 123. There are also admin users that can delete accounts.

If you want to run this code yourself, you must include the following env variables:
PORT=#your local database
USER=#postgresql user
DATABASE=#name of database
PASSWORD=#postgresql password
DEV=#boolean
CONNECTION_STRING=#if DEV is false this will be used instead of local database
MEMBER_PASSWORD=#set to anything you please
ADMIN_PASSWORD=#set to anything you please
SECRET=#for express sessions
