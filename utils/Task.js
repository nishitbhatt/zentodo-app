export const DuedateColorMap = {
    'dued': 'red',
    'today': 'blue',
    'future': 'blue-grey'
}

export const getDateTypeColor = (taskdate = "") => {

    if (taskdate) {

        const [, month, day] = taskdate.toDateString().split(' ')

        const taskDateTime = taskdate.getTime()
        const todayDateTime = new Date().getTime()
        let type = 'today';

        if (taskDateTime > todayDateTime) {
            type = 'future'
        }
        if (taskDateTime < todayDateTime) {
            if (taskdate.toDateString() === new Date().toDateString()) {
                type = 'today'
            } else {
                type = 'dued'
            }
        }
        return [`${month} ${day}`, DuedateColorMap[type]]
    }
}