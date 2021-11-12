const { contextBridge, remote } = require("electron");

const SerialPort = require("serialport");
const fs = require("fs");
const csv = require('csv-parser');
const path = require('path'); 

// port instance 
let port = new SerialPort("COM5", {
    baudRate: 9600,
    autoOpen: false,
})

// initilzing parser
const Readline = SerialPort.parsers.Readline;
const parser = new Readline({ delimiter: '\r' });
port.pipe(parser);

// building SerialAPI
contextBridge.exposeInMainWorld(
    "SerialAPI", {
        selectAvailablePorts: (callback) => {
            let portList = [];

            SerialPort.list()
                .then((ports) => {
                    ports.forEach(({ path }) => {
                        portList.push(path);
                    });
                })
                .then(() => {
                    callback(portList);
                })

            return ;
        },
        read: (callback) => {
            // removing the last two char 
            // then passing data to callback
            parser.on('data', (data) => 
                callback(data.slice(0, data.length - 1))
            );
        },
        send: (message) => {
            // add delimiter to message to send
            port.write(message + '\r');
        },
        open: (callback) => {
            if(port.isOpen) {
                return ;
            }

            port.open((err) => {
                callback(err);
            });
        },
        close: (callback) => {
            if(port.isOpen) {
                port.close((err) => {
                    callback(err);
                });
            }
        },
        changePortName: (newPortName) => {
            // initilize a new instance of port
            const callback = () => {
                port = new SerialPort(newPortName, {
                    baudRate: 9600,
                    autoOpen: false
                });

                port.pipe(parser);
                port.open();
            }

            if(port.isOpen) {
                port.close(() => {
                    callback();
                });
            }
            else {
                callback();
            }
        },
    }
)

// building upload file API
const dialog = remote.dialog;

contextBridge.exposeInMainWorld(
    'Upload', {
        openDialog: (callback) => {
            dialog.showOpenDialog({ 
                title: 'Séléctionner un fichier csv', 
                defaultPath: path.join(__dirname, '../assets/'), 
                buttonLabel: 'Upload', 
                // Restricting the user to only csv files. 
                filters: [ 
                    { 
                        name: 'Fichier csv', 
                        extensions: ['csv'] 
                    },], 
                // Specifying the File Selector Property 
                properties: ['openFile'] 
            }).then(file => {  
                if (!file.canceled) { 
                    const filePath = file.filePaths[0].toString(); 
                    
                    // passing filePath to callback
                    callback(filePath);
                }   
            }).catch(err => { 
                console.log(err) 
            }); 
        },
        readFile: (pathName, callback) => {
            /* checking that pathname is not empty*/
            if(!pathName) {
                return
            }
            const data = [];

            fs.createReadStream(pathName)
                .pipe(csv())
                .on('data', (row) => {
                  data.push(row);
                })
                .on('end', () => {
                  callback(data);
                });
        },
    }
);
