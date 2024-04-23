import * as THREE from 'three';
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';
import atmosVertexShader from '../shaders/atmosVertex.glsl';
import atmosFragmentShader from '../shaders/atmosFragment.glsl';

export class Earth {
    private earth!: THREE.Mesh;
    private atmosphere!: THREE.Mesh;

    constructor(scene: THREE.Scene) {
        this.earth = this.createMesh(90, vertexShader, fragmentShader, "earth_atmos_2048.jpg");
        this.atmosphere = this.createMesh(90, atmosVertexShader, atmosFragmentShader);

        scene.add(this.earth, this.atmosphere);
    }

    private createEarthMesh(): void {
        const earthGeometry = new THREE.SphereGeometry(90, 32, 32);
        const earthMaterial = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
              uEarthTexture: {
                value: new THREE.TextureLoader().load("images/earth_atmos_2048.jpg")
              }
            },
            // map: earthTexture,
            // roughness: 0.5,
            // metalness: 0.2,
            // normalMap: earthNormalMap,
            // roughnessMap: earthRoughMap,
            // wireframe: true,
          });

        this.earth = new THREE.Mesh(earthGeometry, earthMaterial);
    }

    private createMesh(radius: number, vertexShader: string, fragmentShader: string, texture?: string): THREE.Mesh {
        const geometry = new THREE.SphereGeometry(90, 32, 32);
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: texture 
            ? {
              uEarthTexture: {
                value: new THREE.TextureLoader().load("images/" + texture)
              }
            }
            : undefined
            // map: earthTexture,
            // roughness: 0.5,
            // metalness: 0.2,
            // normalMap: earthNormalMap,
            // roughnessMap: earthRoughMap,
            // wireframe: true,
          });

        return new THREE.Mesh(geometry, material);
    }


}
