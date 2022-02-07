# HungryNow

HungryNow is a project that is based on modern food ordering apps. This project consists of three parts: an ordering app for users, a driver's app, and the authentication server. This repository focuses on the first part of the project, the food ordering app.

## Ordering App

The home screen consists of the list of all of the available restaurants each of which the user can select and view the menu that is offered by that particular restaurant.

![Home](./assets/appWorkflow/Home.png)

On the home screen, the user will be asked for location permission and if it is granted, the user's current location will be accessed using geolocation and displayed in the header. The header can also be pressed to change the location manually, in which another screen will appear and the user can type in the address manually.

![ChangeLocation](./assets/appWorkflow/ChangeLocation.png) ![EnterLocation](./assets/appWorkflow/EnterLocation.png)

The restaurant's details and its menu are displayed when the user clicks on a restaurant from the home screen. Here, they can choose the items to add to cart and then they can select the quantity of each menu item they would like to add to the cart. Adding an item that already exists in the cart will increment the quantity of the same item. Only items from one restaurant can be added to the cart at a time.

![RestaurantDetails](./assets/appWorkflow/RestaurantDetails.png) ![AddToModal](./assets/appWorkflow/AddToModal.png)

Once an item has been added to the cart, users can click on the cart icon located at the right of the header, or they can click on the View Cart button that appears on the bottom of the screen to view the content of the cart. This lists the details of the number of each item in the cart, including the price of each item, the delivery fee and the total amount for the order. Finally, the user can press the Place Order button to confirm their order and the request will be sent to available drivers.

![ViewYourCart](./assets/appWorkflow/ViewYourCart.png) ![Cart](./assets/appWorkflow/Cart.png)

Once a driver has accepted the order, the driver's location will be displayed in real time on the map. The route from the driver to the user will be displayed once the driver has picked up the order, and the driver's location will be updated in real time, along with the status of the order.

![TrackOrder](./assets/appWorkflow/TrackOrder.png)

## Driver App

Geolocation will be used to figure out the driver's location. When a driver receives a request for driver, a modal that contains the order details will pop up and the driver can choose to accept or decline the order. Once the order has been accepted, the driver's screen will be presented with the location of the customer and the restaurant. The driver can execute each of the order processes by clicking the button at the bottom. This will update the customer about the status of the order and the location of the driver. After the order has been delivered, the state of the app will reset and the app will be listening for a new order.

## Server

The server is a simple express server that is used to authenticate the communication between the ordering app and the driver app. This is required by Pusher Channels in order to emit private events from the client.
