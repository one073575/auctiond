export async function newNotification(Notification, data) {
    const notification = new Notification({
        ...data,
    })
    const savedNotification = await notification.save()
    return savedNotification
}
