import { useState, useRef } from 'react';
import { validateRegex } from 'utils/validation';

const systemRuleDefaultMessageMap = {
  require: '반드시 필요한 값 입니다',
  password: '문자와 숫자, 특수 문자 조합 8~15 자리를 입력해주세요.',
}

type SystemRule = 'require' | 'password';

/**
 * example
 * {
 *   rule: 'require',
 *   message: '반드시 필요한 값 입니다'
 * }
 */
type Rule = {
  rule: SystemRule;
  message: string;
}

/**
 * example
 * { 
 *   custom: true, 
 *   message: '5 이하 값만 허용됩니다'
 *   validate: (value) => {
 *     if (value > 5) return false;
 *     return true;
 *   },
 * }
 */
type CustomRule = {
  custom: boolean;
  message: string;
  validate: (value: string) => boolean;
}

type ValidRule = SystemRule | Rule | CustomRule;

type Option = {
  validRules: ValidRule[];
  // onChange 함수 호출 시 마다 실행됨. 현재 인풋의 value를 입력 받고 변환된 값을 리턴
  convert?: (value: string) => string;
}

export default function useInputRef(option: null | Option) {
  const reference: any = useRef(null);
  const get = () => reference.current.value;                         // getter
  const set = (newValue: any) => reference.current.value = newValue; // setter
  const [message, setMessage] = useState(''); // set the message when the value of reference is invalid


  /**
   * input, textarea DOM의 값이 유효한지 체크
   */
  const validate = () => {
    const value = reference.current.value
    let valid = true;
    let message: string = '';
    const setUnvalid = (unvalidMessage: string) => {
      valid = false;
      message = unvalidMessage;
      setMessage(unvalidMessage);
    }

    /**
     * 값이 validRules에 정의된 rules에 대해 유효한지 검사
     * 유효하지 않은 rule에 필터링 되는 즉시 반복문 종료하고 message 세팅
     */
    option?.validRules?.some((ruleItem: any) => {
      if (typeof ruleItem === 'string') {
        if (ruleItem === 'require' && ['', null, undefined].includes(value)) {
          setUnvalid(systemRuleDefaultMessageMap['require']);
          return true;
        } else if (ruleItem === 'password' && !validateRegex('password', value)) {
          setUnvalid(systemRuleDefaultMessageMap['password']);
          return true;
        }
      } else if (ruleItem.custom) {
        /**
         * @TODO rule이 커스텀인 경우 미구현 - 필요할 때 구현하기
         */
      } else {
        if (ruleItem.rule === 'require') {
          if (['', null, undefined].includes(value)) {
            setUnvalid(ruleItem.message);
            return true;
          }
        } else if (ruleItem.rule === 'password') {
          if (!validateRegex('password', value)) {
            setUnvalid(ruleItem.message);
            return true;
          }
        }
      }

      return false;
    });

    
    if (valid) setMessage(''); // valid 하다면 message를 빈값으로 초기화
    return { valid, message };
  }


  /**
   * input, textarea DOM의 onChange 이벤트에 연결하여 사용
   * convert 함수가 존재하는 경우, convert 함수에 의해 변환된 값을 DOM에 적용
   */
  const onChange = (event: React.BaseSyntheticEvent) => {
    if (option?.convert) {
      const converted = option.convert(event.currentTarget.value)
      event.currentTarget.value = converted;
    }
  }


  return {
    reference, get, set,
    onChange, validate,
    message, setMessage,
  }
}