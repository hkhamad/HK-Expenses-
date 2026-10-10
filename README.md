# Money Tracker with Google sync

Only 2 files changed since the last package: index.html and sw.js.
Upload these 2 to your GitHub repo (same names replace the old ones). The other files stay as they are.

## One setting in Firebase (needed for Google login)
Firebase > Authentication > Settings > Authorized domains > Add domain:
  YOUR-USERNAME.github.io     (only the domain, no https:// and no path)

## Rules (Realtime Database > Rules > Publish)
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    }
  }
}

## Use
App > Settings (gear) > Cloud Sync > Sign in with Google.
Your data goes online. On another phone: open the app, sign in with the same Google account, data appears.
Changes sync by themselves. Deleted entries stay deleted on all phones.
The installed APK from PWABuilder loads your website, so you do NOT need to build the APK again.
Close and reopen the app once after you upload, so the new version loads.
