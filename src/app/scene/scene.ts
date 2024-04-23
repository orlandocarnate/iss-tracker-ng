import * as THREE from 'three';

export class Scene {
    private scene!: THREE.Scene;

    constructor() {
        this.scene = new THREE.Scene();
        this.setLights();
    }

    private setLights(): void {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);

        // gui.add(ambientLight, "intensity").min(0).max(3).step(0.001);

        const directionalLight = new THREE.DirectionalLight("#fcffbe", 1);
        // directionalLight.castShadow = true;
        // directionalLight.shadow.camera.far = 15;
        // directionalLight.shadow.mapSize.set(1024, 1024);
        // directionalLight.shadow.normalBias = 0.05;
        // directionalLight.position.set(90, -80, 145);

        const directionalLight2 = new THREE.DirectionalLight("#bee2ff", 1);
        directionalLight2.position.set(0, 120, -180);
        this.scene.add(directionalLight, directionalLight2);
    }

    public getScene(): THREE.Scene {
        return this.scene;
    }
}
