import { useNavigate } from 'react-router-dom';

const GoogleCallback = ({ onLogin }) => {
    const navigate = useNavigate();
    console.log('xui');
    const handleBack = async () => {
        var url = new URL(window.location.href);
        var token = url.searchParams.get("token");
        localStorage.setItem('token', token);
        console.log('Login successful', token);
        await onLogin(token);
        navigate('/');
    };

    handleBack();
};

export default GoogleCallback;