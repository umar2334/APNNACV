import React from 'react';
import { CVData, ColorSchemeColors } from '../../types/cv';

interface Props {
  data: CVData;
  colors: ColorSchemeColors;
  font: string;
}

export function MinimalistTemplate({ data, colors, font }: Props) {
  const { personalInfo: p, summary, experience, education, skills, languages } = data;

  return (
    <div style={{ fontFamily: font, color: '#1a1a1a', lineHeight: 1.5 }} className="h-full">
      {/* Header */}
      <div style={{ borderBottom: `3px solid ${colors.primary}`, paddingBottom: '16px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: colors.primary, margin: 0, letterSpacing: '-0.5px' }}>
          {p.fullName || 'Your Name'}
        </h1>
        <p style={{ fontSize: '13px', fontWeight: 500, color: '#555', margin: '4px 0 10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {p.title || 'Job Title'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '11px', color: '#666' }}>
          {p.email && <span>✉ {p.email}</span>}
          {p.phone && <span>📞 {p.phone}</span>}
          {p.location && <span>📍 {p.location}</span>}
          {p.linkedin && <span>🔗 {p.linkedin}</span>}
          {p.website && <span>🌐 {p.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <Section title="Professional Summary" color={colors.primary}>
          <p style={{ fontSize: '11.5px', color: '#444', margin: 0 }}>{summary}</p>
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Work Experience" color={colors.primary}>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '12px', margin: 0, color: '#222' }}>{exp.position}</p>
                  <p style={{ fontSize: '11px', color: colors.primary, margin: '1px 0', fontWeight: 500 }}>{exp.company}</p>
                </div>
                <p style={{ fontSize: '10.5px', color: '#888', margin: 0, whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                </p>
              </div>
              {exp.description && (
                <p style={{ fontSize: '11px', color: '#555', margin: '5px 0 0', lineHeight: 1.5 }}>{exp.description}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education" color={colors.primary}>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '12px', margin: 0, color: '#222' }}>
                    {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                  </p>
                  <p style={{ fontSize: '11px', color: colors.primary, margin: '1px 0', fontWeight: 500 }}>{edu.institution}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '10.5px', color: '#888', margin: 0 }}>
                    {edu.startDate} — {edu.endDate}
                  </p>
                  {edu.grade && <p style={{ fontSize: '10.5px', color: '#888', margin: 0 }}>{edu.grade}</p>}
                </div>
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Skills & Languages */}
      <div style={{ display: 'flex', gap: '24px' }}>
        {skills.length > 0 && (
          <div style={{ flex: 1 }}>
            <Section title="Skills" color={colors.primary}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.map((sk) => (
                  <span
                    key={sk.id}
                    style={{
                      backgroundColor: colors.light,
                      color: colors.primary,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '10.5px',
                      fontWeight: 500,
                    }}
                  >
                    {sk.name}
                  </span>
                ))}
              </div>
            </Section>
          </div>
        )}
        {languages.length > 0 && (
          <div style={{ flex: 1 }}>
            <Section title="Languages" color={colors.primary}>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: '#333' }}>{lang.name}</span>
                  <span style={{ fontSize: '11px', color: '#777' }}>{lang.proficiency}</span>
                </div>
              ))}
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <h2
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: color,
          borderBottom: `1px solid #e5e7eb`,
          paddingBottom: '4px',
          marginBottom: '10px',
          margin: '0 0 10px',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
