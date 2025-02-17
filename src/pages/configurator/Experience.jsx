import {
  PresentationControls,
  Stage,
  MeshReflectorMaterial,
} from "@react-three/drei"; // Import pro ovládání a stage
import { Suspense } from "react";
import Table from "./Table"; // Import z Table.jsx

const Experience = () => {
  return (
    <PresentationControls
      speed={1.5}
      global
      zoom={0.5}
      polar={[-0.1, Math.PI / 4]}
    >
      <Stage environment="city" intensity={0.6} contactShadow={false}>
        <Suspense fallback={null}>
          <Table />
        </Suspense>
      </Stage>

      {/* Tento mesh obsahuje MeshReflectorMaterial */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[100, 100]} />{" "}
        {/* Geometrie pro zrcadlový efekt */}
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#101010"
          metalness={0.5}
        />
      </mesh>
    </PresentationControls>
  );
};

export default Experience;
