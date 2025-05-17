
# 📱 Mobile Version App

A mobile application built using **React Native** with **Expo Router**, designed to provide a modern, modular, and fast development experience.

# Try Commerce Mobile

E-commerce simple project built with React Native.

🔗 **APK Link**: [link](https://expo.dev/accounts/erika.sempana/projects/mobile-version-v1/builds/00737926-7d27-4f30-ad1c-0596cf7453c6)

---


## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/erikasempana/try-commerce-mobile.git
cd try-commerce-mobile
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start the App
```bash
npm run start
```

## 📦 Available Scripts

- `npm run android` – Run on Android device/emulator
- `npm run ios` – Run on iOS device/simulator
- `npm run web` – Run on web browser
- `npm run lint` – Run linter
- `npm run reset-project` – Reset cache, node_modules, and clear build

## 🧱 Tech Stack

- **React Native 0.79.2**
- **Expo ~53.0.9**
- **React 19**
- **TypeScript ~5.8.3**
- **Expo Router ~5.0.6**
- **Navigation:** `@react-navigation/native`, `bottom-tabs`, `elements`
- **UI:** `expo-image`, `expo-blur`, `react-native-picker-select`
- **Utils:** `expo-haptics`, `expo-splash-screen`, `expo-status-bar`, `expo-constants`

## 📁 Project Structure

```
.
├── app/                 # Pages and routes handled by expo-router
├── components/          # Reusable UI components
├── scripts/             # Project utility scripts (e.g., reset-project.js)
├── ios/                 # iOS project config
├── android/             # Android project config
├── package.json         # Dependencies and scripts
└── README.md
```

## 🔐 Notes

- Ensure to open `.xcworkspace` (not `.xcodeproj`) for iOS builds.
- Hermes engine adds a script phase during pod install - inspect if needed.
- If you're using Expo Go, features like `expo-router` might require EAS build.

## 🛠 Dev Dependencies

- **ESLint**
- **@types/react**
- **@babel/core**

## ✅ Status

Actively under development. Initial version `1.0.0`.

---

Built with ❤️ by Erika Sempana.
# try-commerce-mobile
