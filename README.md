# Electron React Serialport (Template App)

# Overview
This repository provides a template for creating Desktop Apps using UI web frameworks.

I mainly created this template for robotics projects, particularly to build ergonomic user interfaces to exchange easily with a microcontroller.

When using this template, you have access not only to lower system API such as serial port communication to send command to `Arduino` but also to UIs web frameworks such `React`, `Bootstrap`, ... to leverage the power of the web and thereby create astonishing UIs.


# Getting started

1. First, start with cloning this repository by running

```git clone https://github.com/Badr-MOUFAD/electron-react-serialPort.git```

2. Then `cd` to template directory and run the following commands to install dependencies and rebuild them to made them compatible with ``electron``

```
npm intall
npm run rebuild
```

3. Finally, compile your ``js`` files into a single one that will be accessed within the [``index.html``](https://github.com/Badr-MOUFAD/electron-react-serialPort/blob/master/index.html) file

```
npm run watch
```


To view the app, run `npm start`.
