import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const notificationService = {
  // Request notification permissions
  async requestPermissions() {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  },

  // Schedule hourly reminders
  async scheduleHourlyReminders() {
    try {
      // Cancel existing hourly notifications
      await this.cancelHourlyReminders();

      // Schedule reminders for each hour (6 AM to 10 PM)
      for (let hour = 6; hour <= 22; hour++) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: '💧 Time to Hydrate!',
            body: "Don't forget to drink some water!",
            sound: 'default',
            badge: 1,
          },
          trigger: {
            hour,
            minute: 0,
            repeats: true,
          },
        });
      }
      console.log('Hourly reminders scheduled');
    } catch (error) {
      console.error('Error scheduling hourly reminders:', error);
    }
  },

  // Schedule custom time reminders
  async scheduleCustomReminders(customTimes) {
    try {
      // Cancel existing custom notifications
      await this.cancelCustomReminders();

      // Schedule reminders for each custom time
      customTimes.forEach((time) => {
        const [hour, minute] = time.split(':').map(Number);
        Notifications.scheduleNotificationAsync({
          content: {
            title: '💧 Water Reminder',
            body: 'Time to drink some water!',
            sound: 'default',
            badge: 1,
          },
          trigger: {
            hour,
            minute,
            repeats: true,
          },
        });
      });
      console.log('Custom reminders scheduled');
    } catch (error) {
      console.error('Error scheduling custom reminders:', error);
    }
  },

  // Cancel hourly reminders
  async cancelHourlyReminders() {
    try {
      const notifications = await Notifications.getAllScheduledNotificationsAsync();
      const hourlyIds = notifications
        .filter((n) => n.content.title === '💧 Time to Hydrate!')
        .map((n) => n.identifier);
      
      for (const id of hourlyIds) {
        await Notifications.cancelScheduledNotificationAsync(id);
      }
    } catch (error) {
      console.error('Error canceling hourly reminders:', error);
    }
  },

  // Cancel custom reminders
  async cancelCustomReminders() {
    try {
      const notifications = await Notifications.getAllScheduledNotificationsAsync();
      const customIds = notifications
        .filter((n) => n.content.title === '💧 Water Reminder')
        .map((n) => n.identifier);
      
      for (const id of customIds) {
        await Notifications.cancelScheduledNotificationAsync(id);
      }
    } catch (error) {
      console.error('Error canceling custom reminders:', error);
    }
  },

  // Send immediate notification
  async sendImmediateNotification(title, body) {
    try {
      await Notifications.presentNotificationAsync({
        title,
        body,
        sound: 'default',
        badge: 1,
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  },
};
