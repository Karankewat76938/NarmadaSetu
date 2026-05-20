import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Mail, Lock, Phone, ArrowRight, User } from 'lucide-react';
import { google, github } from '../assets/Images';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const ROLES = [
  { id: 'tourist', labelEn: 'Tourist', labelHi: 'पर्यटक' },
  { id: 'rider', labelEn: 'Boat Rider', labelHi: 'नाव चालक' },
  { id: 'provider', labelEn: 'Service Provider', labelHi: 'सेवा प्रदाता' },
  { id: 'admin', labelEn: 'Admin', labelHi: 'व्यवस्थापक' }
];

const Auth = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [activeRole, setActiveRole] = useState('tourist');
  const [isHindi, setIsHindi] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'otp'
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errorAnimation, setErrorAnimation] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (isLoginView) {
      // Simple validation trigger
      if (loginMethod === 'email' && (!email || !password)) {
        triggerError();
        return;
      }
      if (loginMethod === 'otp' && !phone) {
        triggerError();
        return;
      }
      
      const loginIdentifier = loginMethod === 'email' ? email : `${phone.replace(/\s+/g, '')}@otp.com`;
      const loginSecret = loginMethod === 'email' ? password : 'otp_bypass_password';

      try {
        const result = await login(loginIdentifier, loginSecret, activeRole);
        if (result.success && result.user) {
          console.log(`Logging in as ${result.user.role}`);
          if (result.user.role === 'rider') navigate('/rider');
          else if (result.user.role === 'provider') navigate('/provider');
          else if (result.user.role === 'admin') navigate('/admin');
          else navigate('/dashboard');
        }
      } catch (err) {
        triggerError();
        setErrorMsg(err.message || 'Login failed');
      }
    } else {
      // Register Flow
      if (!name || !email || !password) {
        triggerError();
        setErrorMsg('All fields are required');
        return;
      }

      try {
        const result = await register(name, email, password, activeRole);
        if (result.success && result.user) {
          console.log(`Registered and logged in as ${result.user.role}`);
          if (result.user.role === 'rider') navigate('/rider');
          else if (result.user.role === 'provider') navigate('/provider');
          else if (result.user.role === 'admin') navigate('/admin');
          else navigate('/dashboard');
        }
      } catch (err) {
        triggerError();
        setErrorMsg(err.message || 'Registration failed');
      }
    }
  };

  const triggerError = () => {
    setErrorAnimation(true);
    setTimeout(() => setErrorAnimation(false), 500); // Remove class after animation completes
  };

  const t = (en, hi) => isHindi ? hi : en;

  return (
    <div className="auth-page-container">
      {/* Left Side: Illustration */}
      <div className="auth-illustration-side">
        <div className="auth-overlay"></div>
        <div className="auth-branding">
          <h2>Narmada Setu</h2>
          <p>{t('Your spiritual journey begins here.', 'आपकी आध्यात्मिक यात्रा यहाँ से शुरू होती है।')}</p>
        </div>
        <div className="auth-quote glass-dark">
          <p>
            "{t('The river is everywhere at once, at the source and at the mouth, at the waterfall, at the ferry, at the rapids, in the sea, in the mountains.', 'नदी एक ही समय में हर जगह है, उद्गम और मुहाने पर, झरने पर, नौका पर, घाटियों में, समुद्र में, पहाड़ों में।')}"
          </p>
        </div>
      </div>

      {/* Right Side: Interactive Form */}
      <div className="auth-form-side">
        <div className="auth-top-actions">
          <button className="lang-toggle-btn" onClick={() => setIsHindi(!isHindi)}>
            <Globe size={16} />
            {isHindi ? 'English' : 'हिंदी'}
          </button>
        </div>

        <div className="auth-form-wrapper">
          <div className="auth-header">
            <h1>{isLoginView ? t('Welcome Back', 'वापसी पर स्वागत है') : t('Create Account', 'खाता बनाएं')}</h1>
            <p>{isLoginView ? t('Please log in to your account.', 'कृपया अपने खाते में प्रवेश करें।') : t('Sign up to explore or host services.', 'सेवाओं को खोजने या होस्ट करने के लिए साइन अप करें।')}</p>
          </div>

          {/* Role Selection Tabs */}
          <div className="role-tabs">
            {ROLES.map(role => (
              <button 
                key={role.id}
                className={`role-tab ${activeRole === role.id ? 'active' : ''}`}
                onClick={() => setActiveRole(role.id)}
              >
                {t(role.labelEn, role.labelHi)}
              </button>
            ))}
          </div>

          {/* Social Login */}
          <div className="social-login-group">
            <button className="btn-social google">
              <img src={google} alt="Google" />
              {t('Google', 'गूगल')}
            </button>
            <button className="btn-social github">
              <img src={github} alt="Github" />
              {t('Github', 'गिटहब')}
            </button>
          </div>

          <div className="auth-divider">
            <span>{t('OR CONTINUE WITH', 'या इसके साथ जारी रखें')}</span>
          </div>

          {/* Login Method Toggle */}
          {isLoginView && (
            <div className="method-toggle">
              <button 
                className={loginMethod === 'email' ? 'active' : ''} 
                onClick={() => setLoginMethod('email')}
              >
                {t('Email', 'ईमेल')}
              </button>
              <button 
                className={loginMethod === 'otp' ? 'active' : ''} 
                onClick={() => setLoginMethod('otp')}
              >
                {t('Phone OTP', 'फ़ोन ओटीपी')}
              </button>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="auth-error-msg" style={{ 
              background: '#fee2e2', 
              color: '#dc2626', 
              padding: '0.75rem 1rem', 
              borderRadius: '8px', 
              fontSize: '0.9rem', 
              marginBottom: '1rem', 
              fontWeight: '500',
              textAlign: 'center',
              border: '1px solid #fca5a5'
            }}>
              {errorMsg}
            </div>
          )}

          {/* Main Form */}
          <form className={`auth-form ${errorAnimation ? 'form-shake' : ''}`} onSubmit={handleSubmit}>
            
            {!isLoginView && (
              <div className="input-group">
                <label>{t('Full Name', 'पूरा नाम')}</label>
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder={t('Enter your full name', 'अपना पूरा नाम दर्ज करें')} 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            {isLoginView && loginMethod === 'otp' ? (
              <div className="input-group">
                <label>{t('Phone Number', 'फ़ोन नंबर')}</label>
                <div className="input-with-icon">
                  <Phone size={18} className="input-icon" />
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                {phone && (
                  <button type="button" className="btn-send-otp mt-2">
                    {t('Send OTP', 'ओटीपी भेजें')}
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="input-group">
                  <label>{t('Email Address', 'ईमेल पता')}</label>
                  <div className="input-with-icon">
                    <Mail size={18} className="input-icon" />
                    <input 
                      type="email" 
                      placeholder="name@example.com" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="input-group">
                  <div className="label-row">
                    <label>{t('Password', 'पासवर्ड')}</label>
                    {isLoginView && <a href="#" className="forgot-link">{t('Forgot password?', 'पासवर्ड भूल गए?')}</a>}
                  </div>
                  <div className="input-with-icon">
                    <Lock size={18} className="input-icon" />
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            <button type="submit" className="btn-primary btn-login">
              {isLoginView ? t('Log in', 'लॉग इन करें') : t('Sign Up', 'साइन अप करें')} <ArrowRight size={18} />
            </button>
          </form>

          <p className="signup-prompt">
            {isLoginView ? (
              <>
                {t('Don\'t have an account?', 'खाता नहीं है?')} <a href="#" onClick={(e) => { e.preventDefault(); setIsLoginView(false); setErrorMsg(''); }}>{t('Sign up for free', 'मुफ्त में साइन अप करें')}</a>
              </>
            ) : (
              <>
                {t('Already have an account?', 'पहले से ही खाता है?')} <a href="#" onClick={(e) => { e.preventDefault(); setIsLoginView(true); setErrorMsg(''); }}>{t('Log in here', 'यहाँ लॉग इन करें')}</a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
