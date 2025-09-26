import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { AppGlobalService } from '../services/app-global.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.less']
})
export class RescheduleComponent implements OnInit {

  currentLang = 'en';
  savedData;
  paymentDate;
  partnerDetails = {
    partnerFullNameEn: "Fatemah Al Ameri",
    partnerFullNameAr: "فاطمة العامري",
    emirateEn: "Dubai",
    emirateAr: "دبي",
    healthCenterEn: "Al Awir Health Center",
    healthCenterAr: "مركز العوير الصحي",
    doctorEn: "Dr Esraa",
    doctorAr: "دكتورة إسراء",
    dateTime: "05-Feb-2025 11:00AM"
  };
  emiratesList = [
    {
      emirateCode: "4237235",
      emirateNameEn: "Dubai",
      emirateNameAr: "دبي"
    },
    {
      emirateCode: "4237246",
      emirateNameEn: "Sharjah",
      emirateNameAr: "الشارقة"
    },
    {
      emirateCode: "4237232",
      emirateNameEn: "Ajman",
      emirateNameAr: "عجمان"
    },
    {
      emirateCode: "4237248",
      emirateNameEn: "Umm Al Quwain",
      emirateNameAr: "أم القيوين"
    },
    {
      emirateCode: "4237244",
      emirateNameEn: "Ras Al Khaimah",
      emirateNameAr: "رأس الخيمة"
    },
    {
      emirateCode: "4237237",
      emirateNameEn: "Fujairah",
      emirateNameAr: "الفجيرة"
    }
  ]
  healthCenterList = [
    {
      id: 'awir',
      healthCenterEn: "Al Awir Health Center",
      healthCenterAr: "مركز العوير الصحي",
    },
    {
      id: 'muha',
      healthCenterEn: "Al Muhaisnah Health Center",
      healthCenterAr: "مركز المحيصنة الصحي",
    },
    {
      id: 'kalba',
      healthCenterEn: "Kalba Health Center",
      healthCenterAr: "مركز كلباء الصحي"
    },
    {
      id: "muz",
      healthCenterEn: "Al Madina Health Center",
      healthCenterAr: "مركز المدينة الصحي"
    },
    {
      id: "khaz",
      healthCenterEn: "Al Khazan Health Center",
      healthCenterAr: "مركز الخزان الصحي"
    },
    {
      id: "falaj",
      healthCenterEn: "Falaj Al Mualla Health Center",
      healthCenterAr: "مركز فلج المعلا الصحي"
    },
    {
      id: "kadra",
      healthCenterEn: "Kadra Health Center",
      healthCenterAr: "مركز كدرة الصحي"
    },
    {
      id: "qidfa",
      healthCenterEn: "Qidfa Health Center",
      healthCenterAr: "مركز قدفع الصحي"
    }
  ];
  doctorList = [
    {
      id: "doc1",
      doctorEn: "Dr. Esraa",
      doctorAr: "دكتورة إسراء"
    },
    {
      id: "doc2",
      doctorEn: "Dr. Mohamed",
      doctorAr: "دكتور محمد"
    }
  ]
  userAppointmentForm: FormGroup = {} as any;
  displayHealthCenterList = [];
  displayDoctorList = [];
  selectedTimeslot;
  today = new Date();
  maxDate = new Date();
  timeSlots: { date: Date; slots: string[] }[] = [];
  showFlexibleDays = false;

  constructor(private appGlobals: AppGlobalService,
    private dataService: DataService, private router: Router, private fb: FormBuilder,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.maxDate.setDate(this.today.getDate() + 30);
    this.getObserveValues();
    this.savedData = this.dataService.getData();
    this.paymentDate = this.dataService.getPaymentDate();
    this.userAppointmentForm = this.fb.group({
      emirate: [this.savedData.appointmentDetails.emirate, Validators.required],
      healthCenter: [this.savedData.appointmentDetails.healthCenter, Validators.required],
      doctor: [this.savedData.appointmentDetails.doctor, Validators.required],
      date: [, Validators.required]
    });
    this.userAppointmentForm.patchValue({ emirate: this.emiratesList.find(e => e.emirateCode == this.savedData.appointmentDetails.emirate.emirateCode) });
    this.userAppointmentForm.patchValue({ healthCenter: this.healthCenterList.find(e => e.id == this.savedData.appointmentDetails.healthCenter.id) });
    this.userAppointmentForm.patchValue({ doctor: this.doctorList.find(e => e.id == this.savedData.appointmentDetails.doctor.id) });

  }
  getObserveValues() {
    this.appGlobals.defaultLang.subscribe(item => {
      this.currentLang = item;
    });
  }
  cancel() {
    this.router.navigateByUrl('/list');
  }
  done() {
    this.savedData.appointmentDetails.date = this.userAppointmentForm.value.date;
    this.savedData.selectedTimeSlot = this.selectedTimeslot;
    this.dataService.setData(this.savedData);
    this.translate.get('preMarital.rescheduleSuccess').subscribe((res: string) => {
      this.appGlobals.showSucess(res);
    })
    this.router.navigateByUrl('/list');
  }
  onDateChange(event) {
    if (this.userAppointmentForm.value.date) {
      this.generateTimeSlots();
    }
  }
  checkBoxChange(event) {
    this.showFlexibleDays = event.checked;
    if (this.userAppointmentForm.value.date) {
      this.generateTimeSlots();
    }
  }
  onSelectTimeSlot(time) {
    this.selectedTimeslot = time;
  }
  private getRandomTimeSlots(): string[] {
    const slots: Set<string> = new Set(); // Use a Set to track unique slots
    const numberOfSlots = Math.floor(Math.random() * 5) + 3; // Random slots between 3 and 7

    while (slots.size < numberOfSlots) {
      const hour = Math.floor(Math.random() * 12) + 8; // Random hour between 8 and 7 (8 AM to 7 PM)
      const minute = Math.random() > 0.5 ? '00' : '30'; // Either 00 or 30 minutes
      const period = hour < 12 || hour === 12 ? 'AM' : 'PM'; // Correctly label AM or PM
      const formattedHour = hour > 12 ? hour - 12 : hour;

      const timeSlot = `${formattedHour}:${minute} ${period}`;

      // Add to the set only if it doesn't already exist
      slots.add(timeSlot);
    }

    // Convert the set to an array and sort with AM first, then PM
    return Array.from(slots).sort((a, b) => {
      const [hourA, minuteA, periodA] = this.parseTimeSlot(a);
      const [hourB, minuteB, periodB] = this.parseTimeSlot(b);

      // Compare AM/PM first
      if (periodA !== periodB) {
        return periodA === 'AM' ? -1 : 1;
      }

      // If same period, compare hour and then minute
      return hourA - hourB || minuteA - minuteB;
    });
  }

  // Helper function to parse time slots
  private parseTimeSlot(timeSlot: string): [number, number, string] {
    const [time, period] = timeSlot.split(' ');
    const [hour, minute] = time.split(':').map(Number);

    return [hour, minute, period];
  }
  // Generate time slots for the selected date (+2 extra dates if checkbox is checked)
  generateTimeSlots(): void {
    this.timeSlots = []; // Reset time slots

    if (this.userAppointmentForm.value.date) {
      const baseDate = new Date(this.userAppointmentForm.value.date);
      const datesToGenerate = this.showFlexibleDays ? 3 : 1; // 1 for the selected date, +2 if checkbox is selected

      for (let i = 0; i < datesToGenerate; i++) {
        const currentDate = new Date(baseDate);
        currentDate.setDate(baseDate.getDate() + i); // Increment date by i days
        this.timeSlots.push({
          date: currentDate,
          slots: this.getRandomTimeSlots()
        });
      }
    }
  }
}
