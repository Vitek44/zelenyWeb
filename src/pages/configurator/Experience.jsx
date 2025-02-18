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
      speed={0.75}
      global={true}
      zoom={1} // Vypnutí zoomu při otáčení
      polar={[-0.1, Math.PI / 4]}
    >
      <Stage
        environment="apartment"
        intensity={0.1}
        contactShadow={{ opacity: 0.4, blur: 2 }}
        adjustCamera={1.2}
        preset={"rembrandt"}
      >
        <Suspense fallback={null}>
          <Table
            scale={[2.0, 2.0, 2.0]}
            rotation={[0, Math.PI / 4, 0]}
            position={[0, -1, 0]}
          />
        </Suspense>
      </Stage>
    </PresentationControls>
  );
};

export default Experience;
