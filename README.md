# ❤️ Frontend

## Linkedin post with DEMO video = [post link](https://www.linkedin.com/posts/parthpatelreal_introducing-my-first-major-mern-stack-activity-7172284301995094016-Q6cv?utm_source=share&utm_medium=member_desktop)

## 💚 how to run react and backend at the same time ?

- `npm i concurrently` install in root folder
- then in the frontend `package.json` file do below changes.
```
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "eject": "react-scripts eject",
    "server": "cd server && npm run dev",
    "dev": "concurrently -n \"client,server\" -c \"bgBlue,bgYellow\" \"npm start\" \"npm run server\""
  },
```
- then `npm run dev` to start both at the same time with single command

# 🩵 Backend

## 💚 DB schema design

![image](https://github.com/parthmern/StudyNotion/assets/125397720/732c64ab-9bcc-4484-9d49-35752d1f1c2e)


## 💛 How OTP is working ?
![image](https://github.com/parthmern/StudyNotion/assets/125397720/87c18432-4ab7-4cf4-a3d0-256e3bf3769d)

## 🩵 How payment gateway working in backend using RAZORPAY ?
![diagram-export-1-28-2024-8_12_58-PM](https://github.com/parthmern/StudyNotion/assets/125397720/9d8457d9-6a3f-44e8-9c1c-6aa4a357536e)




```
const express = require('express');
const Razorpay = require('razorpay');

const app = express();

// Initialize Razorpay with your API key and secret key
const razorpay = new Razorpay({
  key_id: 'YOUR_KEY_ID', // Replace with your Razorpay API Key ID
  key_secret: 'YOUR_KEY_SECRET', // Replace with your Razorpay API Secret Key
});

// ===============================================
// PAYMENT INITIATE / CREATE
// Create a route to initiate the payment
app.post('/create-payment', async (req, res) => {
  const options = {
    amount: 50000, // amount in the smallest currency unit (e.g., paise for INR)
    currency: 'INR', // currency (INR here)
    receipt: 'receipt_order_1', // unique identifier for the transaction
    // payment_capture: 1, // Auto capture payment (1 - true, 0 - false)
    notes : {
        courseId : "courseId" ,
        userId : "userId"
    }                      // can add anyhthing that we can add in notes
  };

  try {
    // Create an order using Razorpay API
    const response = await razorpay.orders.create(options);
    res.json(response); // Send the created order details back to the client
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle any errors
  }
});
// =============================================
// SIGNATURE VERIFICATION
// Create a route to handle payment success
app.post('/payment-success', (req, res) => {
  const body = req.body;
  const signature = body.razorpay_signature;

  // Verify the payment signature received from Razorpay
  const verified = razorpay.verifySignature(body, signature);
  if (verified) {
    // Payment verification successful, proceed with your logic here
    res.json({ status: 'Payment successful' });
  } else {
    // Payment verification failed
    res.status(400).json({ error: 'Payment verification failed' });
  }
});

```

- once the payment is proceed successfully by the user, RazorPay will send a POST REQ through webhook to the WEBHOOK URL that you have set in the razorpay dashboard.Handle the verification of payment in the `/payment-success` route
- we have to add the "SIGNATURE VERIFICATION URL" in the webhook of the razorpay dashboard. 


## 💚 Problems that i faced
- Buttons are not available of LOGIN and SIGNUP. I forgot to set the value of user loggedin profile in locat storage.How I solved it? - i got 2 ways here 1= that i used in my first notes appliaction if there is token available in cookies firstly then put the request on backend and grab the details of user. 2= set the local storage values while login is successfull and i choose the second way because i want to learn something new about local storage.

- MATCHROUTE function fata gaya and error was Calling the original function again and again recursive function without and condition so it is doing infinite looping. How i solved it ? - i just change the function name and everything is working fine.

```
  const matchRoute = (route) => {
    // matchPath is predefined function in react router dom
    // it gives TRUE value if the route is matching otherwise it will give FALSE value
    return matchPath({ path: route }, location.pathname)
  }

```

- Learn about Delete account feature like if person clicked on DELETE account then it will put request in backend but it will not be successfully excecuted instat. We can set time like it will excecuted after 10 days or something and add extra feature that during 10 days if user loggedin with same account then the deletion of account process removed automatically.

![diagram-export-1-28-2024-8_02_55-PM](https://github.com/parthmern/StudyNotion/assets/125397720/691687c7-1da7-4848-b975-c72a3242802c)

- working with edit/create course with creating section and sub section is difficult for me.It takes hours of time. After hit and trial, one modal is successfully working.

- onclick ==> e.stopPropogation() while one div has onclick and that child div also has onclick so when we clicking on the main div that time child div's onclick is also working so that ttime using e.stopPropogation() for child div to avoid this and giving the partiular div onclick working.

- swiper js ==> headache for me in import of swiper js components 

- videoDetails with previous,next video is challaenging 
