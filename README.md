# HungryNow

![demo](assets/app-images/JHRY1018.MP4)

## App Description

HungryNow is a food ordering app that contains features to simulate the food ordering process. It consists of two separate apps: an ordering app for users and a driver's app. It works by establishing a connection between the client and the driver that emits and listens to real-time events. These events are triggered back and forth between the client and the driver. The details about the project can be found at www.someurl.com

- Order App
- [Driver App](https://github.com/freddyz00/HungryNow-driver)

## How It Works

Once the user is signed in, the app will use geolocation to retrieve the user's current location. This location can also be manually entered by the user. From there, the user can choose their favorite restaurant and the food they would like to order.

Once an order has been placed, an event will be sent to drivers through pusher.js and drivers can then choose to accept or decline the order. When an order has been accepted, the user will be notified of the status of the order and the location of the driver. After the order has been fulfilled, the details about the order will be saved to firebase and the user can view their past orders anytime.

## Running The App

### Running directly on your device

Download Expo Go App on your device and scan the QR code below to run the app.

### Running locally on your machine

First, clone the repository and install the required packages:

```bash
git clone https://github.com/freddyz00/WorkNow.git
cd WorkNow
npm install
```

Then, run the script to start the Expo app and follow the instructions provided by Expo CLI

```bash
expo start
```
