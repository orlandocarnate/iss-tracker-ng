import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'ISS Tracker Developed in Angular 17';

  private scene!: THREE.Scene;
  private width = window.innerWidth;
  private height = window.innerHeight;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;

  constructor() {
    console.log(THREE);
    this.createScene();
    this.createRenderer();
    this.createCamera();
    this.createGeometry();
    this.addEventListener();
    this.setBackground();
    this.setLight();

    this.render();
  }

  private createScene(): void {
    this.scene = new THREE.Scene()
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
    const material = new THREE.MeshBasicMaterial({color: 0x1ec876});
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

  private setBackground(): void {
    // Set the background color of the scene.
    this.renderer.setClearColor(0x333F47, 1);
  }

  private setLight(): void {
    const light = new THREE.PointLight(0xffffff);
    light.position.set(-100,200,100);
    this.scene.add(light);
  }

  private render(): void {
    requestAnimationFrame(this.render.bind(this));

    // Rotate the cube around its axes.
    this.cube.rotation.x += 0.01;

    // Render the scene.
    this.renderer.render(this.scene, this.camera);
  }
}
