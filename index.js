module.exports = class DS1307 {
  constructor(bus, addr = 0x68) {
    this.bus = bus;
    this.addr = addr;
  }

  _dec2bcd(v) {
    return Math.floor(v / 10) << 4 | (v % 10);
  }

  _bcd2dec(v) {
    return ((v >> 4) * 10) + (v & 0x0F);
  }

  setDate(date) {
    if (!(date instanceof Date) || isNaN(date.getMonth())) {
      console.log('date argument should be a valid Date instance.')
    } else {
      this.bus.write(new Uint8Array([
        0x00,
        0x80,
        this._dec2bcd(date.getMinutes()),
        this._dec2bcd(date.getHours()),
        this._dec2bcd(date.getDay()),
        this._dec2bcd(date.getDate()),
        this._dec2bcd(date.getMonth() + 1),
        this._dec2bcd(date.getFullYear() - 2000),
      ]), this.addr);

      this.bus.write(new Uint8Array([
        0x00,
        this._dec2bcd(date.getSeconds()),
      ]), this.addr)
    }
  }

  getDate() {
    const data = this.bus.memRead(7, this.addr, 0x00);
    const year = this._bcd2dec(data[6]) + 2000;
    const month = ('0' + this._bcd2dec(data[5])).slice(-2);
    const day = ('0' + this._bcd2dec(data[4])).slice(-2);
    const hours = ('0' + this._bcd2dec(data[2])).slice(-2);
    const minutes = ('0' + this._bcd2dec(data[1])).slice(-2);
    const seconds = ('0' + this._bcd2dec(data[0] & 0x7F)).slice(-2);

    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`);
  }
}