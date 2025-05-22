import { signIn } from "next-auth/react";

export default function Login(){
    return(
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Job Tracker Login</h1>
      <button 
        onClick={() => signIn('github')}
        style={{
          padding: '0.75rem 1.5rem',
          background: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Sign in with GitHub
      </button>
    </div>
    )
}