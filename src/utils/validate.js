export const validateNum = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('必填项不能为空'))
  }

  if (typeof value !== Number) {
    return callback(new Error('请传入数字类型'))
  }
  return value >= 5 && value <= 20
}
