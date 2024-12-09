// // const qrcode = require('qrcode-terminal');
// // const { Client } = require('whatsapp-web.js');

// // // Initialize the WhatsApp client
// // const client = new Client();

// // // Generate and scan the QR code
// // client.on('qr', (qr) => {
// //     console.log('Scan this QR code to log in:');
// //     qrcode.generate(qr, { small: true });
// // });

// // // Log successful authentication
// // client.on('ready', () => {
// //     console.log('WhatsApp client is ready!');
// // });

// // // Start the client
// // client.initialize();

// // // Temporary storage for OTPs
// // const otps = {};

// // // Function to generate a 6-digit OTP
// // const generateOTP = () => {
// //     return Math.floor(100000 + Math.random() * 900000);
// // };

// // // Function to send OTP
// // const sendOTP = (phoneNumber) => {
// //     const otp = generateOTP();
// //     otps[phoneNumber] = otp; // Store OTP against the phone number
// //     const message = `Your OTP is: ${otp}. This code is valid for 5 minutes.`;

// //     client.sendMessage(`${phoneNumber}@c.us`, message)
// //         .then(() => {
// //             console.log(`OTP sent successfully to ${phoneNumber}`);
// //         })
// //         .catch((err) => {
// //             console.error('Error sending OTP:', err);
// //         });

// //     return otp; // Optionally return OTP for debugging purposes
// // };

// // // Function to verify OTP
// // const verifyOTP = (phoneNumber, enteredOTP) => {
// //     if (otps[phoneNumber] && otps[phoneNumber] === enteredOTP) {
// //         console.log('OTP verified successfully!');
// //         delete otps[phoneNumber]; // Remove OTP after verification
// //         return true;
// //     } else {
// //         console.log('Invalid OTP or expired!');
// //         return false;
// //     }
// // };

// // // Example Usage
// // client.on('ready', () => {
// //     const phoneNumber = '919527397450'; // Replace with recipient's phone number (include country code)
    
// //     // Send OTP
// //     const otp = sendOTP(phoneNumber);
// //     console.log(`Generated OTP: ${otp}`);

// //     // Simulate user entering OTP
// //     setTimeout(() => {
// //         const enteredOTP = otp; // Replace this with user input in a real app
// //         const isValid = verifyOTP(phoneNumber, enteredOTP);

// //         if (isValid) {
// //             console.log('User authenticated successfully!');
// //         } else {
// //             console.log('Authentication failed.');
// //         }
// //     }, 10000); // Simulate 10 seconds delay before user enters OTP
// // });


// const qrcode = require('qrcode-terminal');
// const { Client } = require('whatsapp-web.js');
// const readline = require('readline');

// // Initialize the WhatsApp client
// const client = new Client();

// // Generate and scan the QR code
// client.on('qr', (qr) => {
//     console.log('Scan this QR code to log in:');
//     qrcode.generate(qr, { small: true });
// });

// // Log successful authentication
// client.on('ready', () => {
//     console.log('WhatsApp client is ready!');
// });

// // Start the client
// client.initialize();

// // Temporary storage for OTPs
// const otps = {};

// // Function to generate a 6-digit OTP
// const generateOTP = () => {
//     return Math.floor(100000 + Math.random() * 900000);
// };

// // Function to send OTP
// const sendOTP = (phoneNumber) => {
//     const otp = generateOTP();
//     otps[phoneNumber] = otp; // Store OTP against the phone number
//     const message = `Your OTP is: ${otp}. This code is valid for 5 minutes.`;

//     client.sendMessage(`${phoneNumber}@c.us`, message)
//         .then(() => {
//             console.log(`OTP sent successfully to ${phoneNumber}`);
//         })
//         .catch((err) => {
//             console.error('Error sending OTP:', err);
//         });

//     return otp; // Optionally return OTP for debugging purposes
// };

// // Function to verify OTP
// const verifyOTP = (phoneNumber, enteredOTP) => {
//     if (otps[phoneNumber] && otps[phoneNumber] === enteredOTP) {
//         console.log('OTP verified successfully!');
//         delete otps[phoneNumber]; // Remove OTP after verification
//         return true;
//     } else {
//         console.log('Invalid OTP or expired!');
//         return false;
//     }
// };

// // Set up a readline interface for user input
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// // Example usage
// client.on('ready', () => {
//     console.log('Please enter your mobile number (without country code):');
//     rl.question('Mobile Number: ', (inputNumber) => {
//         const phoneNumber = `91${inputNumber.trim()}`; // Prefix with India country code

//         // Send OTP
//         sendOTP(phoneNumber);

//         // Ask user to enter the OTP
//         setTimeout(() => {
//             rl.question('Enter the OTP you received: ', (enteredOTP) => {
//                 const isValid = verifyOTP(phoneNumber, enteredOTP.trim());

//                 if (isValid) {
//                     console.log('User authenticated successfully!');
//                 } else {
//                     console.log('Authentication failed.');
//                 }

//                 rl.close(); // Close the readline interface
//             });
//         }, 5000); // Delay to allow OTP delivery
//     });
// });


const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const readline = require('readline');

// Initialize the WhatsApp client
const client = new Client();

// Generate and scan the QR code
client.on('qr', (qr) => {
    console.log('Scan this QR code to log in:');
    qrcode.generate(qr, { small: true });
});

// Log successful authentication
client.on('ready', () => {
    console.log('WhatsApp client is ready!');
});

// Start the client
client.initialize();

// Temporary storage for OTPs
const otps = {};

// Function to generate a 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000); // Ensures a 6-digit OTP
};

// Function to send OTP
const sendOTP = (phoneNumber) => {
    const otp = generateOTP();
    otps[phoneNumber] = otp.toString(); // Store OTP as a string for consistent comparison
    const message = `Your OTP is: ${otp}. This code is valid for 5 minutes.`;

    client.sendMessage(`${phoneNumber}@c.us`, message)
        .then(() => {
            console.log(`OTP sent successfully to ${phoneNumber}`);
        })
        .catch((err) => {
            console.error('Error sending OTP:', err);
        });

    return otp; // Optionally return OTP for debugging purposes
};

// Function to verify OTP
const verifyOTP = (phoneNumber, enteredOTP) => {
    if (otps[phoneNumber] && otps[phoneNumber] === enteredOTP) {
        console.log('OTP verified successfully!');
        delete otps[phoneNumber]; // Remove OTP after verification
        return true;
    } else {
        console.log('Invalid OTP or expired!');
        return false;
    }
};

// Set up a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Example usage
client.on('ready', () => {
    console.log('Please enter your mobile number (without country code):');
    rl.question('Mobile Number: ', (inputNumber) => {
        const phoneNumber = `91${inputNumber.trim()}`; // Prefix with India country code

        // Send OTP
        sendOTP(phoneNumber);

        // Ask user to enter the OTP
        setTimeout(() => {
            rl.question('Enter the OTP you received: ', (enteredOTP) => {
                // Verify the entered OTP
                const isValid = verifyOTP(phoneNumber, enteredOTP.trim());

                if (isValid) {
                    console.log('User authenticated successfully!');
                } else {
                    console.log('Authentication failed. Please try again.');
                }

                rl.close(); // Close the readline interface
            });
        }, 5000); // Delay to allow OTP delivery
    });
});
