# Activity Monitor - PWA

A Progressive Web App (PWA) for monitoring and recording periodic activities. Users must press a button at configurable intervals to confirm their presence/activity.

> **⚠️ Disclaimer**: This application was developed with the assistance of Artificial Intelligence (AI). Users should verify functionality for their specific use cases.

## 🚀 Features

- ✅ **Periodic check-in**: Button to confirm presence at configurable intervals
- ⏱️ **Visual timer**: Countdown showing time remaining until next check-in
- ⚙️ **Configurable interval**: Set time between check-ins (1-1440 minutes)
- 📊 **Progress bar**: Visual representation of elapsed time
- 🔔 **Notifications**: Alerts when check-in is approaching or overdue
- 📋 **Complete history**: Record of all activities with status
- 💾 **Local storage**: Data saved in browser
- 📤 **Export**: Export history in CSV format
- 📱 **Installable**: Can be installed as an app on mobile or desktop
- 🌐 **Works offline**: Service Worker for offline usage
- 🛑 **Stop monitoring**: Stop button to halt activity tracking with history entry
- 📊 **Activity statistics**: Calculate active/inactive time from a specific date

## 📦 Installation

### As PWA (Recommended)

1. Open the application in a modern browser (Chrome, Edge, Safari, Firefox)
2. Look for the installation icon in the address bar or menu
3. Click "Install" or "Add to Home Screen"
4. The app will be installed as a native application

### Local Server

To test locally, you need an HTTP server. Choose one of the options:

**Option 1 - Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Option 2 - Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Option 3 - PHP:**
```bash
php -S localhost:8000
```

Then access: `http://localhost:8000`

## 🎯 How to Use

1. **First Check-in**: Press the "Confirm Presence" button to start
2. **Configure Interval**: Set how many minutes between each check-in (default: 30 min)
3. **Enable Notifications**: Check the option to receive alerts
4. **Monitor Timer**: Track remaining time on the main screen
5. **Regular Check-ins**: Press the button before time runs out
6. **View History**: See all completed check-ins
7. **Stop Monitoring**: Press the stop button to halt tracking (creates a history entry)
8. **View Statistics**: Calculate active/inactive time from a specific date

## 🎨 Visual Features

- **Green**: Check-in completed on time
- **Yellow**: Less than 5 minutes remaining
- **Red blinking**: Check-in overdue
- **Progress bar**: Shows elapsed time visually
- **Gray**: Stopped/interrupted session

## 📱 Compatibility

- ✅ Chrome/Edge (Desktop and Mobile)
- ✅ Safari (iOS and macOS)
- ✅ Firefox (Desktop and Mobile)
- ✅ Samsung Internet
- ✅ Opera

## 🔧 Technologies

- HTML5
- CSS3 (Responsive design)
- JavaScript (Vanilla)
- Service Worker (PWA)
- Web Notifications API
- LocalStorage API

## 📝 File Structure

```
deadmanSwitch/
├── index.html          # Main page
├── styles.css          # Styles
├── app.js             # Application logic
├── manifest.json      # PWA manifest
├── service-worker.js  # Service Worker for caching
├── icon-192.png       # Icon 192x192
├── icon-512.png       # Icon 512x512
├── README.md          # This file
└── SETUP.md           # Setup instructions
```

## 🔒 Privacy

All data is stored locally on your device. No information is sent to external servers.

## 🎯 Use Cases

- Activity monitoring for remote work
- Personal "dead man's switch" system
- Periodic task reminders
- Presence control
- Regular activity logging
- Accountability tracking

## 🛠️ Customization

You can customize:
- Check-in interval (1 to 1440 minutes)
- Colors in `styles.css` file
- Texts and messages in `index.html` and `app.js`
- Icons (replace `icon-192.png` and `icon-512.png`)

## ⚠️ Important Notes

- Timer continues running even if you close the tab (data saved in LocalStorage)
- Notifications require browser permission
- To work offline, access the app online at least once
- History is limited to the 100 most recent entries
- Stop button creates a history entry and halts the timer
- Statistics calculate actual active time (max interval per check-in)

## 📊 Statistics Calculation Rules

- Each check-in counts for a maximum of the configured interval
- Early check-ins cut the previous interval to actual elapsed time
- Stop events count for a maximum of the interval from the previous check-in
- Time before the first check-in is not counted as active

## 📄 License

Free for personal and commercial use.
