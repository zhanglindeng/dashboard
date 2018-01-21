import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  nav1 = 'home';

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    // this.router.events
    //   .filter(event => event instanceof NavigationEnd)
    //   .subscribe(
    //     data => {
    //       console.log(data);
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
  }

  nav1Click(s: string) {
    this.nav1 = s;
  }

  nav1Mouseenter(s: string) {
    this.nav1 = s;
  }
}
