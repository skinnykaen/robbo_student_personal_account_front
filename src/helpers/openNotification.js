export const openNotificationWithIcon = (type = 'warning', message = '', description = '', api) => {
    api[type]({
        message,
        description,
    })
}