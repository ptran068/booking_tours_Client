export default {
  data() {
    return {
      rules: {
        required: v => (!!v && !!v.toString().trim()) || v === '0' || v === 0 || 'Bắt buộc',
        email: v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
          || 'Sai định dạng email!!',
        phone: v => !v || (/^[+\d]?(?:[\d-\s]*)$/.test(v) && v.indexOf('--') === -1 && v.indexOf('  ') === -1) || 'Sai định dạng số điện thoại',
        integer: v => !v || /^\d+$/.test(v) || 'Nhập số!!',
      }
    }
  }
}
