Usage: Copy credentials.json.example into credentials.json and put your client id and client secret there and push it to github via the web interface.

I know, I know, how can you be checking credentials into the repo?!

First the reason, then why it doesn't matter.
The reason:
1. This project is intended to be hosted in github pages to simplifiy deployment.
2. Some users of this have simple github enterprise setups that don't support github actions (and secure secrets) so just need to simple github branch

Why it doesn't matter, a ton:
1. These are used in the client and are accessible to anyone anyway.
2. This uses 3 legged oauth so the user has to login and go through the 3 legged flow.
3. That being said we can rotate regularly anyway in case folks leak them and apps try to impersonate this app.
