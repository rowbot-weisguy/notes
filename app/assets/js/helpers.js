let helpers = {
    formatDate: function(d) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ];

        return {
            year: d.getFullYear(),
            month: monthNames[d.getMonth()],
            date: d.getDate(),
            hours: d.getHours(),
            minutes: d.getMinutes()
        };
    },
    pluralize: function (count, word) {
        return count === 1 ? word : word + 's';
    }
}

export default helpers;
