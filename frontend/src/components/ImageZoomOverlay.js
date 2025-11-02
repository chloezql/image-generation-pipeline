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
    justifyContent: 'center',
    alignItems: 'center',
};

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '80vh',
    width: '80vw',
    position: 'relative',
};

// FRONT OF IMAGE: Just image, no container shadow/border, image centered
const imageBoxStyle = {
    width: '56vw', // allow big image but soft boundaries
    height: '80vh',
    background: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    perspective: '1800px',
    boxShadow: 'none',
    borderRadius: 0,
    marginRight: '3vw',
};

const infoPanelStyle = {
    width: '22vw',
    minWidth: 260,
    height: '74vh',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
};

const timelineStyle = {
    position: 'relative',
    marginTop: 32,
    marginLeft: 24,
    marginBottom: 32,
    borderLeft: '1px solid #FFF',
    height: '420px',
    color: '##00000050',
    paddingLeft: 20,
    fontFamily: 'sans-serif',
    fontSize: 14,
};

const selectedDateStyle = {
    background: '#72da58',
    color: '#000',
    padding: '4px 12px',
    borderRadius: 6,
    fontWeight: 500,
    fontSize: '1.2rem',
    marginBottom: 16,
    display: 'inline-block',
};

const simpleButtonStyle = {
    margin: '12px 0',
    padding: '3px 14px',
    background: 'none',
    border: '1px solid #444',
    borderRadius: 4,
    color: '#bababa',
    fontSize: '13px',
    fontFamily: 'inherit',
    cursor: 'pointer',
    display: 'block',
    outline: 'none',
    textAlign: 'left',
    width: 124,
};

const roundIndicatorStyle = {
    position: 'relative',
    width: 50,
    height: 50,
    borderRadius: '50%',
    background: 'white',
    // border: '4px solid #fff',
    outline: '2px solid #444',
    display: 'inline-block',
};

const userNameStyle = {
    color: 'white',
    fontSize: 28,
    fontWeight: 500,
    marginLeft: 52,
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
};

const actionBtnBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    bottom: 24,
    right: 32,
    gap: 18,
};

const actionBtnStyle = {
    border: '1px solid #72da58',
    color: '#72da58',
    background: 'none',
    borderRadius: 8,
    padding: 6,
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    cursor: 'pointer',
};

// Flip card animation
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
};

// Updated to fix backside to 717 x 915 (or similar ratio), center, and keep margins
const promptVertContainer = {
    background: 'rgba(12, 18, 7, 0.97)',
    borderRadius: 14,
    boxShadow: '0 8px 50px #072c12aa',
    padding: '36px 32px',
    minWidth: 310,
    width: 717,
    maxWidth: '90vw',
    minHeight: 500,
    height: 915,
    maxHeight: '91vh',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: '#fff',
    boxSizing: 'border-box',
    overflowY: 'auto',
};
const promptLine = {
    width: '100%',
    fontSize: 20,
    fontFamily: 'inherit',
    margin: '0 0 20px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'relative',
};
const formLabel = { marginBottom: 2 };
// Update: italic should be a gray, same for all prompt answers
const italicStyle = { fontStyle: 'italic', color: '#b0b3b8', marginLeft: 6 };
const divider = { width: '100%', height: 1, background: '#73cd5a', border: 'none', margin: '14px 0 10px 0' };
const colorDot = (c) => ({ display: 'inline-block', width: 30, height: 30, borderRadius: '50%', background: c, marginRight: 8, boxShadow: '1px 1px 7px #202a' });
const imageRow = { display: 'flex', gap: 16, margin: '9px 0 0 0' };

const flipBackStyle = {
    width: '100%', height: '100%', backfaceVisibility: 'hidden', position: 'absolute', top: 0, left: 0, background: 'rgba(0,0,0,0.96)', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: 'rotateY(180deg)',
};

const greenLineStyle = {
    background: '#73cd5a',
    height: '2px',
    width: '100%',
    margin: '18px 0 16px 0',
    borderRadius: '1px',
};

const brandLine = { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 };
const monoBox = {
    background: '#223519',
    color: '#fff',
    fontSize: 18,
    borderRadius: '5px',
    width: '560px',
    padding: '16px 20px',
    marginBottom: 30
};
const labelList = { fontSize: 13, color: '#bbf5a0', fontStyle: 'italic', display: 'flex', gap: 16, marginTop: 15 };
const block = { width: '97%', margin: '0 auto', marginTop: 0 };
const darkInputGroup = { display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0' };
const colorCircle = color => ({ display: 'inline-block', width: 22, height: 22, borderRadius: '50%', background: color, margin: '0 5px' });
const previewImgStyle = { width: 72, borderRadius: 7, marginLeft: 10, boxShadow: '2px 2px 10px #1e432c99' };
const typeSample = { fontFamily: 'serif', fontWeight: 600, background: '#181c1a', borderRadius: 3, padding: '2px 9px', marginLeft: 7, color: '#fff', fontSize: 18, letterSpacing: 1 };

export default function ImageZoomOverlay({ imageUrl, onClose }) {
    const [flipped, setFlipped] = useState(false);

    // Prevent click bubbling on image/info panel
    const stopPropagation = (e) => e.stopPropagation();

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={containerStyle} onClick={stopPropagation}>
                <div style={imageBoxStyle} onClick={() => setFlipped((f) => !f)}>
                    <div style={flipContainerStyle(flipped)}>
                        {/* Front side: image */}
                        <div style={flipFrontStyle}>
                            <img src={imageUrl} alt="Zoomed" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        </div>
                        {/* Back side: placeholder */}
                        <div style={flipBackStyle}>
                            <div style={promptVertContainer}>
                                <div style={{ width: '100%', background: '#82CD591A', padding: '22px 35px 16px 35px', fontSize: '1.44rem', color: '#fff', fontWeight: 400, borderRadius: 8, marginBottom: 28, lineHeight: 1.35 }}>
                                    This is the content the content the content the content the content the content. This is the content the the...
                                </div>
                                {/* Brand */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '1.15rem', marginBottom: 8 }}>
                                    My company / brand is <span style={italicStyle}>Reno</span>
                                    <span style={{ marginLeft: 12, fontSize: 31, display: 'flex', alignItems: 'center' }}>&#9900;</span>
                                </div>
                                <hr style={divider} />
                                {/* Visuals */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '1.17rem', position: 'relative', marginBottom: 8 }}>
                                    We have / like <span style={italicStyle}>[those visuals]</span>
                                    <img alt="1" src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=200&q=60" style={{ width: 89, borderRadius: 5, position: 'absolute', right: 97, top: -17, boxShadow: '1.5px 2.4px 14px #213', transform: 'rotate(-7deg)' }} />
                                    <img alt="2" src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=200&q=40" style={{ width: 86, borderRadius: 5, position: 'absolute', right: 7, top: 25, boxShadow: '1.5px 2.4px 14px #213', transform: 'rotate(11deg)' }} />
                                </div>
                                <hr style={divider} />
                                {/* Needs */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '1.17rem', position: 'relative', marginBottom: 8 }}>
                                    We need <span style={italicStyle}>[landing pages ideas]</span>
                                    <img alt="n" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=110&q=22" style={{ width: 63, borderRadius: 6, position: 'absolute', right: 7, top: -15, boxShadow: '2px 2px 16px #202', transform: 'rotate(7deg)' }} />
                                </div>
                                <hr style={divider} />
                                {/* Typography */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '1.17rem', marginBottom: 8 }}>
                                    with typography style <span style={{ marginLeft: 9, padding: '1px 13px', background: '#132917', borderRadius: 3, letterSpacing: '1px', fontWeight: 600, fontSize: 21, color: '#e6e6e6' }}>A A A</span>
                                </div>
                                <hr style={divider} />
                                {/* Colors */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '1.17rem', marginBottom: 8 }}>
                                    and colors
                                    <span style={{ display: 'flex', gap: 9, marginLeft: 17 }}>
                                        <span style={colorDot('#f05418')} />
                                        <span style={colorDot('#e55335')} />
                                        <span style={colorDot('#143b28')} />
                                        <span style={colorDot('#233f5e')} />
                                        <span style={{ display: 'inline', fontSize: 23, padding: '0 6px', color: '#b6d1a0' }}>+</span>
                                    </span>
                                </div>
                                <hr style={divider} />
                                {/* Aesthetic */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '1.17rem', marginBottom: 8, position: 'relative' }}>
                                    the aesthetic we prefer is <span style={italicStyle}>[clean and modern]</span>
                                    <img alt="aes" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=200&q=20" style={{ width: 110, borderRadius: 7, position: 'absolute', right: 7, top: -15, boxShadow: '2px 2px 12px #202', transform: 'rotate(-8deg)' }} />
                                </div>
                                <hr style={divider} />
                                {/* Outcome */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '1.17rem', marginBottom: 12 }}>
                                    to achieve <span style={italicStyle}>[desired outcome]</span>
                                </div>
                                {/* Labels row - each label separate, transparent gradient, as Figma */}
                                <div style={{ width: '100%', display: 'flex', gap: 10, margin: '28px 0 0 0', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
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
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
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
                        <button style={actionBtnStyle} title="Share">↗</button>
                        <button style={actionBtnStyle} title="Download">⦾</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
