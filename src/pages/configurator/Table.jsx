import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

import * as THREE from "three";
import { useCustomization } from "./context/Customization";

// Table komponenta pro zobrazení modelu
const Table = (props) => {
  const { nodes, materials } = useGLTF("./models/table1.gltf"); // Cesta k modelu
  const { shape, setShape, legs, setLegs } = useCustomization();

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
        geometry={nodes.ctverec001.geometry}
        material={materials["Material.005"]}
        position={[0, 1.295, 0]}
        scale={[1.174, 0.037, 1.174]}
        visible={shape === 10}
      />
      <mesh
        geometry={nodes.kruh.geometry}
        material={materials.dřevo}
        position={[0, 1.302, 0]}
        scale={[1.455, 0.043, 1.455]}
        visible={shape === 2}
      />
      <mesh
        geometry={nodes.obdelnik.geometry}
        material={materials["Material.004"]}
        position={[0, 1.302, 0]}
        scale={[1.129, 0.043, 1.129]}
        visible={shape === 1}
      />
      <mesh
        geometry={nodes.ctverec003.geometry}
        material={materials["Material.011"]}
        position={[0, 1.295, 0]}
        scale={[0.918, 0.037, 0.918]}
        visible={shape === 11}
      />
      <mesh
        geometry={nodes.Nohy001.geometry}
        material={materials["Material.003"]}
        position={[0, 1.295, 0]}
        scale={[1, 0.037, 1]}
        visible={legs === 1}
      />
      <mesh
        geometry={nodes.Nohy02.geometry}
        material={materials["Material.006"]}
        position={[0, 0.602, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.208, 0.033, 0.72]}
        visible={legs === 2}
      />
      <mesh
        geometry={nodes.nohy03.geometry}
        material={materials["Material.002"]}
        position={[0, 1.295, 0]}
        scale={[0.918, 0.037, 0.918]}
        visible={legs === 3}
      >
        {" "}
        <meshStandardMaterial {...metalTextureProps} />
      </mesh>
      <mesh
        geometry={nodes.nohy04.geometry}
        material={materials["Material.009"]}
        position={[0, 1.312, 0]}
        scale={[0.918, 0.049, 0.918]}
        visible={legs === 4}
      />
      <mesh
        geometry={nodes.nohy05.geometry}
        material={materials["Material.010"]}
        position={[0, 1.295, 0]}
        scale={[0.918, 0.037, 0.918]}
        visible={legs === 5}
      />

      <mesh
        geometry={nodes.nohy06.geometry}
        material={materials["Material.012"]}
        position={[0, 0.602, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.208, 0.033, 0.72]}
        visible={legs === 6}
      />
    </group>
  );
};
useGLTF.preload("./models/table1.gltf");
export default Table;
