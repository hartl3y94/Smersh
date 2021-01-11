import { Component, OnInit } from '@angular/core';
import { VulnsService } from '../../services/vulns.service';
import { HostsService } from '../../services/hosts.service';
import { MissionsService } from '../../services/missions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {Locale} from "../../storage/Locale";

@Component({
  selector: 'app-add-vulns-to-host-external',
  templateUrl: './add-vulns-to-host-external.component.html',
  styleUrls: ['./add-vulns-to-host-external.component.css'],
})
export class AddVulnsToHostExternalComponent implements OnInit {
  public id: any;
  public hosts = [];
  public vulns = [];
  public selectedHosts = [];
  public selectedVulns = [];
  public idFromUrl: any;
  public missionId: any;
  public host_id: any;
  selected_vulns: any[];
  selected_hosts: any[];

  constructor(
    private vulnsService: VulnsService,
    private activatedRoute: ActivatedRoute,
    private hostsService: HostsService,
    private missionServices: MissionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idFromUrl = this.activatedRoute.snapshot.params.id;
    this.host_id = idFromUrl;
    const url = this.router.url;
    const mission_id = url.split('/').pop();
    console.log('ID de la mission => ', mission_id);
    this.getHostsFromMission(mission_id);
    this.loadVulns();
  }

  // get all vulns
  loadVulns(): void {
    this.vulnsService.getData().subscribe((vulns) => {
     const locale =  new Locale().get();
     this.vulns = vulns['hydra:member'].map(e => {
       const elt = e.translations[locale];
       return {
         name:  elt.name,
         value:  e['@id']
       }
     });
    });
  }

  // get all hosts from mission id
  getHostsFromMission(mission_id): void {
    this.missionServices.getDataById(mission_id).subscribe((el) => {
      this.hosts = el['hosts'];
      console.log(this.hosts);

      const id_vulns = [];
      for (const i in this.hosts[0]['vulns']) {
        id_vulns.push(this.hosts[0]['vulns'][i]['@id']);
      }

      const id_hosts = [];
      id_hosts.push(this.hosts[0]['@id']);

      this.selected_hosts = id_hosts;
      this.selected_vulns = id_vulns;
    });
  }

  onSubmit(form: NgForm) {
    console.log(this.host_id);
    console.log('selectedVulns => ', this.selectedVulns);
    Object.assign(form.value, { vulns: this.selectedVulns });
    this.hostsService.update(this.host_id, form.value).subscribe((el) => {
      console.log('response from vuln service =>', el);
      const id = el.mission;
      const missionId = id.split('/').pop();
      this.missionId = missionId;
      this.ngOnInit();
      this.router.navigateByUrl(`/missions/details/${this.missionId}`);
    });
  }

  Hosts(value) {
    this.selectedHosts = value;
  }

  Vulns(value) {
    this.selectedVulns = value;
    console.log('selected vulns', value);
  }
  createVuln() {
    this.router.navigateByUrl('/vulnerabilities/create');
  }
}
