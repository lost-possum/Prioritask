// // Prioritask - Version 0.1 (alpha)

// Viihna Leraine - viihna@voidfucker.com // viihna.78 (Signal)

// License - GNU GPLv3 

// Please refer to app.js for further comments about this project.

self.addEventListener('install', function(e) {
    console.log('Service Worker installing.');
});

self.addEventListener('activate', function(e) {
    console.log('Service Worker activating.');
});

self.addEventListener('notificationclick', function(e) {
    e.notification.close();
    e.waitUntil(
        clients.openWindow('https://sharkswithswords.com/desktop/html/prioritask/app.html')
    );
});

if ('Notification' in window && navigator.serviceWorker) {
    Notification.requestPermission(function(status) {
        console.log('Notification permission status:', status);
    });
}

function showNotification(title, options) {
    navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification(title, options);
    });
}

function scheduleNotification(task) {
    const options = {
        body: `Task "${task.description}" is due on ${task.dueDate}.`,
//      icon: 'icon.png', // Path to an icon for the notification
//      badge: 'badge.png', // Path to a badge image for the notification
        data: {
            url: 'https://sharkswithswords.com/desktop/html/prioritask/app.html' // Change to your website URL
        }
    };

    // Example: Show the notification after 10 seconds
    setTimeout(function() {
        showNotification('Task Reminder', options);
    }, 10000);
}

const task = {
    description: 'Complete the project',
    dueDate: '2024-07-10'
};
scheduleNotification(task);
