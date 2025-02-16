import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

import * as THREE from "three";
import { useCustomization } from "./context/Customization";

// Table komponenta pro zobrazení modelu
const Table = (props) => {
  const { nodes, materials } = useGLTF("./models/table.gltf"); // Cesta k modelu
  const { shape, setShape } = useCustomization();

  const woodTextureProps = useTexture({
    map: "../../textures/Wood/Wood_011_Base_Color.jpg",
    normalMap: "../../textures/Wood/Wood_011_Normal.jpg",
    roughnessMap: "../../textures/Wood/Wood_011_Roughness.jpg",
    aoMap: "../../textures/Wood/Wood_011_ambientOcclusion.jpg",
  });
  const metalTextureProps = useTexture({
    map: "../../textures/Metal/Metal_Gold_Foil_001_basecolor.png",
    normalMap: "../../textures/Metal/Metal_Gold_Foil_001_normal.png",
    roughnessMap: "../../textures/Metal/Metal_Gold_Foil_001_roughness.png",
    aoMap: "../../textures/Metal/Metal_Gold_Foil_001_ambientOcclusion.png",
  });
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cube.geometry}
        position={[0, 1.433, 0]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-1, -0.05, -1]}
        visible={shape === 1}
      >
        <meshStandardMaterial {...woodTextureProps} />
      </mesh>

      <mesh
        geometry={nodes.Cylinder.geometry}
        position={[0, 1.428, 0]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-1, -0.05, -1]}
        visible={shape === 2}
      >
        <meshStandardMaterial {...woodTextureProps} />
      </mesh>
      <mesh
        geometry={nodes.Cube001.geometry}
        position={[0, 0.694, 0]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-0.085, -0.687, -0.085]}
      >
        <meshStandardMaterial {...metalTextureProps} />
      </mesh>
    </group>
  );
};
useGLTF.preload("./models/table.gltf");
export default Table;
