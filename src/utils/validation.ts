const regexMap = {
  password: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=]).*$/, // 문자 + 숫자 + 특수문자 조합 8~15자리
}

const validateRegex = (regexKey: keyof typeof regexMap, src: string) => {
  return regexMap[regexKey].test(src);
}

export {
  validateRegex
};
