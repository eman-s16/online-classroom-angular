import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  classes = [
    {
      id: 1,
      name: 'Art',
      status: 'Active',
      path: 'https://media.istockphoto.com/id/1145883636/vector/art-class-workshop-template-design-kids-art-craft-education-creativity-class-concept-vector.jpg?s=612x612&w=0&k=20&c=DFE5nnGybu24Ey_U5IGEO-bkdk0CMa6VKBZQ6JlYQU0=',
      link: 'https://teams.microsoft.com/',
      students: [
        { studentname: 'Eman salim', grade: '7', present: true },
        { studentname: 'Bob Smith', grade: '6', present: false },
        { studentname: 'Charlie Brown', grade: '5', present: false },
      ],
    },
    {
      id: 2,
      name: 'Math',
      status: 'Completed',
      path: 'https://www.98thpercentile.com/hubfs/Imported_Blog_Media/Picture98-4.jpg',
      link: 'https://teams.microsoft.com/',
      students: [
        { studentname: 'David Miller', grade: '1', present: false },
        { studentname: 'Bob Smith', grade: '2', present: false },
        { studentname: 'David Miller', grade: '3', present: false },
      ],
    },
    {
      id: 3,
      name: 'English',
      status: 'Active',
      path: 'https://www.uab.edu/news/images/english_class_2018.jpg',
      link: 'https://teams.microsoft.com/',
      students: [
        { studentname: 'Alice Johnson', grade: '10', present: false },
        { studentname: 'Bob Smith', grade: '12', present: false },
        { studentname: 'Charlie Brown', grade: '11', present: false },
      ],
    },
  ];
  constructor() { }

  ngOnInit() {
    this.calculatePresentCount();


  }

  getSeverity(status: string) {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Completed':
        return 'danger';
      default:
        return 'unknown';
    }
  }

  toggleStatus(classItem: any) {

    classItem.status = classItem.status === 'Completed' ? 'Active' : 'Completed';
  }
  openTeamsLink(link: string) {
    window.location.href = link;
  }

  //upload
  visibleUploadDialog: boolean = false;
  uploadedFiles: { [studentId: number]: File | null } = {};
  UploadDialogStudents: any[] = [];

  showUploadDialog(students: any[]) {
    this.visibleUploadDialog = true;
    this.UploadDialogStudents = [...students];


    students.forEach((student: any) => {
      this.uploadedFiles[student.id] = null;
    });
  }

  onFileSelect(event: any, studentId: number) {
    const fileList: FileList = event.files;
    if (fileList.length > 0) {
      this.uploadedFiles[studentId] = fileList[0];
    }
  }

  uploadFiles() {
    for (const studentId in this.uploadedFiles) {
      const file = this.uploadedFiles[studentId];
      if (file) {

        this.uploadedFiles[studentId] = null;
      }
    }
    this.visibleUploadDialog = false;
  }

  //attendance
  visibleAttendanceDialog: boolean = false;
  attendanceDialogStudents: any[] = [];
  classPresentCounts: { [key: number]: number } = {};


  calculatePresentCount() {
    this.classes.forEach((classItem) => {
      const presentCount = classItem.students.filter(student => student.present).length;
      this.classPresentCounts[classItem.id] = presentCount;
    });
  }

  showAttendanceDialog(students: any[]) {

    this.attendanceDialogStudents = [...students];
    this.calculatePresentCount();
    this.visibleAttendanceDialog = true;
  }

  saveClass() {


    this.calculatePresentCount();

    this.visibleAttendanceDialog = false;
  }

}
