import { Component } from '@angular/core';
import { faAngular, faNodeJs, faEnvira, faBootstrap } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  // ['<FontAwesomeIcon icon={faAngular} style={{color: "#e01b24"}} />']
  // <FontAwesomeIcon icon="fa-brands fa-node" style={{color: "#26a269",}} />
  // <FontAwesomeIcon icon="fa-solid fa-leaf" style={{color: "#2ec27e",}} />
  // <i class="fa-brands fa-envira"></i>
  icons = { 'angular': faAngular, 'node': faNodeJs, 'mongo': faEnvira, 'bootstrap': faBootstrap }
}
