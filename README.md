# HungryNow

HungryNow is a project that is based on modern food ordering apps. This project consists of three parts: an ordering app for users, a driver's app, and the authentication server. This repository focuses on the first part of the project, the food ordering app.

- Order App
- [Driver App](https://github.com/freddyz00/HungryNow-driver)
- [Server](https://github.com/freddyz00/HungryNow-server)

## Order App

The home screen consists of the list of all of the available restaurants each of which the user can select and view the menu that is offered by that particular restaurant.

![Home](/assets/appWorkflow/Home.jpg)

On the home screen, the user will be asked for location permission and if it is granted, the user's current location will be accessed using geolocation and displayed in the header. The header can also be pressed to change the location manually, in which another screen will appear and the user can type in the address manually.

![ChangeLocation](/assets/appWorkflow/ChangeLocation.jpg) ![EnterLocation](/assets/appWorkflow/EnterLocation.jpg)

The restaurant's details and its menu are displayed when the user clicks on a restaurant from the home screen. Here, they can choose the items to add to cart and then they can select the quantity of each menu item. Adding an item that already exists in the cart will increment its quantity in the cart. Only items from one restaurant can be added to the cart at a time.

![RestaurantDetails](/assets/appWorkflow/RestaurantDetails.jpg) ![AddToCart](/assets/appWorkflow/AddToCart.jpg)

Once an item has been added to the cart, users can click on the cart icon located at the right of the header, or they can click on the View Cart button that appears on the bottom of the screen to view the contents of the cart. This lists the details of the number of each item in the cart, including the price of each item, the delivery fee and the total amount for the order. Finally, the user can press the Place Order button to confirm their order and the request will be sent to available drivers.

![ViewYourCart](/assets/appWorkflow/ViewYourCart.jpg) ![Cart](/assets/appWorkflow/Cart.jpg)

Once a driver has accepted the order, the driver's location will be displayed in real time on the map. The route from the driver to the user will be displayed once the driver has picked up the order, and the driver's location will be updated in real time, along with the status of the order.

![TrackOrder](/assets/appWorkflow/TrackOrder.jpg) ![TrackOrderWithRoute](/assets/appWorkflow/TrackOrderWithRoute.jpg)

## Driver App

Geolocation will be used to figure out the driver's location. When a driver receives a request from a user, a modal with the order details will pop up and the driver can choose to accept or decline the order.

![DriverOrderModal](/assets/appWorkflow/DriverOrderModal.jpg)

Once the order has been accepted, the driver's screen will be presented with the location of the customer and the restaurant. The driver's location is constantly watched and sent to the user's app. The driver can execute each of the steps in the order process by clicking the button at the bottom. This will update the customer about the status of the order. After the order has been delivered, the state of the app will reset and the app will be listening for a new order.

![DriverLocationsMap](/assets/appWorkflow/DriverLocationsMap.jpg)
![DriverDeliveringOrder](/assets/appWorkflow/DriverDeliveringOrder.jpg)

## Server

The server is a simple express server that is used to authenticate the communication between the ordering app and the driver app. This is required by Pusher Channels in order to emit private events from the client.
