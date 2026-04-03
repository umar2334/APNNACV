import React from 'react';
import { CVData } from '../../types/cv';

interface Props {
  data: CVData;
}

const levelWidth = (level: string) => {
  if (level === 'Expert') return '100%';
  if (level === 'Advanced') return '80%';
  if (level === 'Intermediate') return '60%';
  return '40%';
};

export default function ExecutiveTemplate({ data }: Props) {
  const d = data as any;

  return (
    <div
      id="cv-preview"
      style={{
        fontFamily: 'Georgia, serif',
        width: '794px',
        minHeight: '1123px',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ backgroundColor: '#1a56db', padding: '40px 48px 32px', color: '#ffffff' }}>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '700', letterSpacing: '0.5px' }}>
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <p style={{ margin: '6px 0 0', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.85 }}>
          {data.personalInfo.title || 'Professional Title'}
        </p>
        <div style={{ marginTop: '16px', display: 'flex', gap: '24px', fontSize: '12px', opacity: 0.9, flexWrap: 'wrap' }}>
          {data.personalInfo.email && <span>✉ {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>✆ {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>⊙ {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>⌘ {data.personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '32px 36px', borderRight: '1px solid #e5e7eb' }}>

          {data.summary && (
            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#1a56db', margin: '0 0 10px', paddingBottom: '6px', borderBottom: '2px solid #1a56db' }}>
                Executive Summary
              </h2>
              <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#374151', margin: 0 }}>{data.summary}</p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#1a56db', margin: '0 0 14px', paddingBottom: '6px', borderBottom: '2px solid #1a56db' }}>
                Professional Experience
              </h2>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
                    {exp.position}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', color: '#1a56db', fontWeight: '600' }}>{exp.company}</span>
                    <span style={{ fontSize: '11px', color: '#6b7280', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                      {exp.startDate} — {exp.endDate || 'Present'}
                    </span>
                  </div>
                  {exp.description && (
                    <p style={{ fontSize: '12.5px', lineHeight: '1.65', color: '#4b5563', margin: 0 }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#1a56db', margin: '0 0 14px', paddingBottom: '6px', borderBottom: '2px solid #1a56db' }}>
                Education
              </h2>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>{edu.degree}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3px' }}>
                    <span style={{ fontSize: '13px', color: '#1a56db', fontWeight: '600' }}>{edu.school}</span>
                    <span style={{ fontSize: '11px', color: '#6b7280', whiteSpace: 'nowrap' }}>
                      {edu.startDate} — {edu.endDate || 'Present'}
                    </span>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ width: '200px', padding: '32px 38px', backgroundColor: '#f0f7ff', flexShrink: 0 }}>

          {data.skills.length > 0 && (
            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#1a56db', margin: '0 0 14px', paddingBottom: '5px', borderBottom: '2px solid #1a56db' }}>
                Core Skills
              </h2>
              {data.skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                    {skill.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ flex: 1, height: '4px', backgroundColor: '#dbeafe', borderRadius: '2px' }}>
                      <div style={{ height: '4px', borderRadius: '2px', backgroundColor: '#1a56db', width: levelWidth((skill as any).level || '') }} />
                    </div>
                    <span style={{ fontSize: '10px', color: '#6b7280', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {(skill as any).level || ''}
                    </span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {d.languages && d.languages.length > 0 && (
            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#1a56db', margin: '0 0 14px', paddingBottom: '5px', borderBottom: '2px solid #1a56db' }}>
                Languages
              </h2>
              {d.languages.map((lang: any, i: number) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#1f2937' }}>{lang.name}</div>
                  <div style={{ fontSize: '10px', color: '#6b7280' }}>{lang.level}</div>
                </div>
              ))}
            </section>
          )}

          {d.certifications && d.certifications.length > 0 && (
            <section>
              <h2 style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#1a56db', margin: '0 0 14px', paddingBottom: '5px', borderBottom: '2px solid #1a56db' }}>
                Certifications
              </h2>
              {d.certifications.map((cert: any, i: number) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: '600', color: '#1f2937', lineHeight: '1.4' }}>{cert.name}</div>
                  <div style={{ fontSize: '10.5px', color: '#6b7280', marginTop: '2px' }}>{cert.issuer}</div>
                  {cert.date && <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '1px' }}>{cert.date}</div>}
                </div>
              ))}
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
