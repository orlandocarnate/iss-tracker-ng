import * as THREE from 'three';

export class SpaceScene extends THREE.Scene {
    constructor() {
        super();
        this.background = new THREE.Color(0xaaaaaa);

        // const ambientLight = new THREE.AmbientLight(0x404040);
        // this.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight("#fcffbe", .1);
        directionalLight.position.set(0, 120, -180);
        this.add(directionalLight);
    }
}
