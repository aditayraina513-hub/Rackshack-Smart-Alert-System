# Rackshack: Prototype Test Cases

## A. Critical Alert Activation and Deactivation

| Test ID | Scenario | Steps to Perform | Expected Outcome |
| :--- | :--- | :--- | :--- |
| **TC-01** | **Discreet Alert Trigger** | 1. Ensure the user is logged in and has 3 trusted contacts defined. 2. **Triple-press the power/volume button** on the device. | Alert is triggered within 2 seconds. All 3 trusted contacts receive an instant SMS/Push Notification with a real-time tracking URL. |
| **TC-02** | **Alert Resolution** | 1. TC-01 is active. 2. User opens the app and enters the security PIN to stop the alert. | Alert status changes to 'Safe/Resolved'. Contacts receive an 'Alert Resolved' notification. Real-time location streaming stops. |

## B. Real-Time Tracking Reliability

| Test ID | Scenario | Steps to Perform | Expected Outcome |
| :--- | :--- | :--- | :--- |
| **TC-03** | **Live Location Update** | 1. TC-01 is active. 2. A trusted contact opens the tracking URL. 3. The user walks 100 meters. | The contact's map view updates the user's position within **5-10 seconds**. Location accuracy is within 10 meters. |
| **TC-04** | **Maximum Contact Limit** | 1. Attempt to add a 6th contact to a user's profile (assuming a limit of 5). | The API should reject the request with a **HTTP Status 400** and an error message like "Maximum contact limit reached." |
