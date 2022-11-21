import { useAuthContext } from 'contexts/AuthContext';
import React from 'react'
import { usePopupStore } from 'stores/usePopupStore';

export default function PasswordResetEmailInputPopup() {
  const { closePopup } = usePopupStore();
  const { sendPasswordResetEmail } = useAuthContext();
  const [email, setEmail] = React.useState('');

  const requestPasswordResetEmail = async () => {
    sendPasswordResetEmail(email);
    closePopup();
  }

  return (
    <React.Fragment>
      <div className='p-4 flex flex-col justify-around'>
        {/* input tag for email */}
        <input
          type="email"
          className="w-80 h-10 px-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:focus:ring-blue-800 mb-4"
          placeholder="이메일을 입력하세요"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={requestPasswordResetEmail}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >전송</button>
      </div>
    </React.Fragment>
  )
}
