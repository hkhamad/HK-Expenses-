# Money Tracker (Android app)

Your own money app: daily expenses, income, loans, and dollar trading.
This project builds the APK **in the cloud on GitHub**. You do not need Android Studio.

## First time (about 10 minutes)

1. Create a new GitHub repository. Make it **Private**.
2. Upload ALL files from this folder to it.
   - Make sure the hidden folder `.github/workflows/build-apk.yml` is uploaded too.
   - If it is missing: GitHub > Add file > Create new file, type the name
     `.github/workflows/build-apk.yml` and paste the file content.
3. Open the **Actions** tab. The build "Build Android APK" starts by itself.
   (If not: click it, then **Run workflow**.) It takes about 8 to 12 minutes.
4. When it shows a green tick, open the **Releases** page (right side of the repo).
   Download **MoneyTracker.apk** to your phone.
5. Open the APK on your phone. If Android asks, allow "Install unknown apps" for your browser.

Using the command line instead:

```
git init
git add .
git commit -m "Money Tracker"
git branch -M main
git remote add origin https://github.com/YOUR-NAME/YOUR-REPO.git
git push -u origin main
```

## Updating the app later

Change `www/index.html` and commit. A new build starts and a new APK appears in Releases.
Install it over the old app. Your data stays, because every build is signed with the same
key (`keystore/debug.keystore`).

Keep the repository **private**. That key is only meant for your own personal app.

## Fingerprint

Open the app > Settings (gear icon) > set a password > **Enable Fingerprint**.
You need a fingerprint already set up in your phone settings.

## Back up your data

Settings > **Save / Share Backup**. Do this now and then, and always before you uninstall the app.
Restore with Settings > Restore from File.

## If the build fails

Open the failed run in the Actions tab, copy the red error lines, and send them to Claude.
