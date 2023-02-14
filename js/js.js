const {google} = require('googleapis');
key = 'AIzaSyAmYZV_QUM0sqz2HS_Q8LI477LJxd_JgYU'
async function addReminder(event, startDateTime, endDateTime) {
    const calendar = google.calendar({version: 'v3', key});
    return new Promise((resolve, reject) => {
        calendar.events.insert({
            calendarId: 'primary',
            resource: {
                summary: event,
                start: {
                    dateTime: startDateTime,
                    timeZone: 'America/Los_Angeles',
                },
                end: {
                    dateTime: endDateTime,
                    timeZone: 'America/Los_Angeles',
                },
                reminders: {
                    useDefault: false,
                    overrides: [
                        {method: 'email', minutes: 24 * 60},
                        {method: 'popup', minutes: 10},
                    ],
                },
            },
        }, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res.data);
        });
    });
}