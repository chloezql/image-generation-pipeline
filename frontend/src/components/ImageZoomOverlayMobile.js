import React, { useState } from 'react';

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 2000,
    background: 'black',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
};

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100vh',
    paddingTop: '20px',
};

const imageBoxStyle = {
    width: '100%',
    height: '70vh',
    minHeight: '400px',
    background: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    perspective: '1800px',
    marginBottom: '20px',
    padding: '0 10px',
};

const infoPanelStyle = {
    width: '100%',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 16px',
    flex: 0,
};

const timelineStyle = {
    position: 'relative',
    marginTop: 12,
    marginLeft: 16,
    marginBottom: 12,
    borderLeft: '1px solid #FFF',
    height: 'auto',
    maxHeight: '200px',
    overflowY: 'auto',
    color: '#00000050',
    paddingLeft: 12,
    fontFamily: 'sans-serif',
    fontSize: 12,
};

const selectedDateStyle = {
    background: '#72da58',
    color: '#000',
    padding: '3px 10px',
    borderRadius: 6,
    fontWeight: 500,
    fontSize: '1rem',
    marginBottom: 12,
    display: 'inline-block',
};

const simpleButtonStyle = {
    margin: '8px 0',
    padding: '3px 10px',
    background: 'none',
    border: '1px solid #444',
    borderRadius: 4,
    color: '#bababa',
    fontSize: '11px',
    fontFamily: 'inherit',
    cursor: 'pointer',
    display: 'block',
    outline: 'none',
    textAlign: 'left',
    width: 110,
};

const roundIndicatorStyle = {
    position: 'relative',
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'white',
    outline: '2px solid #444',
    display: 'inline-block',
    flexShrink: 0,
};

const userNameStyle = {
    color: 'white',
    fontSize: 20,
    fontWeight: 500,
    marginLeft: 12,
    marginTop: 4,
    display: 'flex',
    alignItems: 'center',
};

const actionBtnBoxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    bottom: 'auto',
    right: 'auto',
    marginTop: 12,
    gap: 16,
    width: '100%',
};

const actionBtnStyle = {
    border: '1px solid #72da58',
    color: '#72da58',
    background: 'none',
    borderRadius: 8,
    padding: 5,
    width: 28,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    cursor: 'pointer',
};

const flipContainerStyle = (flipped) => ({
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s cubic-bezier(0.4,1,0.6,1)',
    transformStyle: 'preserve-3d',
    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
    position: 'relative',
});

const flipFrontStyle = {
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'none',
    padding: '10px',
    boxSizing: 'border-box',
};

const flipBackStyle = {
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    background: 'rgba(0,0,0,0.96)',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'rotateY(180deg)',
    overflowY: 'auto',
    padding: '15px 10px',
    boxSizing: 'border-box',
};

const promptVertContainer = {
    background: 'rgba(12, 18, 7, 0.97)',
    // borderRadius: 14,
    boxShadow: '0 8px 50px #072c12aa',
    // padding: '16px 14px',
    width: '95%',
    maxWidth: '500px',
    height: 'auto',
    // maxHeight: '85%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: '#fff',
    boxSizing: 'border-box',
    overflowY: 'auto',
};

const italicStyle = { fontStyle: 'italic', color: '#b0b3b8', marginLeft: 4 };
const divider = { width: '100%', height: 1, background: '#73cd5a', border: 'none', margin: '10px 0 8px 0' };
const colorDot = (c) => ({ display: 'inline-block', width: 22, height: 22, borderRadius: '50%', background: c, marginRight: 6, boxShadow: '1px 1px 7px #202a' });

// Share popup styles (same as desktop)
const sharePopupOverlay = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3000,
};

const sharePopupContainer = {
    background: '#2a2a2add',
    borderRadius: 16,
    padding: '24px 20px',
    minWidth: '90vw',
    maxWidth: '90vw',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
};

const sharePopupTitle = {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 500,
    marginBottom: '24px',
    fontFamily: 'sans-serif',
};

const socialIconsContainer = {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
};

const socialIcon = {
    width: 48,
    height: 48,
    borderRadius: '50%',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s',
};

const separatorText = {
    color: 'white',
    fontSize: '0.9rem',
    textAlign: 'center',
    marginBottom: '16px',
    fontFamily: 'sans-serif',
};

const linkInputContainer = {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexDirection: 'column',
};

const linkInput = {
    width: '100%',
    background: '#1a1a1a',
    border: 'none',
    borderRadius: 8,
    padding: '12px 16px',
    color: '#bbb',
    fontSize: '0.9rem',
    fontFamily: 'sans-serif',
    textDecoration: 'underline',
};

const copyButton = {
    background: 'transparent',
    border: '1px solid #72da58',
    borderRadius: 8,
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#72da58',
    fontSize: '1.2rem',
};

export default function ImageZoomOverlayMobile({ imageUrl, onClose }) {
    const [flipped, setFlipped] = useState(false);
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);

    const stopPropagation = (e) => e.stopPropagation();

    const handleShareClick = (e) => {
        e.stopPropagation();
        setShowSharePopup(true);
    };

    const handleSlackClick = (e) => {
        e.stopPropagation();
        alert('Image shared via slack successfully');
        setShowSharePopup(false);
    };

    const handleCopyLink = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText('https://heykura.com/landing-page/235').then(() => {
            setLinkCopied(true);
            setTimeout(() => {
                setLinkCopied(false);
            }, 2000);
        });
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={containerStyle} onClick={stopPropagation}>
                <div style={imageBoxStyle} onClick={() => setFlipped((f) => !f)}>
                    <div style={flipContainerStyle(flipped)}>
                        {/* Front side: image */}
                        <div style={flipFrontStyle}>
                            <img src={imageUrl} alt="Zoomed" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        </div>
                        {/* Back side: placeholder */}
                        <div style={flipBackStyle}>
                            <div style={promptVertContainer}>
                                <div style={{ width: '100%', background: '#82CD591A', padding: '12px 16px', fontSize: '0.9rem', color: '#fff', fontWeight: 400, borderRadius: 8, marginBottom: 14, lineHeight: 1.3 }}>
                                    This is the content the content the content the content the content the content. This is the content the the...
                                </div>
                                {/* Brand */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '0.85rem', marginBottom: 6, flexWrap: 'wrap' }}>
                                    My company / brand is <span style={italicStyle}>Reno</span>
                                    <span style={{ marginLeft: 8, fontSize: 24, display: 'flex', alignItems: 'center' }}>&#9900;</span>
                                </div>
                                <hr style={divider} />
                                {/* Visuals */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '0.85rem', marginBottom: 6, position: 'relative', flexWrap: 'wrap' }}>
                                    We have / like <span style={italicStyle}>[those visuals]</span>
                                    <img alt="1" src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=200&q=60" style={{ width: 50, borderRadius: 4, position: 'absolute', right: 60, top: -10, boxShadow: '1.5px 2.4px 14px #213', transform: 'rotate(-7deg)' }} />
                                    <img alt="2" src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=200&q=40" style={{ width: 48, borderRadius: 4, position: 'absolute', right: 5, top: 15, boxShadow: '1.5px 2.4px 14px #213', transform: 'rotate(11deg)' }} />
                                </div>
                                <hr style={divider} />
                                {/* Needs */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '0.85rem', marginBottom: 6, position: 'relative', flexWrap: 'wrap' }}>
                                    We need <span style={italicStyle}>[landing pages ideas]</span>
                                    <img alt="n" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=110&q=22" style={{ width: 45, borderRadius: 5, position: 'absolute', right: 5, top: -10, boxShadow: '2px 2px 16px #202', transform: 'rotate(7deg)' }} />
                                </div>
                                <hr style={divider} />
                                {/* Typography */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '0.85rem', marginBottom: 6, flexWrap: 'wrap' }}>
                                    with typography style <span style={{ marginLeft: 6, padding: '1px 8px', background: '#132917', borderRadius: 3, letterSpacing: '1px', fontWeight: 600, fontSize: 14, color: '#e6e6e6' }}>A A A</span>
                                </div>
                                <hr style={divider} />
                                {/* Colors */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '0.85rem', marginBottom: 6, flexWrap: 'wrap' }}>
                                    and colors
                                    <span style={{ display: 'flex', gap: 6, marginLeft: 12 }}>
                                        <span style={colorDot('#f05418')} />
                                        <span style={colorDot('#e55335')} />
                                        <span style={colorDot('#143b28')} />
                                        <span style={colorDot('#233f5e')} />
                                        <span style={{ display: 'inline', fontSize: 18, padding: '0 4px', color: '#b6d1a0' }}>+</span>
                                    </span>
                                </div>
                                <hr style={divider} />
                                {/* Aesthetic */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '0.85rem', marginBottom: 6, position: 'relative', flexWrap: 'wrap' }}>
                                    the aesthetic we prefer is <span style={italicStyle}>[clean and modern]</span>
                                    <img alt="aes" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=200&q=20" style={{ width: 65, borderRadius: 5, position: 'absolute', right: 5, top: -10, boxShadow: '2px 2px 12px #202', transform: 'rotate(-8deg)' }} />
                                </div>
                                <hr style={divider} />
                                {/* Outcome */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '0.85rem', marginBottom: 8, flexWrap: 'wrap' }}>
                                    to achieve <span style={italicStyle}>[desired outcome]</span>
                                </div>
                                {/* Labels row */}
                                <div style={{ width: '100%', display: 'flex', gap: 8, margin: '16px 0 0 0', justifyContent: 'flex-start', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                                    {["Label 1", "Label Label 1", "Label 2"].map((text, idx) => (
                                        <span key={idx} style={{
                                            padding: '4px 12px',
                                            fontStyle: 'italic',
                                            color: 'white',
                                            fontSize: '0.8rem',
                                            background: 'linear-gradient(90deg, #C8F0FF22 0%, #8D769522 100%)',
                                            borderBottom: '1px solid #82CD59',
                                            filter: 'blur(0px)',
                                            backdropFilter: 'blur(6.8px)',
                                            WebkitBackdropFilter: 'blur(6.8px)',
                                            lineHeight: 1.1,
                                        }}>{text}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={infoPanelStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                        <div style={roundIndicatorStyle} />
                        <span style={userNameStyle}>Name 111</span>
                    </div>
                    <div style={timelineStyle}>
                        <button style={{ ...simpleButtonStyle, fontStyle: 'italic', width: 60 }}>More</button>
                        <button style={simpleButtonStyle}>Oct 20 2025</button>
                        <button style={simpleButtonStyle}>Oct 21 2025</button>
                        <div style={selectedDateStyle}>Oct 22 2025, 12:34pm</div>
                        <button style={simpleButtonStyle}>Oct 23 2025</button>
                        <button style={simpleButtonStyle}>Oct 23 2025</button>
                    </div>
                    <div style={actionBtnBoxStyle}>
                        <button style={actionBtnStyle} title="Bookmark">🔖</button>
                        <button style={actionBtnStyle} title="Share" onClick={handleShareClick}>↗</button>
                        <button style={actionBtnStyle} title="Download">⦾</button>
                    </div>
                </div>
            </div>
            {showSharePopup && (
                <div style={sharePopupOverlay} onClick={() => setShowSharePopup(false)}>
                    <div style={sharePopupContainer} onClick={stopPropagation}>
                        <h3 style={sharePopupTitle}>Share the prompt</h3>
                        <div style={socialIconsContainer}>
                            <div style={socialIcon} title="Google">
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            </div>
                            <div style={socialIcon} title="Slack" onClick={handleSlackClick}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52z" />
                                    <path fill="#E01E5A" d="M6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" />
                                    <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834z" />
                                    <path fill="#36C5F0" d="M8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" />
                                    <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834z" />
                                    <path fill="#2EB67D" d="M17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" />
                                    <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52z" />
                                    <path fill="#ECB22E" d="M15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
                                </svg>
                            </div>
                            <div style={socialIcon} title="Facebook">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </div>
                            <div style={socialIcon} title="Instagram">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <linearGradient id="ig-gradient-mobile" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#f09433" />
                                        <stop offset="25%" stopColor="#e6683c" />
                                        <stop offset="50%" stopColor="#dc2743" />
                                        <stop offset="75%" stopColor="#cc2366" />
                                        <stop offset="100%" stopColor="#bc1888" />
                                    </linearGradient>
                                    <path fill="url(#ig-gradient-mobile)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </div>
                        </div>
                        <p style={separatorText}>Or copy the link</p>
                        <div style={linkInputContainer}>
                            <input type="text" value="https://heykura.com/landing-page/235" readOnly style={linkInput} />
                            <button style={copyButton} onClick={handleCopyLink} title={linkCopied ? "Copied!" : "Copy link"}>
                                {linkCopied ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

