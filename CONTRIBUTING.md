# Development Tricks

## Automatic Login

Automatic login URLs include a generated `url_auth_token` query parameter. To avoid needing to send actual emails, the following shortcuts can be used.

### Confirm

http://localhost:8000/go/login?url_auth_token=test

### Unsubscribe

http://localhost:8000/go/login?url_auth_token=test&unsubscribe=true

## Logout

http://localhost:8000/logout
