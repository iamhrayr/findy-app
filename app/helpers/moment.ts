import moment from 'moment';

moment.updateLocale('en', {
  relativeTime: {
    past: function(input) {
      return input === 'just now' ? input : input + ' ago';
    },
    s: 'just now',
    future: 'in %s',
    ss: '%d seconds',
    m: 'a min',
    mm: '%d mins',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  },
});

export default moment;
