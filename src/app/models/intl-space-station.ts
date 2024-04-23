import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class IntlSpaceStation {
    private iss!: THREE.Group;
    
    constructor() {
    }

    public createIntlSpaceStation(): THREE.Group {
        const gltfLoader = new GLTFLoader();

        let iss: THREE.Group;
        
        gltfLoader.load("./models/iss-station.gltf",
            (gltf) => {
              iss = gltf.scene;
              console.log("success");
              console.log(iss);
          
              iss.scale.set(2, 2, 2);
              // iss.position.set(0, 100, 0);
              // iss.rotation.x = Math.PI * 0.5;
              // iss.rotation.y = Math.PI * 1;
          
              this.iss = iss;
          
            },
            (progress) => {
              console.log("progress");
              console.log(progress);
            },
            (error) => {
              console.log("error");
              console.log(error);
            }
          );

        return this.iss;
    }
}
