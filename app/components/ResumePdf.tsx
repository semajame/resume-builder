'use client'

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer'

// PDF Styles
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  section: { marginBottom: 10 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 3 },
  text: { fontSize: 12, marginBottom: 2 },
  hr: { borderBottom: '1px solid #000', marginVertical: 5 },
  margin: { marginTop: '10px' },
})

// Resume PDF Component
const ResumePDF = ({ resume }: PdfDialogProps) => {
  return (
    <PDFViewer width='100%' height='600px'>
      <Document>
        <Page size='A4' style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>{resume.name || 'Your Name'}</Text>
            <Text style={styles.text}>
              {resume.email || 'your@email.com'} |{' '}
              {resume.phone || 'Phone Number'} | {resume.location || 'Location'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.text}>
              {resume.summary || 'Your summary goes here...'}
            </Text>
          </View>

          <Text style={styles.subtitle}>Experience</Text>
          <View style={styles.hr} />
          {resume.experience.length > 0 ? (
            resume.experience.map((exp, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.text}>
                  <Text style={{ fontWeight: 'bold' }}>{exp.company}</Text> -{' '}
                  {exp.position}
                </Text>
                <Text style={styles.text}>
                  {exp.start_date} - {exp.isPresent ? 'Present' : exp.end_date}
                </Text>
                <Text style={styles.text}>{exp.job_description}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}>Your work experience...</Text>
          )}

          <Text style={styles.subtitle}>Education</Text>
          <View style={styles.hr} />
          {resume.education.length > 0 ? (
            resume.education.map((edu, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.text}>
                  <Text style={{ fontWeight: 'bold' }}>{edu.school}</Text> -{' '}
                  {edu.program}
                </Text>
                <Text style={styles.text}>
                  {edu.start_date} - {edu.isPresent ? 'Present' : edu.end_date}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}>Your education history...</Text>
          )}

          <Text style={styles.subtitle}>Skills</Text>
          <View style={styles.hr} />
          <Text style={styles.text}>
            {resume.skills.length > 0
              ? resume.skills.join(', ')
              : 'Your skills...'}
          </Text>

          <Text style={(styles.subtitle, styles.margin)}>Projects</Text>
          <View style={styles.hr} />
          {resume.projects.length > 0 ? (
            resume.projects.map((project, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.text}>
                  <Text style={{ fontWeight: 'bold' }}>{project.title}</Text>:{' '}
                  {project.description}, {project.link}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}>Your projects...</Text>
          )}

          <Text style={styles.subtitle}>Certificates</Text>
          <View style={styles.hr} />
          {resume.certificates.length > 0 ? (
            resume.certificates.map((cert, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.text}>
                  <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text> -{' '}
                  {cert.issued_by} ({cert.date})
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}>Your certificates...</Text>
          )}
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default ResumePDF
