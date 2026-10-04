# Building the Android app

Start-to-finish guide to building, running, and releasing the Capacitor Android app in [`../android/`](../android/), assuming nothing is installed yet. The app is fully offline (all content is static TS in the bundle, progress lives in `localStorage`) — no backend, no analytics, no API keys, nothing to configure server-side.

**At a glance**: install JDK 21 + Node 22.x + Android Studio (SDK Platform 36) → `npm ci` → `npm run android` → pick a device → Run. Release builds need a signing keystore, covered in [Release signing](#release-signing).

## 1. What you're building

| Output | Format | Use it for | Signed? |
| --- | --- | --- | --- |
| Debug APK | `.apk` | Sideloading to your own phone, testing | Yes, with an auto-generated debug key — fine for your own devices, not for distribution |
| Release APK | `.apk` | Direct distribution outside the Play Store (e.g. handing someone a file) | Yes, with **your** release key — see [Release signing](#release-signing) |
| Release AAB (App Bundle) | `.aab` | Uploading to the Play Store | Yes, with **your** release key |

If you just want to try the app on your own phone, build the **debug APK** (§3–4). If you want to publish, you need a **release AAB** signed with a key you control and keep forever (§6, §8).

## 2. Prerequisites from nothing

### JDK 21

The generated Gradle config (`../android/app/capacitor.build.gradle`, marked "DO NOT EDIT") pins `sourceCompatibility`/`targetCompatibility` to `VERSION_21`, so you need a JDK 21 on `PATH`/`JAVA_HOME`.

> **Note**: JDK 17 works for many Capacitor projects and older guides will tell you to use it — it does **not** work here. `capacitor.build.gradle` is the generated source of truth and it pins 21.

1. Download [Eclipse Temurin 21 (JDK)](https://adoptium.net/temurin/releases/?version=21) for Windows x64, `.msi` installer.
2. Run the installer. On the "Custom Setup" screen, enable **"Set JAVA_HOME variable"** and **"JavaSoft (Oracle) registry keys"** — this saves you from setting `JAVA_HOME` by hand.
3. If it wasn't set automatically, set it yourself (new PowerShell window afterwards):

```powershell
[Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Eclipse Adoptium\jdk-21.<full-version>-hotspot", "User")
```

Adjust the path to match what the installer actually created (check `C:\Program Files\Eclipse Adoptium\`).

4. Verify:

```powershell
java -version
```

Expected output starts with something like `openjdk version "21...`.

### Node 22.x

Vite 7 needs Node `^20.19.0 || >=22.12.0` and `@capacitor/cli` 8 needs `>=20`; **Node 22.x** is the recommended target (no `.nvmrc`/`engines` field is pinned in this repo). Install from [nodejs.org](https://nodejs.org/) (LTS installer) or via `nvm-windows` if you manage multiple versions. Verify:

```powershell
node -v
npm -v
```

### Android Studio + SDK

1. Download [Android Studio](https://developer.android.com/studio) for Windows and run the installer (default options are fine).
2. First launch runs the **Setup Wizard** — accept the default "Standard" install type. This pulls the SDK, Platform-Tools, and a recent build-tools/platform automatically.
3. Open **More Actions → SDK Manager** (or, inside a project, **Settings → Languages & Frameworks → Android SDK**) and, under **SDK Platforms**, tick:
   - **Android API 36** (matches `compileSdkVersion`/`targetSdkVersion` in [`../android/variables.gradle`](../android/variables.gradle))
4. Under **SDK Tools**, make sure these are checked:
   - **Android SDK Build-Tools**
   - **Android SDK Platform-Tools** (gives you `adb`)
   - **Android Emulator** (only needed if you'll use a virtual device — see §5)
5. Click **Apply** and let it download.

Gradle itself needs **no separate install** — [`../android/gradlew.bat`](../android/gradlew.bat) (the Gradle wrapper) downloads the exact pinned version (**8.14.3**, see [`../android/gradle/wrapper/gradle-wrapper.properties`](../android/gradle/wrapper/gradle-wrapper.properties)) into `%USERPROFILE%\.gradle` the first time you build.

### Verify your setup

Run each of these in a fresh PowerShell window and confirm the expected shape of output:

```powershell
java -version
# openjdk version "21...

node -v
# v22.x.x

npm -v
# 10.x.x or newer

$env:ANDROID_HOME
# C:\Users\<you>\AppData\Local\Android\Sdk  (set by Android Studio's first-run wizard)

adb --version
# Android Debug Bridge version ...
```

If `adb` isn't found, add `%ANDROID_HOME%\platform-tools` to `PATH` (Android Studio's installer usually does this for you; a new terminal window may be needed for it to take effect).

## 3. First build (debug)

From the `jlpt-n4-trainer/` project root (not `android/`):

```powershell
npm ci
```

**Why first**: [`../android/capacitor.settings.gradle`](../android/capacitor.settings.gradle) resolves each Capacitor plugin module through a **relative path into `../node_modules/@capacitor/*`** (e.g. `project(':capacitor-android').projectDir = new File('../node_modules/@capacitor/android/capacitor')`). If `node_modules/` doesn't exist yet, Gradle fails immediately with `Could not find :capacitor-android` (or similar) — it has nothing to do with the SDK/JDK setup.

Then build and open the native project:

```powershell
npm run android
```

This runs `npm run sync` (`build:native` — type-checks, builds the Vite bundle with relative asset paths and no service worker — then `cap sync`, which copies `dist/` into `android/app/src/main/assets/public` and regenerates the Capacitor config/plugin manifests) and opens **Android Studio** on the `android/` project.

The **first** Gradle sync is slow — it's downloading Gradle 8.14.3 itself, the Android Gradle Plugin, and every dependency in `variables.gradle`. Expect several minutes on a fresh machine; watch the progress bar at the bottom of the Android Studio window. Subsequent syncs are much faster (cached).

Once sync finishes: pick a target device from the dropdown in the toolbar (a plugged-in phone, or a created emulator — see §5) and click the green **Run** (▶) button. Android Studio builds the debug APK, installs it, and launches it.

## 4. Running on a real phone

1. **Enable Developer Options**: Settings → About phone → tap **Build number** 7 times.
2. **Enable USB debugging**: Settings → System → Developer options → toggle **USB debugging** on.
3. Plug the phone in via USB, accept the "Allow USB debugging?" prompt on the phone.
4. Verify the PC sees it:

```powershell
adb devices
```

Expected: your device listed with state `device` (not `unauthorized` — if so, re-accept the prompt on the phone; not `offline` — try re-plugging).

5. Select the device in Android Studio's device dropdown and hit Run, **or** sideload the already-built APK directly:

```powershell
adb install "android\app\build\outputs\apk\debug\app-debug.apk"
```

That file only exists after at least one successful build (§3).

**Wireless debugging**: Android 11+ supports debugging over Wi-Fi without a cable — Settings → Developer options → **Wireless debugging** → pair with a QR code or pairing code from Android Studio's device dropdown ("Pair devices using Wi-Fi"). Useful once the initial USB pairing is done.

## 5. Emulator

1. In Android Studio: **More Actions → Virtual Device Manager** (or the device dropdown → "Device Manager").
2. **Create Device**, pick a phone profile (e.g. Pixel 8), **Next**.
3. Pick a system image. It must be **API 24 or higher** (`minSdkVersion` in [`../android/variables.gradle`](../android/variables.gradle)) — anything reasonably recent (API 34+) is fine and lets you also test against API 36 behavior. Download the image if prompted.
4. Finish, then select the new AVD in the toolbar device dropdown and hit Run.

## 6. Release signing

This is the part that actually matters for shipping — today, `gradlew assembleRelease` produces an **unsigned** APK that Android refuses to install, because [`../android/app/build.gradle`](../android/app/build.gradle) has no `signingConfigs` block and there is no keystore anywhere in the repo.

### Generate a keystore

Use the JDK's `keytool` (on `PATH` once JDK 21 is installed):

```powershell
keytool -genkey -v -keystore jlpt-n4-trainer-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias jlpt-n4-trainer
```

You'll be prompted for a keystore password, your name/org (cosmetic, shown nowhere users see), and a key password (can match the keystore password).

**Where to put it: outside the repo entirely**, e.g. `C:\Users\<you>\keystores\jlpt-n4-trainer-release.jks`. Do not put it inside `android/`. [`../android/.gitignore`](../android/.gitignore) has the keystore-ignore lines **commented out**:

```
# Keystore files
# Uncomment the following lines if you do not want to check your keystore files in.
#*.jks
#*.keystore
```

As written, a `.jks`/`.keystore` file dropped inside `android/` **would get committed** to git. Either keep the keystore outside the repo (recommended — this guide assumes that) or uncomment those two lines in `android/.gitignore` yourself first.

**If you lose this file (or forget its password), there is no recovery.** Once an app is published to the Play Store, every future update must be signed with the *same* key — Google will reject an AAB signed with a different one. Losing the keystore means you can never update that Play listing again; your only option is publishing under a brand-new package name as a new app, losing all reviews/installs/history. Back this file up somewhere durable (password manager attachment, encrypted cloud backup) — not just on the one machine that generated it.

### `android/key.properties`

Create `android/key.properties` (this file is new — it doesn't exist yet) with:

```properties
storeFile=C:\\Users\\<you>\\keystores\\jlpt-n4-trainer-release.jks
storePassword=<your keystore password>
keyAlias=jlpt-n4-trainer
keyPassword=<your key password>
```

Use double backslashes in the Windows path, since this is read as a Java `.properties` file. Then add it to [`../android/.gitignore`](../android/.gitignore) so it never gets committed:

```
key.properties
```

### Patch `android/app/build.gradle`

The current file (verified) has no signing config at all:

```gradle
android {
    namespace = "com.rgeegallega.jlptn4trainer"
    compileSdk = rootProject.ext.compileSdkVersion
    defaultConfig {
        ...
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

Apply this patch by hand in [`../android/app/build.gradle`](../android/app/build.gradle):

```gradle
// 1. Add near the top of the file, before the `android {` block:
def keystorePropertiesFile = rootProject.file("key.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    namespace = "com.rgeegallega.jlptn4trainer"
    compileSdk = rootProject.ext.compileSdkVersion
    defaultConfig {
        ...
        // (unchanged)
    }

    // 2. Add a signingConfigs block (sibling of defaultConfig/buildTypes):
    signingConfigs {
        release {
            if (keystorePropertiesFile.exists()) {
                storeFile file(keystoreProperties['storeFile'])
                storePassword keystoreProperties['storePassword']
                keyAlias keystoreProperties['keyAlias']
                keyPassword keystoreProperties['keyPassword']
            }
        }
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
            // 3. Wire the signing config in:
            signingConfig signingConfigs.release
        }
    }
}
```

The `if (keystorePropertiesFile.exists())` guard means the project still builds (unsigned) on a machine without `key.properties` — only your machine, with the file in place, produces a signed release build.

### Build it

```powershell
cd android
.\gradlew.bat assembleRelease
```

Output: `android\app\build\outputs\apk\release\app-release.apk`

For the Play Store, build the App Bundle instead:

```powershell
.\gradlew.bat bundleRelease
```

Output: `android\app\build\outputs\bundle\release\app-release.aab`

Both commands pick up `android/key.properties` automatically via the patch above; without it they still succeed but emit an unsigned artifact (same as today).

## 7. Versioning for updates

`versionCode` and `versionName` live in [`../android/app/build.gradle`](../android/app/build.gradle), currently:

```gradle
versionCode 1
versionName "1.0"
```

- `versionCode` is the integer Play/Android compares to decide whether a build is an "update" — it **must strictly increase** on every release you publish (1 → 2 → 3 …), or Play rejects the upload and users won't be offered the update.
- `versionName` is the human-readable string shown to users (e.g. `"1.1"`, `"1.1.0"`) — no format requirement, bump it however you like alongside `versionCode`.

## 8. Play Store submission outline

1. Create a **Google Play Developer account** ($25 one-time fee) at [play.google.com/console](https://play.google.com/console).
2. **Create app** in the Play Console: name, default language, app/game, free/paid.
3. Upload the **AAB** (§6) to the **Internal testing** track first (Play Console → Testing → Internal testing → Create release). This lets you install via a private link before any public review.
4. **Data safety form**: trivial here — the app collects and shares **no** user data, has no backend, no analytics SDK, no ads. It declares only `android.permission.INTERNET` in [`../android/app/src/main/AndroidManifest.xml`](../android/app/src/main/AndroidManifest.xml), which Capacitor's WebView requires to load local assets/resources — no actual network calls are made. Answer "No data collected" throughout.
5. **Content rating**: fill out the questionnaire (IARC) — an offline grammar-study app should rate as "Everyone".
6. **Screenshots + store listing**: at least 2 phone screenshots, a short and full description, an app icon (already generated from `resources/icon.svg`, see the main README's "Regenerating icons" section), and a feature graphic (1024×500) if you want the listing to look complete.
7. Once internal testing looks good, promote the release to **Production** (or add Closed/Open testing tracks first if you want wider pre-release feedback).

## 9. Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `SDK location not found` | `android/local.properties` doesn't exist (it's gitignored, generated per-machine) | Open the project in Android Studio once — it writes `local.properties` with `sdk.dir=...` automatically. For a CI/headless build, set `ANDROID_HOME` (or `ANDROID_SDK_ROOT`) instead. |
| Gradle JDK mismatch / build fails with a Java version error | Android Studio is using a different JDK than 21 for Gradle itself | Android Studio → **Settings → Build, Execution, Deployment → Build Tools → Gradle → Gradle JDK**, set to a JDK 21. |
| `Could not find :capacitor-android` (or any `:capacitor-*` module) | `node_modules/` is missing — `android/capacitor.settings.gradle` resolves plugins via relative paths into it | Run `npm ci` (or `npm install`) from the project root before building. |
| Code changes don't show up on-device | The native app serves a **copy** of the web build baked into `android/app/src/main/assets/public` at sync time — editing `src/` doesn't touch that copy | Re-run `npm run sync` (or `npm run android`) after every source change to refresh the copy. |
| Built app looks stale / has a phantom service worker | Ran `npm run build` (web/PWA target — emits a service worker) and then `cap sync`, instead of `npm run build:native` | Always use `npm run sync` / `npm run android` for native builds; never `cap sync` after a plain `npm run build`. `dist/` is shared by both targets, so the wrong one silently ships the SW into the WebView. |
| `INSTALL_FAILED_UPDATE_INCOMPATIBLE` | Debug and release builds are signed with different keys, and Android won't let one "update" the other in place | Uninstall the existing app (`adb uninstall com.rgeegallega.jlptn4trainer`) before installing the other variant. |
| First build takes forever | Normal — first sync downloads Gradle 8.14.3 plus the full AGP/SDK dependency graph | Just let it finish; subsequent builds use the cache and are much faster. |
