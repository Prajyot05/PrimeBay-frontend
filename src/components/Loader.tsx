import PacmanLoader from "react-spinners/PacmanLoader";

function Loader() {
  return (
    <section className="loader">
      {/* <div></div> */}
      <PacmanLoader
        color={'black'}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </section>
  )
}

export default Loader;

interface SkeletonProps{
  width?:string;
  length?: number;
  height?: string;
  containerHeight?: string;
}

export const Skeleton = ({
    width = "unset", 
    length = 3, 
    height = "30px",
    containerHeight = "unset"
  }:SkeletonProps) => {

  const skeletons = Array.from({length}, (_, idx) => (
    <div key={idx} className="skeleton-shape" style={{height}}></div>
  ));

  return (
    <div className="skeleton-loader" style={{width, height: containerHeight}}>
      {skeletons}
    </div>
  )
};