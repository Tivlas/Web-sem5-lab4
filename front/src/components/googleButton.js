const handleLogin = () => {
    window.location.href = 'http://localhost:8000/auth/google';
};

function GoogleButton() {
    return <button onClick={handleLogin}>Log In with Google</button>;
}

export default GoogleButton;
