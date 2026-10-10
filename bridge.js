// Connects the web app (www/index.html) to real Android features.
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Preferences } from '@capacitor/preferences';
import { Share } from '@capacitor/share';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { BiometricAuth } from '@aparajita/capacitor-biometric-auth';

const native = Capacitor.isNativePlatform();

window.NB = {
  native,

  // Safe copy of the data (in case the WebView storage is ever cleared)
  get: async (k) => (await Preferences.get({ key: k })).value,
  set: (k, v) => Preferences.set({ key: k, value: v }),
  remove: (k) => Preferences.remove({ key: k }),

  // Real fingerprint
  bioAvailable: async () => {
    try {
      const r = await BiometricAuth.checkBiometry();
      return !!r.isAvailable;
    } catch (e) {
      return false;
    }
  },
  bioAuth: async (reason) => {
    try {
      await BiometricAuth.authenticate({
        reason,
        cancelTitle: 'Cancel',
        allowDeviceCredential: false,
        androidTitle: 'Money Tracker',
        androidSubtitle: reason,
      });
      return true;
    } catch (e) {
      return false;
    }
  },

  // Save / share a backup file
  share: async (name, text) => {
    const r = await Filesystem.writeFile({
      path: name,
      data: text,
      directory: Directory.Cache,
      encoding: Encoding.UTF8,
    });
    try {
      await Share.share({ title: name, url: r.uri, dialogTitle: 'Save or send' });
    } catch (e) {
      if (/cancel/i.test(String((e && e.message) || e))) return;
      throw e;
    }
  },
};

if (native) {
  // Android back button: go back inside the app, exit only from Home
  App.addListener('backButton', () => {
    if (!(window.__onBack && window.__onBack())) App.exitApp();
  });
  // Auto-lock when the app goes to the background for a while
  App.addListener('appStateChange', (s) => {
    if (window.__onActive) window.__onActive(s.isActive);
  });
}
