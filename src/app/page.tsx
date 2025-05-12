import Spline from "@splinetool/react-spline";

export default function Home() {
  return (
    <>
      <div id="part0" className=" w-screen h-screen bg-black">
        <Spline
          className="fixed top-0 left-0 right-0 bottom-0 z-10"
          scene="https://prod.spline.design/xaEgUVwCM4AotelL/scene.splinecode"
        />
      </div>
    </>
  );
}
