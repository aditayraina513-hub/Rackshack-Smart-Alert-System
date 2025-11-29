/ --- Rackshack Mock Backend API Service (Node.js/Express) ---
// यह फ़ाइल आपके Technical Design Document (TDD) के लिए बैकएंड लॉजिक दर्शाती है।

const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio'); // SMS अलर्ट भेजने के लिए इस्तेमाल होता है
const { MongoClient } = require('mongodb'); // डेटाबेस के साथ इंटरैक्शन के लिए इस्तेमाल होता है

const app = express();
const PORT = process.env.PORT || 3000;

// कॉन्फ़िगरेशन (आपके README में सूचीबद्ध)
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/rackshack';
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = '+15005550006'; // Twilio नंबर का उदाहरण

// यूटिलिटी फ़ंक्शन्स (सिमुलेशन)

// SMS अलर्ट भेजने का सिमुलेशन
async function sendAlertSMS(contactNumber, locationLink) {
    console.log([Notification Service] ${contactNumber} को SMS भेजा जा रहा है। लिंक: ${locationLink});
    // await twilioClient.messages.create({ ... }); // वास्तविक Twilio API कॉल
    return true; // सफलता का सिमुलेशन
}

// डेटाबेस से विश्वसनीय संपर्क प्राप्त करने का फ़ंक्शन
async function getTrustedContacts(userId) {
    console.log([User Management Service] उपयोगकर्ता ID ${userId} के लिए संपर्क फ़ेच कर रहा है);
    // प्रदर्शन के लिए नकली डेटा
    return [
        { name: 'Mom', phone: '+919876543210' },
        { name: 'Brother', phone: '+919911223344' }
    ];
}

// API एंडपॉइंट्स (अलर्ट्स सर्विस)

// 1. POST /alert/activate
app.post('/api/alert/activate', async (req, res) => {
    const { userId, lat, lon } = req.body;
    
    if (!userId || !lat || !lon) {
        return res.status(400).send({ message: "आवश्यक फ़ील्ड्स गायब हैं।" });
    }

    console.log(\n--- ALERT सक्रिय हुआ ---);
    console.log([Alerts Service] उपयोगकर्ता ${userId} के लिए नए घटना को ${lat}, ${lon} पर लॉग किया गया);

    // रियल-टाइम लोकेशन स्ट्रीम शुरू करें (TDD चरण 3)
    const realTimeLink = https://rackshack.com/live/${userId}; 
    console.log([Alerts Service] रियल-टाइम स्ट्रीम शुरू हुई: ${realTimeLink});

    // संपर्क फ़ेच करें (TDD चरण 4)
    const contacts = await getTrustedContacts(userId);

    // सूचनाएँ भेजें (TDD चरण 5)
    for (const contact of contacts) {
        await sendAlertSMS(contact.phone, realTimeLink);
    }

    console.log(--- ALERT प्रक्रिया पूरी हुई। ${contacts.length} संपर्कों को सूचित किया गया। ---);
    
    res.status(202).send({ 
        alertId: 'A-2025-12345', 
        status: 'सक्रिय',
        message: 'आपातकालीन सेवाओं और विश्वसनीय संपर्कों को सूचित कर दिया गया है।' 
    });
});

// 2. POST /alert/deactivate
app.post('/api/alert/deactivate', (req, res) => {
    const { userId, alertId } = req.body;
    
    console.log(\n--- ALERT निष्क्रिय किया गया ---);
    console.log([Alerts Service] उपयोगकर्ता ${userId} ने अलर्ट ${alertId} को निष्क्रिय कर दिया।);

    // "सुरक्षित" सूचनाएँ संपर्कों को भेजें (सिमुलेशन)
    console.log([Notification Service] 'उपयोगकर्ता सुरक्षित है' सूचनाएँ भेजी जा रही हैं।);
    
    res.status(200).send({ status: 'समाधानित', message: 'अलर्ट सफलतापूर्वक बंद कर दिया गया।' });
});

app.listen(PORT, () => {
    console.log(मॉक रैकशैक सर्वर पोर्ट ${PORT} पर चल रहा है);
});