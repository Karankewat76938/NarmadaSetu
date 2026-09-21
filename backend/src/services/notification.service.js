/**
 * Notification Service abstraction layer as per PRD Section 20
 * Allows seamless plugging of In-app, Email, SMS, WhatsApp notifications
 */

const notifyUser = async ({ recipientId, event, title, message, data = {} }) => {
  // In MVP, log structured notification event to server console
  console.log(`[Notification Dispatch] Event: ${event} -> Recipient: ${recipientId} | Title: "${title}" - Message: "${message}"`);
  return { success: true, deliveredAt: new Date() };
};

module.exports = {
  notifyUser
};

