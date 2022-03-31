# HungryNow

<img src="assets/demo.gif" width="207" alt="demo">

## App Description

HungryNow is a food ordering app that contains features to simulate the food ordering process. It consists of two separate apps: an ordering app for users and a driver's app. It works by establishing a connection between the client and the driver that emits and listens to real-time events. These events are triggered back and forth between the client and the driver. The details about the project can be found at [https://freddyzhao.herokuapp.com/hungrynow](https://freddyzhao.herokuapp.com/hungrynow).

- Order App
- [Driver App](https://github.com/freddyz00/HungryNow-driver)

## How It Works

Once the user is signed in, the app will use geolocation to retrieve the user's current location. This location can also be manually entered by the user. From there, the user can choose their favorite restaurant and the food they would like to order.

Once an order has been placed, an event will be sent to drivers through pusher.js and drivers can then choose to accept or decline the order. When an order has been accepted, the user will be notified of the status of the order and the location of the driver. After the order has been fulfilled, the details about the order will be saved to firebase and the user can view their past orders anytime.

## Running The App

### Running directly on your device

Download the Expo Go App on your device and scan the QR code below to run the app.

<img src="assets/expo-go.svg" width="300" alt="QR Code">

If this method does not work, please follow the following steps.

### Running locally on your machine

First, clone the repository and install the required packages:

```bash
git clone https://github.com/freddyz00/HungryNow-order.git
cd WorkNow
npm install
```

Install Expo CLI:

```bash
npm i -g expo-cli
```

Then, run the script to start the Expo app and follow the instructions provided:

```bash
expo start
```

### Note

In order to simulate the whole process, please run both the order app and the driver app at the same time.
