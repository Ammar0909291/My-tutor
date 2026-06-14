import type { BoardSubjectCatalog } from './educationTypes'

export const UP_INFORMATION_TECHNOLOGY_CATALOG: BoardSubjectCatalog = {
  boardId: 'up_board',
  subjectSlug: 'information_technology',
  subjectName: 'Information Technology',
  grades: [
    {
      grade: 9,
      chapters: [
        { id: 'up.it.9.ch1', order: 1, title: 'Introduction to Computers and IT', kgNodeIds: ['it.digital_literacy'] },
        { id: 'up.it.9.ch2', order: 2, title: 'Operating System and File Management', kgNodeIds: ['it.operating_system_basics'] },
        { id: 'up.it.9.ch3', order: 3, title: 'Word Processing — MS Word / Writer', kgNodeIds: ['it.word_processing'] },
        { id: 'up.it.9.ch4', order: 4, title: 'Spreadsheet — MS Excel / Calc', kgNodeIds: ['it.spreadsheets'] },
        { id: 'up.it.9.ch5', order: 5, title: 'Internet and Email', kgNodeIds: ['it.internet_basics', 'it.email_communication'] },
        { id: 'up.it.9.ch6', order: 6, title: 'Cyber Safety', kgNodeIds: ['it.cyber_safety'] },
        { id: 'up.it.9.ch7', order: 7, title: 'Multimedia and Presentations', kgNodeIds: ['it.presentations', 'it.digital_content'] },
      ],
    },
    {
      grade: 10,
      chapters: [
        { id: 'up.it.10.ch1', order: 1, title: 'Advanced Word Processing', kgNodeIds: ['it.word_processing'] },
        { id: 'up.it.10.ch2', order: 2, title: 'Advanced Spreadsheets', kgNodeIds: ['it.spreadsheets'] },
        { id: 'up.it.10.ch3', order: 3, title: 'Introduction to Database', kgNodeIds: ['it.database_basics'] },
        { id: 'up.it.10.ch4', order: 4, title: 'HTML Basics', kgNodeIds: ['it.html_basics'] },
        { id: 'up.it.10.ch5', order: 5, title: 'Networking and Internet Services', kgNodeIds: ['it.networking_concepts'] },
        { id: 'up.it.10.ch6', order: 6, title: 'Social Media and Online Safety', kgNodeIds: ['it.social_media', 'it.data_privacy'] },
        { id: 'up.it.10.ch7', order: 7, title: 'Digital Communication Tools', kgNodeIds: ['it.email_communication', 'it.digital_content'] },
      ],
    },
    {
      grade: 11,
      chapters: [
        { id: 'up.it.11.ch1', order: 1, title: 'ICT Fundamentals and Office Automation', kgNodeIds: ['it.digital_literacy', 'it.operating_system_basics'] },
        { id: 'up.it.11.ch2', order: 2, title: 'Word Processing and Desktop Publishing', kgNodeIds: ['it.word_processing'] },
        { id: 'up.it.11.ch3', order: 3, title: 'Spreadsheets — Advanced Functions and Charts', kgNodeIds: ['it.spreadsheets'] },
        { id: 'up.it.11.ch4', order: 4, title: 'Database Management — Concepts and SQL', kgNodeIds: ['it.database_basics', 'it.rdbms'] },
        { id: 'up.it.11.ch5', order: 5, title: 'Web Designing — HTML and CSS', kgNodeIds: ['it.html_basics', 'it.css_basics'] },
        { id: 'up.it.11.ch6', order: 6, title: 'Networking and Internet Technologies', kgNodeIds: ['it.networking_concepts', 'it.network_protocols'] },
        { id: 'up.it.11.ch7', order: 7, title: 'Cyber Security and IT Act', kgNodeIds: ['it.cyber_safety', 'it.ethical_legal'] },
        { id: 'up.it.11.ch8', order: 8, title: 'Digital Communication and Social Media', kgNodeIds: ['it.social_media', 'it.email_communication'] },
      ],
    },
    {
      grade: 12,
      chapters: [
        { id: 'up.it.12.ch1', order: 1, title: 'Advanced Database — MySQL', kgNodeIds: ['it.rdbms', 'it.sql_advanced'] },
        { id: 'up.it.12.ch2', order: 2, title: 'Web Development — HTML, CSS, JavaScript', kgNodeIds: ['it.html_basics', 'it.css_basics', 'it.web_scripting'] },
        { id: 'up.it.12.ch3', order: 3, title: 'Python for IT', kgNodeIds: ['it.python_for_it'] },
        { id: 'up.it.12.ch4', order: 4, title: 'Networking and Security', kgNodeIds: ['it.network_protocols', 'it.cybersecurity_advanced'] },
        { id: 'up.it.12.ch5', order: 5, title: 'Cloud Computing and Emerging Technologies', kgNodeIds: ['it.cloud_computing', 'it.emerging_tech'] },
        { id: 'up.it.12.ch6', order: 6, title: 'E-Commerce and Digital Entrepreneurship', kgNodeIds: ['it.digital_entrepreneurship'] },
        { id: 'up.it.12.ch7', order: 7, title: 'Data Privacy and Cyber Laws', kgNodeIds: ['it.data_privacy', 'it.ethical_legal'] },
        { id: 'up.it.12.ch8', order: 8, title: 'IT Project and Portfolio', kgNodeIds: ['it.digital_entrepreneurship', 'it.web_publishing'] },
      ],
    },
  ],
}

export function getUPITChapters(grade: number) {
  return UP_INFORMATION_TECHNOLOGY_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getUPITChapter(id: string) {
  for (const grade of UP_INFORMATION_TECHNOLOGY_CATALOG.grades) {
    const chapter = grade.chapters.find((c) => c.id === id)
    if (chapter) return chapter
  }
  return undefined
}
