export const config = {
  openHour: 10,
  closeHour: 21,
  smsNumber: '',
  adminPin: '1234',
  rewardAt: 150,
  rewardText: 'a free add-on',
  comboOff: 5,
  prep: { base: 5, per: 2 },
}
export const promos = {
  WELCOME: { type: 'flat', value: 10, min: 50 },
  FRESH5: { type: 'pct', value: 5, min: 0 },
}
