import React from "react";
import { useGLTF, useTexture } from "@react-three/drei";

import { useCustomization } from "./context/Customization";

// Table komponenta pro zobrazení modelu

const Table = (props) => {
  const { nodes, materials } = useGLTF("/models/cvrkec.gltf"); // Cesta k modelu
  const { shape, edge, legs, material, legColor, delka } = useCustomization();

  const wood1TextureProps = useTexture({
    map: "../../textures/Wood/Wood_011_Base_Color.jpg",
    normalMap: "../../textures/Wood/Wood_011_Normal.jpg",
  });
  const wood2TextureProps = useTexture({
    map: "../../textures/Wood/Wood_013_COLOR.jpg",
    normalMap: "../../textures/Wood/Wood_013_NORM.jpg",
  });

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Ctverec.geometry} position={[0, 0, 0]} scale={[delka, 0.015, 1]} visible={edge === 1 && shape === 1}>
        <meshStandardMaterial {...(material === "wood1" ? wood1TextureProps : wood2TextureProps)} />
      </mesh>
      <mesh geometry={nodes.Ctverec45.geometry} position={[0, 0, 0]} scale={[1, 0.005, 1]} visible={edge === 2 && shape === 1}>
        <meshStandardMaterial {...(material === "wood1" ? wood1TextureProps : wood2TextureProps)} />
      </mesh>
      <mesh geometry={nodes.CtverecSmooth.geometry} position={[0, 0, 0]} scale={[1, 0.015, 1]} visible={edge === 3 && shape === 1}>
        <meshStandardMaterial {...(material === "wood1" ? wood1TextureProps : wood2TextureProps)} />
      </mesh>
      <mesh geometry={nodes.Kruh45.geometry} position={[0, 0, 0]} scale={[1, 0.01, 1]} visible={edge === 2 || (edge === 3 && shape === 2)}>
        <meshStandardMaterial {...(material === "wood1" ? wood1TextureProps : wood2TextureProps)} />
      </mesh>
      <mesh geometry={nodes.Kruh.geometry} position={[0, 0, 0]} scale={[1, 0.015, 1]} visible={edge === 1 && shape === 2}>
        <meshStandardMaterial {...(material === "wood1" ? wood1TextureProps : wood2TextureProps)} />
      </mesh>
      <mesh geometry={nodes.Natural.geometry} position={[0, 0, 0]} scale={[1, 0.03, 1.6]} visible={shape === 3}>
        <meshStandardMaterial {...(material === "wood1" ? wood1TextureProps : wood2TextureProps)} />
      </mesh>
      <mesh geometry={nodes.hexagon.geometry} scale={[1.2, 1, 1.2]} visible={edge === 1 && shape === 4}>
        <meshStandardMaterial {...(material === "wood1" ? wood1TextureProps : wood2TextureProps)} />
      </mesh>
      <mesh geometry={nodes.hexagon45.geometry} scale={[1.2, 1, 1.2]} visible={edge === 2 && shape === 4}>
        <meshStandardMaterial {...(material === "wood1" ? wood1TextureProps : wood2TextureProps)} />
      </mesh>
      <mesh geometry={nodes.hexagonSmooth.geometry} scale={[1.2, 1, 1.2]} visible={edge === 3 && shape === 4}>
        <meshStandardMaterial {...(material === "wood1" ? wood1TextureProps : wood2TextureProps)} />
      </mesh>
      <mesh geometry={nodes["1Noha14"].geometry} position={[delka / 2 + 0.9, -0.5, -0.9]} scale={[0.05, 0.5, 0.05]} visible={shape === 1 || shape === 3}>
        <meshStandardMaterial color={legColor} />{" "}
      </mesh>
      <mesh geometry={nodes["1Noha44"].geometry} position={[delka / 2 + 0.9, -0.5, 0.9]} scale={[0.05, 0.5, 0.05]} visible={shape === 1 || shape === 3}>
        <meshStandardMaterial color={legColor} />{" "}
      </mesh>
      <mesh geometry={nodes["1Noha34"].geometry} position={[-(delka / 2) - 0.9, -0.5, 0.9]} scale={[0.05, 0.5, 0.05]} visible={shape === 1 || shape === 3}>
        <meshStandardMaterial color={legColor} />{" "}
      </mesh>
      <mesh geometry={nodes["1Noha24"].geometry} position={[-(delka / 2) - 0.9, -0.5, -0.9]} scale={[0.05, 0.5, 0.05]} visible={shape === 1 || shape === 3}>
        <meshStandardMaterial color={legColor} />{" "}
      </mesh>
      <mesh geometry={nodes["2Noha14"].geometry} position={[0.9, -0.5, 0]} scale={[0.05, 0.5, 0.05]} visible={shape === 2 || shape === 4}>
        <meshStandardMaterial color={legColor} />{" "}
      </mesh>
      <mesh geometry={nodes["2Noha24"].geometry} position={[0, -0.5, -0.9]} scale={[0.05, 0.5, 0.05]} visible={shape === 2 || shape === 4}>
        <meshStandardMaterial color={legColor} />
      </mesh>
      <mesh geometry={nodes["2Noha34"].geometry} position={[-0.9, -0.5, 0]} scale={[0.05, 0.5, 0.05]} visible={shape === 2 || shape === 4}>
        <meshStandardMaterial color={legColor} />
      </mesh>
      <mesh geometry={nodes["2Noha44"].geometry} position={[0, -0.5, 0.9]} scale={[0.05, 0.5, 0.05]} visible={shape === 2 || shape === 4}>
        <meshStandardMaterial color={legColor} />
      </mesh>
    </group>
  );
};

useGLTF.preload("/models/cvrkec.gltf");
export default Table;
