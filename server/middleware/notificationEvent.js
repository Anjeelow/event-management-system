import { query } from "../db-service.js";

export const checkForUpdates = async () => {
  try {
    const updatedEventsResult = await query(
      "SELECT * FROM event WHERE updated_at > NOW() - INTERVAL 1 MINUTE"
    );
    const updatedEvents = Array.isArray(updatedEventsResult)
      ? updatedEventsResult
      : [updatedEventsResult];

    const upcomingEventsResult = await query(
      "SELECT * FROM event WHERE start_time BETWEEN NOW() AND NOW() + INTERVAL 1 DAY"
    );
    const upcomingEvents = Array.isArray(upcomingEventsResult)
      ? upcomingEventsResult
      : [upcomingEventsResult];

    for (const event of updatedEvents) {
      const rsvpResult = await query(
        "SELECT user_id FROM rsvp WHERE event_id = ?",
        [event.event_id]
      );
      const users = Array.isArray(rsvpResult) ? rsvpResult : [rsvpResult];

      for (const user of users) {
        await query(
          "INSERT INTO notification (user_id, event_id, notification_type, message, status, sent_at) VALUES (?, ?, ?, ?, ?, NOW())",
          [
            user.user_id,
            event.event_id,
            "event_update",
            `The event "${event.title}" has been updated.`,
            "unread",
          ]
        );
      }
    }

    for (const event of upcomingEvents) {
      const rsvpResult = await query(
        "SELECT user_id FROM rsvp WHERE event_id = ?",
        [event.event_id]
      );
      const users = Array.isArray(rsvpResult) ? rsvpResult : [rsvpResult];

      for (const user of users) {
        await query(
          "INSERT INTO notification (user_id, event_id, notification_type, message, status, sent_at) VALUES (?, ?, ?, ?, ?, NOW())",
          [
            user.user_id,
            event.event_id,
            "event_reminder",
            `Reminder: The event "${event.title}" is starting tomorrow!`,
            "unread",
          ]
        );
      }
    }
  } catch (err) {
    console.error("Error while checking for updates:", err);
  }
};
