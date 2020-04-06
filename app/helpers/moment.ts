import moment from 'moment';

import i18n from '@app/i18n';

moment.updateLocale('en', {
  relativeTime: {
    past: function(input) {
      return input === 'just now' ? input : input + i18n.t('moment:ago');
    },
    s: i18n.t('moment:s'),
    future: i18n.t('moment:future'),
    ss: i18n.t('moment:ss'),
    m: i18n.t('moment:m'),
    mm: i18n.t('moment:mm'),
    h: i18n.t('moment:h'),
    hh: i18n.t('moment:hh'),
    d: i18n.t('moment:d'),
    dd: i18n.t('moment:dd'),
    M: i18n.t('moment:M'),
    MM: i18n.t('moment:MM'),
    y: i18n.t('moment:y'),
    yy: i18n.t('moment:yy'),
  },
});

export default moment;
