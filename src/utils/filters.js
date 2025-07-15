import Vue from "vue";
import moment from "moment";

Vue.filter('initials', (name) => {
    return name.split(" ").map((n)=>n[0]).join(".");
})

Vue.filter('serviceType', (value) => {
    return value.split("_").map(v => capitalizeFirstLetter(v)).join(" ");
})

Vue.filter('toCurrencyFormat', (value) => {
    return process.env.VUE_APP_CURRENCY + " " + (Math.round(value * 100) / 100).toFixed(2);
})

Vue.filter('to2DecimalPlace', (value) => {
    return (Math.round(value * 100) / 100).toFixed(2);
})

Vue.filter('capitalizeFirstLetter', (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
})

Vue.filter('to4DigitsLeadingZeros', (num, size = 4) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

Vue.filter('toFormattedDateTime', (value) => {
    return moment(value).format('MMMM Do YYYY h:mm a');
})

Vue.filter('toHumanDayMonthYear', (value) => {
    return moment(value).format('D MMMM YYYY ');
})

Vue.filter('toFormattedDate', (value) => {
    return moment(value).format('YYYY-MM-DD');
})

Vue.filter('toHumanDate', function (value) {
    if (!value) return '';

    const date = new Date(value);
    const now = new Date();

    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        if (days === 1) {
            return 'posted 1 day ago';
        } else if (days < 7) {
            return `posted ${days} days ago`;
        } else if (days < 30) {
            const weeks = Math.floor(days / 7);
            return `posted ${weeks} week${weeks > 1 ? 's' : ''} ago`;
        } else if (days < 365) {
            const months = Math.floor(days / 30);
            return `posted ${months} month${months > 1 ? 's' : ''} ago`;
        } else {
            const options = { month: 'short', day: 'numeric' };
            return `posted on ${date.toLocaleDateString('en-US', options)}`;
        }
    } else if (hours > 0) {
        return `posted ${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `posted ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return 'posted just now';
    }
});
