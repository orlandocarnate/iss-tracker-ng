import * as THREE from 'three';
import { EarthVertexShader } from '../shaders/earthVertex';
import { EarthFragmentShader } from '../shaders/earthFragment';
import { AtmosVertexShader } from '../shaders/atmosVertex';
import { AtmosFragmentShader } from '../shaders/atmosFragment';

export class Earth {
    private earth!: THREE.Mesh;
    private atmosphere!: THREE.Mesh;
    scene: THREE.Scene;

    constructor(scene: THREE.Scene) {
      this.scene = scene;
      this.createMesh('earth', 2, EarthVertexShader, EarthFragmentShader, "earth_atmos_2048.jpg");
      // this.createMesh('atmosphere', 2.1, AtmosVertexShader, AtmosFragmentShader);
    }

    private createMesh(name: string, radius: number, vertexShader: string, fragmentShader: string, texture?: string): void {
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: texture 
              ? { uEarthTexture: { value: new THREE.TextureLoader().load("./assets/images/" + texture)} } 
              : { uEarthTexture: { value: null } } 
          });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = name;

        this.scene.add(mesh) ;
    }


}
