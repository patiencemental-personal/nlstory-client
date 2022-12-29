import { useAuthContext } from 'contexts/AuthContext'
import React from 'react'

export default function ProfilePage() {
  const { user } = useAuthContext();
  return (
    <div>
      <p>ProfilePage</p>
      <p>{JSON.stringify(user)}</p>
    </div>
  )
}
