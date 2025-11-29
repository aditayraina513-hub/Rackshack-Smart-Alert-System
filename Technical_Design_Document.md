# Rackshack: Technical Design Document

## 1. Executive Summary
Rackshack is a Women's Safety Smart Alert System built on a **Modular Microservice Architecture** to ensure high availability and reliability during emergencies. It focuses on a swift, secure alert mechanism and real-time location sharing.

## 2. Technology Stack
* **Mobile Client:** **React Native** (iOS/Android) for cross-platform device access (GPS, button gestures).
* **Backend/API:** **Node.js** with **Express.js** for high-performance API handling.
* **Real-time:** **Socket.IO** for persistent, real-time broadcasting of location data.
* **Database:** **MongoDB** (NoSQL) for flexible storage of user profiles, trusted contacts, and incident logs.
* **Notifications:** **Twilio API** for immediate SMS alerts and **Firebase Cloud Messaging (FCM)** for push notifications.

## 3. High-Level Architecture
The system is divided into four main components:
1.  **Mobile App:** User interface and alert trigger.
2.  **API Gateway:** Routes all client requests.
3.  **Core Microservices:** Handles user profiles and alert processing.
4.  **External Services:** Handles notifications and mapping.

## 4. Core Functionality Design: Alert Flow

The following steps outline the process from alert activation to contact notification:

1.  **Activation:** User triggers the alert discreetly (e.g., volume button triple-press).
2.  **Request:** The App sends a secure **POST /alert/activate** request, including the current GPS data, to the API Gateway.
3.  **Real-time Stream Start:** The **Alerts Service** logs the incident and immediately initiates a **Socket.IO** connection, beginning to stream the user's updated GPS coordinates every 5 seconds.
4.  **Contact Retrieval:** The **Alerts Service** fetches the list of **trusted contacts (TCL)** from the User Management service.
5.  **Notification Dispatch:** The **Notification Service** uses the **Twilio API** to send personalized SMS/Push notifications to all TCL members. The alert contains a distress message and a unique, secure link to the real-time tracking dashboard.
6.  **Resolution:** The alert remains active until the user manually deactivates it using their security PIN.
