import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';
import { SpaceScene } from './scene/space-scene';
import { Earth } from './models/earth';
import { DataFetchService } from './services/data-fetch.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'ISS Tracker Developed in Angular 17';

  private scene: THREE.Scene;
  private width = window.innerWidth;
  private height = window.innerHeight;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;
  private earthMesh: Earth;

  constructor(private dataFetchService: DataFetchService) {
    this.scene = new SpaceScene();
    this.earthMesh = new Earth(this.scene);

    console.log(THREE);
    this.createRenderer();
    this.createCamera();
    // this.createGeometry();
    this.addEventListener();
    // this.setBackground();
    // this.setLight();

    this.fetchData();

    this.render();
  }

  private fetchData(): void {
    this.dataFetchService.getISSData().subscribe( data => {
      for (let key in data) {
        console.log(`${key}: ${data[key]}`);
      }
    })
  }

  private createRenderer(): void {
    // Create a renderer and add it to the DOM.
    this.renderer = new THREE.WebGLRenderer({antialias:true})
    this.renderer.setSize(this.width, this.height);
    document.body.appendChild(this.renderer.domElement);
  }

  private createCamera(): void {
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 20000)
    this.camera.position.set(0,0,6);
    this.scene.add(this.camera);
  }

  private createGeometry(): void {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({color: 0xff0000});
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  private addEventListener(): void {
    window.addEventListener('resize', () => {
      const WIDTH = window.innerWidth;
      const HEIGHT = window.innerHeight;
      this.renderer.setSize(WIDTH, HEIGHT);
      this.camera.aspect = WIDTH / HEIGHT;
      this.camera.updateProjectionMatrix();
    });
  }

  private render(): void {
    requestAnimationFrame(this.render.bind(this));

    // Rotate the cube around its axes.
    // this.cube.rotation.x += 0.01;

    // Render the scene.
    this.renderer.render(this.scene, this.camera);
  }
}
