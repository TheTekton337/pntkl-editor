import dynamic from "next/dynamic";

const DynamicReactNativeEditor = dynamic(
  () => import("./components/ReactNativeEditor"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

export default function Home() {
  return <DynamicReactNativeEditor />;
}
