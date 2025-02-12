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
// PDF Styles
const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Times-Roman' }, // ✅ Apply globally
  section: { marginBottom: 10 },
  title: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Times-Bold', // ✅ Ensure title uses it
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 3,
    fontFamily: 'Times-Bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 2,
    fontFamily: 'Times-Roman',
    fontWeight: 'bold',
  },
  hr: { borderBottom: '1px solid #000', marginVertical: 5 },
  margin: { marginTop: '15px' },
  documentHeight: { height: '500px' },
})

interface PdfDialogProps {
  resume: any
}

const formatDate = (dateString: string) => {
  if (!dateString || dateString === 'Present') return dateString

  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ✅ Extract `Document` part so it can be used inside `<PDFDownloadLink>`
export const ResumeDocument = ({ resume }: PdfDialogProps) => {
  console.log('Resume Data:', resume) // 🔍 Debugging

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* If no resume data is available, return an empty page */}
        {!resume || Object.keys(resume).length === 0 ? null : (
          <>
            {resume.name || resume.email || resume.phone || resume.location ? (
              <View style={styles.section}>
                {resume.name && <Text style={styles.title}>{resume.name}</Text>}
                <Text style={styles.text}>
                  {resume.email ? resume.email + ' | ' : ''}
                  {resume.phone ? resume.phone + ' | ' : ''}
                  {resume.location ? resume.location : ''}
                </Text>
              </View>
            ) : null}

            {resume.summary && (
              <View style={styles.section}>
                <Text style={styles.text}>{resume.summary}</Text>
              </View>
            )}

            {resume.experience?.length > 0 && (
              <>
                <Text style={[styles.subtitle, styles.margin]}>Experience</Text>
                <View style={styles.hr} />
                {resume.experience.map((exp, index) => (
                  <View key={index} style={styles.section}>
                    <Text style={styles.text}>
                      {exp.company && (
                        <Text style={{ fontFamily: 'Times-Bold' }}>
                          {exp.company},{' '}
                        </Text>
                      )}
                      {exp.position}
                    </Text>
                    <Text style={[styles.text, { fontFamily: 'Times-Italic' }]}>
                      {formatDate(exp.start_date)} -{' '}
                      {exp.isPresent ? 'Present' : formatDate(exp.end_date)}
                    </Text>
                    <Text style={styles.text}>{exp.job_description}</Text>
                  </View>
                ))}
              </>
            )}

            {resume.education?.length > 0 && (
              <>
                <Text style={[styles.subtitle, styles.margin]}>Education</Text>
                <View style={styles.hr} />
                {resume.education.map((edu, index) => (
                  <View key={index} style={styles.section}>
                    <Text style={styles.text}>
                      <Text style={{ fontFamily: 'Times-Bold' }}>
                        {edu.school}
                      </Text>{' '}
                      - {edu.program}
                    </Text>
                    <Text style={[styles.text, { fontFamily: 'Times-Italic' }]}>
                      {formatDate(edu.start_date)} -{' '}
                      {edu.isPresent ? 'Present' : formatDate(edu.end_date)}
                    </Text>
                  </View>
                ))}
              </>
            )}

            {resume.skills?.length > 0 && (
              <>
                <Text style={[styles.subtitle, styles.margin]}>Skills</Text>
                <View style={styles.hr} />
                <Text style={[styles.text, { fontFamily: 'Times-Italic' }]}>
                  {resume.skills.join(', ')}
                </Text>
              </>
            )}

            {resume.projects?.length > 0 && (
              <>
                <Text style={[styles.subtitle, styles.margin]}>Projects</Text>
                <View style={styles.hr} />
                {resume.projects.map((project, index) => (
                  <View key={index} style={styles.section}>
                    <Text style={styles.text}>
                      <Text style={{ fontFamily: 'Times-Bold' }}>
                        {project.title}
                      </Text>
                      : {project.description}, {project.link}
                    </Text>
                  </View>
                ))}
              </>
            )}

            {resume.certificates?.length > 0 && (
              <>
                <Text style={[styles.subtitle, styles.margin]}>
                  Certificates
                </Text>
                <View style={styles.hr} />
                {resume.certificates.map((cert, index) => (
                  <View key={index} style={styles.section}>
                    <Text style={styles.text}>
                      <Text style={{ fontFamily: 'Times-Bold' }}>
                        {cert.name}
                      </Text>{' '}
                      - {cert.issued_by} {formatDate(cert.date)}
                    </Text>
                  </View>
                ))}
              </>
            )}
          </>
        )}
      </Page>
    </Document>
  )
}

// ✅ Keep `ResumePDF` only for preview
const ResumePDF = ({ resume }: PdfDialogProps) => (
  <PDFViewer width='100%' height='600px'>
    <ResumeDocument resume={resume} />
  </PDFViewer>
)

export default ResumePDF
