# Welcome To The ReVOLT Website GitHub

In this repository, you will find two primary folders, the "backend" and "frontend". You will only be permitted to work on the assigned folder. Towards the bottom of the page, there will be an "Updates" section where new information about the repositoy and its operations will be outlined (This helps to keep the history of the repository visible at all times).

## Frontend And Backend

Everything is hosted on **Vercel** as one project (no Render). `vercel.json` at the repo root defines two [Vercel Services](https://vercel.com/docs/services) (in beta) that deploy together:

- **frontend/**: the Next.js (TypeScript) site. All public content lives in `src/app/(public-access)`; text and lists live in `src/content`.
- **backend/**: a small Flask app (`backend/app.py`) that handles member login (`/api/login`, `/api/check`, `/api/logout`) and the contact form (`/api/contact`).

Every request to `/api/*` goes to Flask; everything else goes to Next.js. Because they share one domain, there is no CORS setup and the frontend calls relative `/api/...` URLs.

The member portal (`/revolt-team/*`) is protected on the server by `frontend/src/middleware.ts`, which checks the login cookie before any page is served.

### Environment variables

Set these in the Vercel project settings (Production and Preview). For local development, put them in `backend/.env` and `frontend/.env.local` (both are gitignored).

| Variable | Used by | Purpose |
| --- | --- | --- |
| `JWT_SECRET` | backend + frontend | Signs and verifies member logins. At least 32 random characters, e.g. `openssl rand -hex 32`. |
| `TEAM_USERNAME`, `TEAM_PASSWORD` | backend | The shared member-portal login. |
| `SMTP_HOST`, `SMTP_PORT` | backend | Mail server, e.g. `smtp.gmail.com` and `465`. |
| `EMAIL_USER`, `EMAIL_PASS` | backend | Mailbox the contact form sends from (for Gmail, use an app password). |
| `CONTACT_TO` | backend | Optional: where contact messages go. Defaults to `EMAIL_USER`. |

## How To Run Locally

Option 1, with the Vercel CLI (runs both services exactly like production):

```bash
vercel dev
```

Option 2, two terminals:

```bash
# Terminal 1: backend (http://127.0.0.1:5328)
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python app.py

# Terminal 2: frontend (http://localhost:3000)
cd frontend
npm install
npm run dev
```

In development the Next.js server forwards `/api/*` to Flask on port 5328. To use the member portal locally, set `JWT_SECRET` in both `.env` files and log in with your local `TEAM_USERNAME` / `TEAM_PASSWORD`.

## Working On GitHub

### General Work Procedure

In this GitHub repo, you will find that there are a total of 5 branches present:

- main
- staging

The "main" branch will be responsible for hosting the offical site. This branch will only be worked on when a new update to the site is to be added after proper inspection from the team. The "staging" branch on the other hand is where the team will play around with there code and test the feature to see if they are able to work as intneded. While working with the "staging" branch, uers will be required to create their own branch to work on before merging their contnent onto the "staging" branch. The naming convention for the person branches is shown below.

- (name)-(feature worked on) with "PubAcc" (Public Access) or "PrivAcc" (Private Access) at the end.

These branches can be developed by individual members where once the feauture is complete, the branch can be deleted after merging with the "staging" branch.

### GitHub Commands

While using GitHub, it is best practice to use the git commnds as the built-in VSCode commands will only suffice for simiple commits. Here are som of the following commnds you should become familiar with while working on the repo:

```bash
# 1.
git branch -a

# 2.
git checkout (branch)

# 3.
git pull origin main

# 4.
git pull

# 5.
git stash push -m "(message)"

# 6.
git stash list

# 7.
git stash pop

# 8.
git stash pop stash@(n)
```

1. This command is helpful when needing to check all of the branches that are available in the repository, which includes both local and remote branches. This is best run after the user pulls all of the content from the branch first to recieve all of the latest content.

2. This command is useful when needing to switch bewteen different branches. When running the command, the branches are switched based on the local branches, however this will be mathced with the remote branches.

3. This command is useful when needing to update all of the content of the branch from the content present on main (getting all of the latest content being hosted on the site).

4. This command is used when retrieving the latest content from the current branch a user is on, ensuring that no conflicts occur when updating the files on the repo (should always be run when switching to the branch).

5. This command is useful for when a user is making some chnages to code but under the wrong branch. Running the command will allow the user to stash the changes seperately, allowing them to switch to the proper branch.

6. This command is used when a user needs to check what chnages are stashed should a user have made multiple stashes and is unaware of which changes need to be commited.

7. This command is used along side with command #5, where the user is able to bring back the stashed changes once under the correct branch and commit the changes accordingly.

8. This command is similar to command #7 where the user can commit a specifc stash from the chnages they have made, where the value of (n) is the index value of the stash list, which is run usinging command #6.

## -----------------

```bash
# 1.
git add (file or .)

# 2.
git commit -m "(message)"

# 3.
git push
```

1. This command is used when needing to commit a file onto the repo. This command will select certain files to be added in to the repo

2. This comamnd is simply to set up the message for the commit so other users on the repo are aware of what type of commit is being added onto the branch (this will also set up the need for a pull request).

3. This command will push the commit being made onto the repo, which is then later review when needing to merge the content onto the development branch.

NOTE: The admin will be responsible for merging the content from the development branch onto the main branch.

## ---------------

## Updates

(No new updates)
