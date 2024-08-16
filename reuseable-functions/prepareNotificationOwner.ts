function prepareNotificationOwner(log: any, loggedUser: any) {
    const sameAccountCommenterOwner = loggedUser?.Id === log?.sender?.id;
    let result = null;
    let actionOwner = null;
    let action = null;
    let user = null;

    if (log?.type === "TasksComment") {
        user = sameAccountCommenterOwner ? " تعليق من حضرتكم " :
            "تعليق من " + log?.sender?.fullName

        actionOwner = ""

        action = log?.message;

        result = actionOwner + " " + user + ": " + action;
    }
    else if (log.type === "Tasks") {

        user = sameAccountCommenterOwner ? " أنت " :
            log?.sender?.fullName

        actionOwner = sameAccountCommenterOwner ? "" : "قام "

        action = sameAccountCommenterOwner ? " قمت " + log?.message : log?.message;

        result = actionOwner + " " + user + " " + action;
    }
    else if (log?.type === "TraineeAbsenceAlibiComment") {

        user = sameAccountCommenterOwner ? " تعليق من حضرتكم " :
            "تعليق من " + log?.sender?.fullName

        actionOwner = ""

        action = log?.message;

        result = actionOwner + " " + user + ": " + action;
    }
    else if (log.type === "FileDownloaded") {
        user = log?.sender?.fullName
        actionOwner = ""
        action = "تم تزيل الملف من قِبل ";
        result = action + user;
    }
    else if (log?.type === "FileTransfered") {

        user = log?.sender?.fullName;
        actionOwner =  "تم إرسال ملف إليك من قِبل"
        action = log?.message;
        result = actionOwner + " " + user;
    }

    return result
}

export { prepareNotificationOwner }