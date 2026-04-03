import React, { useRef } from 'react';
import { CVData, ColorSchemeColors } from '../../types/cv';

interface Props { data: CVData; colors: ColorSchemeColors; font: string; onPhotoChange?: (photo: string) => void; }

export function ModernTemplate({ data, colors, font, onPhotoChange }: Props) {
  const { personalInfo: p, summary, experience, education, skills, languages } = data;
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => { if (onPhotoChange) fileRef.current?.click(); };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onPhotoChange) return;
    const reader = new FileReader();
    reader.onload = (ev) => onPhotoChange(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ fontFamily: font, color: '#1a1a1a', lineHeight: 1.5, display: 'flex', minHeight: '297mm' }}>
      {/* Left Sidebar */}
      <div style={{ width: '35%', backgroundColor: colors.sidebar, color: '#fff', padding: '24px 18px', flexShrink: 0 }}>

        {/* Photo circle */}
        <div
          onClick={handlePhotoClick}
          style={{
            width: '76px', height: '76px', borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '14px', overflow: 'hidden',
            border: '2px solid rgba(255,255,255,0.4)',
            cursor: onPhotoChange ? 'pointer' : 'default',
            position: 'relative',
          }}
        >
          {p.photo ? (
            <img src={p.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '26px', fontWeight: 700, color: '#fff' }}>
                {p.fullName ? p.fullName.charAt(0).toUpperCase() : 'U'}
              </div>
              {onPhotoChange && <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>Add Photo</div>}
            </div>
          )}
          {onPhotoChange && (
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoSelect} />
          )}
        </div>

        <h1 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 3px', lineHeight: 1.2 }}>{p.fullName || 'Your Name'}</h1>
        <p style={{ fontSize: '10px', opacity: 0.8, margin: '0 0 18px', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.title || 'Job Title'}</p>

        {/* Contact */}
        <SidebarSection title="Contact">
          {p.email    && <ContactItem icon="✉" text={p.email} />}
          {p.phone    && <ContactItem icon="📞" text={p.phone} />}
          {p.location && <ContactItem icon="📍" text={p.location} />}
          {p.linkedin && <ContactItem icon="🔗" text={p.linkedin} />}
          {p.website  && <ContactItem icon="🌐" text={p.website} />}
        </SidebarSection>

        {/* Skills */}
        {skills.length > 0 && (
          <SidebarSection title="Skills">
            {skills.map((sk) => (
              <div key={sk.id} style={{ marginBottom: '9px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '10.5px', color: '#fff', fontWeight: 500 }}>{sk.name}</span>
                  <span style={{ fontSize: '9px', opacity: 0.7, flexShrink: 0, marginLeft: '4px' }}>{sk.level}</span>
                </div>
                <div style={{ height: '3px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                  <div style={{ height: '100%', borderRadius: '2px', backgroundColor: 'rgba(255,255,255,0.85)', width: sk.level === 'Expert' ? '100%' : sk.level === 'Advanced' ? '80%' : sk.level === 'Intermediate' ? '60%' : '40%' }} />
                </div>
              </div>
            ))}
          </SidebarSection>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <SidebarSection title="Languages">
            {languages.map((lang) => (
              <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '10.5px', color: '#fff' }}>{lang.name}</span>
                <span style={{ fontSize: '9.5px', opacity: 0.75 }}>{lang.proficiency}</span>
              </div>
            ))}
          </SidebarSection>
        )}
      </div>

      {/* Right Main */}
      <div style={{ flex: 1, padding: '26px 22px', minWidth: 0 }}>
        {summary && (
          <MainSection title="About Me" color={colors.primary}>
            <p style={{ fontSize: '11.5px', color: '#444', margin: 0, lineHeight: 1.6 }}>{summary}</p>
          </MainSection>
        )}

        {experience.length > 0 && (
          <MainSection title="Experience" color={colors.primary}>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px', paddingLeft: '12px', borderLeft: `3px solid ${colors.light}` }}>
                <p style={{ fontWeight: 700, fontSize: '12px', margin: '0 0 2px', color: '#1a1a1a' }}>{exp.position}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
                  <p style={{ fontSize: '11px', color: colors.primary, margin: 0, fontWeight: 600 }}>{exp.company}</p>
                  <span style={{ fontSize: '10px', color: '#888', flexShrink: 0, whiteSpace: 'nowrap' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <p style={{ fontSize: '10.5px', color: '#555', margin: 0, lineHeight: 1.55 }}>{exp.description}</p>}
              </div>
            ))}
          </MainSection>
        )}

        {education.length > 0 && (
          <MainSection title="Education" color={colors.primary}>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px', paddingLeft: '12px', borderLeft: `3px solid ${colors.light}` }}>
                <p style={{ fontWeight: 700, fontSize: '12px', margin: '0 0 2px', color: '#1a1a1a' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <p style={{ fontSize: '11px', color: colors.primary, margin: 0, fontWeight: 500 }}>{edu.institution}</p>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontSize: '10px', color: '#888', margin: 0, whiteSpace: 'nowrap' }}>{edu.startDate} — {edu.endDate}</p>
                    {edu.grade && <p style={{ fontSize: '10px', color: '#888', margin: 0 }}>{edu.grade}</p>}
                  </div>
                </div>
              </div>
            ))}
          </MainSection>
        )}
      </div>
    </div>
  );
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <h2 style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', margin: '0 0 8px', paddingBottom: '5px', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>{title}</h2>
      {children}
    </div>
  );
}

function ContactItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '5px' }}>
      <span style={{ fontSize: '10px', flexShrink: 0 }}>{icon}</span>
      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.4, wordBreak: 'break-all' }}>{text}</span>
    </div>
  );
}

function MainSection({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <div style={{ width: '4px', height: '16px', backgroundColor: color, borderRadius: '2px', flexShrink: 0 }} />
        <h2 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color, margin: 0 }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}
