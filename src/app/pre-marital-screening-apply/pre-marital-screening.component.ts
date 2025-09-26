import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AppGlobalService } from '../services/app-global.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-marital-screening',
  templateUrl: './pre-marital-screening.component.html',
  styleUrls: ['./pre-marital-screening.component.less']
})
export class PreMaritalScreeningComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;
  currentLang = 'en';
  isStep1Completed = false;
  isStep1Editable = false;
  isStep2Completed = false;
  isStep2Editable = false;
  isStep3Completed = false;
  isStep3Editable = false;
  medicalForm: FormGroup = {} as any;
  partnerDetailsForm: FormGroup = {} as any;
  userAppointmentForm: FormGroup = {} as any;
  showPartnerDetailsInStep2 = false;
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
  showPartnerDetails = false;
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
  healthCenterList = {
    4237235: [
      {
        id: 'awir',
        healthCenterEn: "Al Awir Health Center",
        healthCenterAr: "مركز العوير الصحي",
      },
      {
        id: 'muha',
        healthCenterEn: "Al Muhaisnah Health Center",
        healthCenterAr: "مركز المحيصنة الصحي",
      }
    ],
    4237246: [
      {
        id: 'kalba',
        healthCenterEn: "Kalba Health Center",
        healthCenterAr: "مركز كلباء الصحي"
      }
    ],
    4237232: [
      {
        id: "muz",
        healthCenterEn: "Al Madina Health Center",
        healthCenterAr: "مركز المدينة الصحي"
      }
    ],
    4237248: [
      {
        id: "khaz",
        healthCenterEn: "Al Khazan Health Center",
        healthCenterAr: "مركز الخزان الصحي"
      },
      {
        id: "falaj",
        healthCenterEn: "Falaj Al Mualla Health Center",
        healthCenterAr: "مركز فلج المعلا الصحي"
      }
    ],
    4237244: [
      {
        id: "kadra",
        healthCenterEn: "Kadra Health Center",
        healthCenterAr: "مركز كدرة الصحي"
      }
    ],
    4237237: [
      {
        id: "qidfa",
        healthCenterEn: "Qidfa Health Center",
        healthCenterAr: "مركز قدفع الصحي"
      }
    ]
  }
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
  displayHealthCenterList = [];
  displayDoctorList = [];
  selectedTimeslot;
  today = new Date();
  maxDate = new Date();
  timeSlots: { date: Date; slots: string[] }[] = [];
  showFlexibleDays = false;
  constructor(private fb: FormBuilder, private appGlobals: AppGlobalService,
    private dataService: DataService, private router: Router
  ) { }

  ngOnInit(): void {
    this.maxDate.setDate(this.today.getDate() + 30);
    this.initForms();
    this.getObserveValues();
  }
  getObserveValues() {
    this.appGlobals.defaultLang.subscribe(item => {
      this.currentLang = item
      this.partnerDetailsForm.controls['name'].setValue(this.currentLang == 'en' ? 'Fatemah Al Ameri' : "فاطمة العامري");
    });
  }
  initForms() {
    this.medicalForm = this.fb.group({
      question1: [, Validators.required],
      question2: [, Validators.required],
      question3: [, Validators.required],
      question4: [, Validators.required],
      question5: [, Validators.required],
      question6: [, Validators.required],
      question7: [, Validators.required],
    });
    this.partnerDetailsForm = this.fb.group({
      emiratesId: [, Validators.required],
      name: [this.currentLang == 'en' ? 'Fatemah Al Ameri' : "فاطمة العامري", Validators.required]
    });
    this.userAppointmentForm = this.fb.group({
      emirate: [null, Validators.required],
      healthCenter: [, Validators.required],
      doctor: [, Validators.required],
      date: [, Validators.required]
    })
  }

  searchEmiratesId() {
    if (this.partnerDetailsForm.value.emiratesId) {
      this.showPartnerDetailsInStep2 = true;
    }

  }

  onEmirateChange(event) {
    this.displayHealthCenterList = this.healthCenterList[event.value.emirateCode];
    this.displayDoctorList = [];
  }
  onHealthCenterChange(event) {
    this.displayDoctorList = this.doctorList;
  }
  onDoctorChange(event) {

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
  nextStep(fromStep: number) {
    if (fromStep == 1 && this.medicalForm.valid) {
      this.isStep1Completed = true;
      this.stepperNext();
    }
    if (fromStep == 2 && this.partnerDetailsForm.valid) {
      this.isStep2Completed = true;
      this.isStep2Editable = false;
      this.stepperNext();
    }
    if (fromStep == 3 && this.userAppointmentForm.valid) {
      let saveData = {
        userEmiratesId: "7841988754364738",
        medicalHistory: this.medicalForm.value,
        partnerEmiratesId: this.partnerDetailsForm.value.emiratesId,
        partnerFullNameEn: this.partnerDetails.partnerFullNameEn,
        partnerFullNameAr: this.partnerDetails.partnerFullNameAr,
        appointmentDetails: this.userAppointmentForm.value,
        selectedTimeSlot: this.selectedTimeslot,
      }
      this.dataService.setData(saveData);
      this.router.navigateByUrl('/premaritalreview');
    }
  }

  stepperNext() {
    setTimeout(() => {
      this.stepper.next()
    }, 100);
  }

  stepperPrevious() {
    setTimeout(() => {
      this.stepper.previous();
    }, 100);
  }

  previousStep(fromStep: number) {
    if (fromStep == 2) {
      this.isStep1Completed = false;
      this.isStep1Editable = true;
      this.stepperPrevious();
    } else if (fromStep == 3) {
      this.isStep2Editable = true;
      this.isStep2Completed = false;
      this.stepperPrevious();
    }
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
