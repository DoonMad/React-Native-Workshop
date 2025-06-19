# 🛠️ Workshop Setup Guide

This guide will walk you through everything you need to set up before attending the React Native Workshop. We will cover installations, prerequisites, resources, and starter templates to ensure you're ready to build with us.

---

## 🌐 1. Create a GitHub Account

If you don’t already have one:

* Go to [https://github.com](https://github.com)
* Click **Sign up** and follow the instructions

We’ll be using GitHub to understand version control and push our apps online.

---

## ☁️ 2. Create an OpenWeatherMap Account

To access weather data via their API, you need an account on OpenWeatherMap:

* Go to [https://openweathermap.org/api](https://openweathermap.org/api)
* Sign up and verify your email.
* You'll use your account to generate an API key.

---

## 🧰 3. Install Git

Git is a version control system that helps you manage your code. We’ll use it throughout the workshop.

**Download Git**:

* Visit [https://git-scm.com/downloads](https://git-scm.com/downloads)
* Install Git based on your OS (Windows/Mac/Linux)
* [Video guide on installing git](https://www.youtube.com/watch?v=t2-l3WvWvqg)

To check if it's installed correctly:

```bash
git --version
```

### 🔐 Set Up Git and GitHub SSH Connection (Optional but Recommended)

If you want to push code securely without entering your GitHub password every time:

1. Generate an SSH key (if you don’t already have one):

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. Copy your SSH public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

3. Go to your GitHub [SSH settings](https://github.com/settings/ssh) and add the key.

4. Now you can clone and push using SSH:

```bash
git clone git@github.com:your-username/your-repo.git
```

---

## 🖥️ 4. Install Node.js and npm

Node.js is needed to run JavaScript outside the browser, and npm is its package manager.

**Download Node.js (LTS version)**:

* [https://nodejs.org](https://nodejs.org)
* [Video guide on installing Node.js](https://www.youtube.com/watch?v=lt5D2EWZMN0)

To verify installation:

```bash
node -v
npm -v
```

---

## 🧪 5. Install Expo CLI

We’re using Expo to simplify the development process.

```bash
npm install -g expo-cli
```

To check:

```bash
expo --version
```

---

## 📱 6. Install Expo Go App (for phone testing)

Install **Expo Go** from the Play Store or App Store on your smartphone.

---

## 💻 7. Code Editor: VS Code

Recommended for writing and testing code.

* Download: [https://code.visualstudio.com](https://code.visualstudio.com)
* [Video guide on installing VS Code](https://www.youtube.com/watch?v=DoLYVXR9SSc)

---

## 📲 8. Android Studio (Optional - For Emulator)

If you want to run your app on a virtual Android phone:

* Download: [https://developer.android.com/studio](https://developer.android.com/studio)
* Install Android Emulator and follow setup instructions.
* [Video guide on installing Android Studio](https://www.youtube.com/watch?v=AGmoCiMNBFw)

---

## 📦 9. Required Libraries

These will be installed via `npm install`, but here are the main ones we’ll be using:

**Weather App**:

* `expo-location`
* `react-native-dotenv`
* `expo-linear-gradient`
* `react-native-vector-icons`

---

## 🚀 10. Cloning Starter Template (Optional)

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
