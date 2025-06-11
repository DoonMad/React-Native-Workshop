# 🛠️ Workshop Setup Guide

This guide will walk you through everything you need to set up before attending the React Native Workshop. We will cover installations, prerequisites, resources, and starter templates to ensure you're ready to build with us.

---

## 🌐 1. Create a GitHub Account

If you don’t already have one:

* Go to [https://github.com](https://github.com)
* Click **Sign up** and follow the instructions

We’ll be using GitHub to understand version control and push our apps online.

---

## 🧰 2. Install Git

Git is a version control system that helps you manage your code. We’ll use it throughout the workshop.

**Download Git**:

* Visit [https://git-scm.com/downloads](https://git-scm.com/downloads)
* Install Git based on your OS (Windows/Mac/Linux)

To check if it's installed correctly:

```bash
git --version
```

---

## 🖥️ 3. Install Node.js and npm

Node.js is needed to run JavaScript outside the browser, and npm is its package manager.

**Download Node.js (LTS version)**:

* [https://nodejs.org](https://nodejs.org)

To verify installation:

```bash
node -v
npm -v
```

---

## 🧪 4. Install Expo CLI

We’re using Expo to simplify the development process.

```bash
npm install -g expo-cli
```

To check:

```bash
expo --version
```

---

## 📱 5. Install Expo Go App (for phone testing)

Install **Expo Go** from the Play Store or App Store on your smartphone.

---

## 💻 6. Code Editor: VS Code

Recommended for writing and testing code.

* Download: [https://code.visualstudio.com](https://code.visualstudio.com)

---

## 📲 7. Android Studio (Optional - For Emulator)

If you want to run your app on a virtual Android phone:

* Download: [https://developer.android.com/studio](https://developer.android.com/studio)
* Install Android Emulator and follow setup instructions.

---

## 📦 8. Required Libraries

These will be installed via `npm install`, buthere are the main ones we’ll be using:

**Weather App**:

* `expo-location`
* `react-native-dotenv`
* `expo-linear-gradient`
* `react-native-vector-icons`

---

## 🚀 9. Cloning Starter Template (Optional)

For the Weather App, we might use a starter template to skip boilerplate setup:

```bash
cd react-native-workshop/starter-template/weather-starter-template
npm install
```

---

## 📚 Resources

* [React Native Docs](https://reactnative.dev/)
* [Expo Docs](https://docs.expo.dev/)
* [Git Handbook](https://guides.github.com/introduction/git-handbook/)
* [OpenWeatherMap API](https://openweathermap.org/api)
