import { Component, OnInit } from '@angular/core';
interface Child {
  name: string;
  gender:string
}

interface Wife {
  name: string;
  children: Child[];
}

interface Family {
  name: string;
  wives: Wife[];
}
@Component({
  selector: 'app-family-view',
  templateUrl: './family-view.component.html',
  styleUrls: ['./family-view.component.less']
})
export class FamilyViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    familyData: Family = {
    name: 'ABDULLA MOHAMED AHMED MUFTAH ALNASRI',
    wives: [
      {
        name: 'HUDA MOUSA ABDALLA MOHAMED MOUSA ',
        children: [
          { name: 'Zayed',gender:"boy" },
          { name: 'Shama',gender:"girl" }
        ]
      },
      {
        name: 'SALMA SAEED MUBARAK AL MANSOURI',
        children: [
          { name: 'Layek',gender:"boy" },
          { name: 'Nora',gender:"girl" },
        ]
      }
    ]
  };


    familyData2: Family = {
    name: 'AHMED MOHAMMED SALEH BUQARAA ALHEMEIRI',
    wives: [
      {
        name: 'MERVAT GABER AL-MADANYA',
        children: [
          { name: 'Jaber',gender:"boy" },
          { name: 'Alia',gender:"girl" }
        ]
      }
    ]
  };
}



  
