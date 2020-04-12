# iOS: [![Build status](https://build.appcenter.ms/v0.1/apps/ed535696-a042-429d-84d4-d4d6fb68988c/branches/staging/badge)](https://appcenter.ms)

# Android [![Build status](https://build.appcenter.ms/v0.1/apps/d3bb5829-7d2e-4691-8ff1-3a9909bc7e01/branches/staging/badge)](https://appcenter.ms)

build release apk: `./gradlew assembleRelease` / `./gradlew app:assembleRelease`
build debug apk: `./gradlew assembleDebug` / `./gradlew app:assembleDebug`

clean android build: `cd android && ./gradlew clean`

## Update app with CodePush

`appcenter codepush release-react -a findy/findy-<PLATFORM> -d <Production | Staging>`
