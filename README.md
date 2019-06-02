# Product Scanner
This is handy **Product Scanner app** -- POC. Can be used in Super market to buy and Warehouse to count/update stack details.

# Support Devices
- Android
- iOS
- Web

**iOS**
![iOS - Scanner](/preview/iOS.png?raw=true "iOS - Scanner")
**Android**
![Android - Scanner](/preview/Android.png?raw=true "Android - Scanner")
**Web**
> [Web demo](https://rish7.github.io/product-scanner/index.html)

# Configuration instructions 
- Download this repository code to local system and run `npm install` in root folder.
- Please check package.json scripts commands to start run in device first.
```
npm run build-ios
npm run ios
```
or
```
npm run android
```
or
```
npm run web
```
# Operating instructions
- It is very simple app, start using it to get familiar.
- Login details please enter random email with valid format and password (currently it will take any email and password, no validation)
- On success login it will show home page with start scan or enter manually. 
- Start scan will open camera, to scan barcodes
- Enter manually will help here barcodes are unable to scan. go for this option. Need to under details manually. We can make service call based on given barcode.
- On successfully add item user can change quantity amount
- After the list ready submit it, all submitted requests are in history page.
- History page user can add item to list again
- Help page we can add FAQ or any other details, we can add new page like settings etc..

# Copyright and licensing information
Modify this code for free. But this app used Ionic, Angular, Cordova & Cordova plugins those licenses are not under this app control.
