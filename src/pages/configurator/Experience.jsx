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
      zoom={1.5} // Vypnutí zoomu při otáčení
      polar={[-0.1, Math.PI / 4]}
    >
      <Stage environment="city" intensity={0.6} contactShadow={false}>
        <Suspense fallback={null}>
          <Table scale={[1.5, 1.5, 1.5]} /> {/* Zvětšení objektu */}
        </Suspense>
      </Stage>
    </PresentationControls>
  );
};

export default Experience;
