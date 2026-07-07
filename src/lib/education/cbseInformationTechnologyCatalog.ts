import type { BoardSubjectCatalog } from './educationTypes'

export const CBSE_INFORMATION_TECHNOLOGY_CATALOG: BoardSubjectCatalog = {
  boardId: 'cbse',
  subjectSlug: 'information_technology',
  subjectName: 'Information Technology',
  grades: [
    {
      grade: 9,
      chapters: [
        { id: 'cbse.it.9.ch1', order: 1, title: 'Introduction to IT-ITeS Industry', kgNodeIds: ['it.digital_literacy'] },
        { id: 'cbse.it.9.ch2', order: 2, title: 'Data Entry and Keyboarding Skills', kgNodeIds: ['it.operating_system_basics'] },
        { id: 'cbse.it.9.ch3', order: 3, title: 'Digital Documentation — Word Processor Basics', kgNodeIds: ['it.word_processing'] },
        { id: 'cbse.it.9.ch4', order: 4, title: 'Electronic Spreadsheets — Basics', kgNodeIds: ['it.spreadsheets'] },
        { id: 'cbse.it.9.ch5', order: 5, title: 'Digital Presentations', kgNodeIds: ['it.presentations'] },
        { id: 'cbse.it.9.ch6', order: 6, title: 'Internet and Email Services', kgNodeIds: ['it.internet_basics', 'it.email_communication'] },
        { id: 'cbse.it.9.ch7', order: 7, title: 'Cyber Safety and Security Basics', kgNodeIds: ['it.cyber_safety'] },
        { id: 'cbse.it.9.ch8', order: 8, title: 'Communication Skills in Digital Era', kgNodeIds: ['it.digital_literacy'] },
      ],
    },
    {
      grade: 10,
      chapters: [
        { id: 'cbse.it.10.ch1', order: 1, title: 'Advanced Word Processing', kgNodeIds: ['it.word_processing'] },
        { id: 'cbse.it.10.ch2', order: 2, title: 'Advanced Spreadsheets — Formulas, Charts, Sorting', kgNodeIds: ['it.spreadsheets'] },
        { id: 'cbse.it.10.ch3', order: 3, title: 'Database Management — MS Access Basics', kgNodeIds: ['it.database_basics'] },
        { id: 'cbse.it.10.ch4', order: 4, title: 'Social Media and Online Collaboration', kgNodeIds: ['it.social_media'] },
        { id: 'cbse.it.10.ch5', order: 5, title: 'Digital Content and Media', kgNodeIds: ['it.digital_content'] },
        { id: 'cbse.it.10.ch6', order: 6, title: 'Networking Fundamentals', kgNodeIds: ['it.networking_concepts'] },
        { id: 'cbse.it.10.ch7', order: 7, title: 'Data Privacy and Digital Footprint', kgNodeIds: ['it.data_privacy'] },
        { id: 'cbse.it.10.ch8', order: 8, title: 'Emerging Technologies Overview', kgNodeIds: ['it.emerging_tech'] },
      ],
    },
    {
      grade: 11,
      chapters: [
        { id: 'cbse.it.11.ch1', order: 1, title: 'Fundamentals of IT and Communication Technology', kgNodeIds: ['it.digital_literacy', 'it.networking_concepts'] },
        { id: 'cbse.it.11.ch2', order: 2, title: 'Database Concepts and MySQL', kgNodeIds: ['it.database_basics', 'it.rdbms'] },
        { id: 'cbse.it.11.ch3', order: 3, title: 'HTML — Web Page Structure', kgNodeIds: ['it.html_basics'] },
        { id: 'cbse.it.11.ch4', order: 4, title: 'CSS — Styling and Layout', kgNodeIds: ['it.css_basics'] },
        { id: 'cbse.it.11.ch5', order: 5, title: 'JavaScript Basics', kgNodeIds: ['it.web_scripting'] },
        { id: 'cbse.it.11.ch6', order: 6, title: 'Network Protocols and Internet Services', kgNodeIds: ['it.network_protocols'] },
        { id: 'cbse.it.11.ch7', order: 7, title: 'Cyber Security Concepts', kgNodeIds: ['it.cybersecurity_advanced'] },
        { id: 'cbse.it.11.ch8', order: 8, title: 'Ethical and Legal Issues in IT', kgNodeIds: ['it.ethical_legal'] },
        { id: 'cbse.it.11.ch9', order: 9, title: 'Cloud Computing and IoT Overview', kgNodeIds: ['it.cloud_computing', 'it.emerging_tech'] },
      ],
    },
    {
      grade: 12,
      chapters: [
        { id: 'cbse.it.12.ch1', order: 1, title: 'Advanced SQL and Database Applications', kgNodeIds: ['it.rdbms', 'it.sql_advanced'] },
        { id: 'cbse.it.12.ch2', order: 2, title: 'Python for IT Applications', kgNodeIds: ['it.python_for_it'] },
        { id: 'cbse.it.12.ch3', order: 3, title: 'Web Development — HTML, CSS, JavaScript', kgNodeIds: ['it.html_basics', 'it.css_basics', 'it.web_scripting'] },
        { id: 'cbse.it.12.ch4', order: 4, title: 'Web Hosting and Publishing', kgNodeIds: ['it.web_publishing'] },
        { id: 'cbse.it.12.ch5', order: 5, title: 'Advanced Networking and Security', kgNodeIds: ['it.network_protocols', 'it.cybersecurity_advanced'] },
        { id: 'cbse.it.12.ch6', order: 6, title: 'Cloud Computing and Virtualisation', kgNodeIds: ['it.cloud_computing'] },
        { id: 'cbse.it.12.ch7', order: 7, title: 'Emerging Technologies — AI, Blockchain, IoT', kgNodeIds: ['it.emerging_tech'] },
        { id: 'cbse.it.12.ch8', order: 8, title: 'IT Project Management and Careers', kgNodeIds: ['it.digital_entrepreneurship'] },
        { id: 'cbse.it.12.ch9', order: 9, title: 'Cyber Law and Ethics', kgNodeIds: ['it.ethical_legal', 'it.data_privacy'] },
      ],
    },
  ],
}

export function getCBSEITChapters(grade: number) {
  return CBSE_INFORMATION_TECHNOLOGY_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getCBSEITChapter(id: string) {
  for (const grade of CBSE_INFORMATION_TECHNOLOGY_CATALOG.grades) {
    const chapter = grade.chapters.find((c) => c.id === id)
    if (chapter) return chapter
  }
  return undefined
}
