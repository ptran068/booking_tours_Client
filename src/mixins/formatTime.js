import moment from 'moment';

export default {
  methods: {
    $showTime(time) {
      return moment(time).format('YYYY-MM-DD h:mm A');
    }
  }
}
